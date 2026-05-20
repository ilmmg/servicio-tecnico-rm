"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Trash2, ClipboardList, ArrowRightCircle, Clock, Undo2 } from "lucide-react";
import { useOrders } from "@/lib/hooks/useOrders";
import { useSales } from "@/lib/hooks/useSales";
import { ESTADO_ORDEN_LABELS, ESTADO_ORDEN_COLORS, formatDate, formatDateTime, formatCurrency } from "@/lib/utils";
import type { OrdenTrabajo, EstadoOrden } from "@/lib/types";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const EMPTY_FORM = { clienteNombre: "", clienteTelefono: "", equipo: "", marca: "", modelo: "", problemaReportado: "", diagnostico: "", estado: "recibido" as EstadoOrden, fechaIngreso: new Date().toISOString().split("T")[0], fechaEstimada: "", presupuesto: 0 };
const ESTADO_FLOW: EstadoOrden[] = ["recibido", "en_diagnostico", "en_reparacion", "listo", "entregado"];

export default function OrdenesPage() {
  const { ordenes, loaded, addOrden, updateOrden, changeEstado, deleteOrden } = useOrders();
  const { addVenta } = useSales();
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<OrdenTrabajo | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [estadoNota, setEstadoNota] = useState("");
  const [noteModalData, setNoteModalData] = useState<{orden: OrdenTrabajo, newState: EstadoOrden} | null>(null);

  if (!loaded) { return (<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-rm-blue border-t-transparent rounded-full animate-spin" /></div>); }

  const filtered = ordenes.filter((o) => {
    const s = search.toLowerCase();
    return (o.clienteNombre.toLowerCase().includes(s) || o.equipo.toLowerCase().includes(s) || o.marca.toLowerCase().includes(s) || o.id.includes(s)) && (filterEstado === "all" || o.estado === filterEstado);
  });

  const openNew = () => { setForm({ ...EMPTY_FORM, fechaIngreso: new Date().toISOString().split("T")[0] }); setEditingId(null); setShowModal(true); };
  const openEdit = (o: OrdenTrabajo) => {
    setForm({ clienteNombre: o.clienteNombre, clienteTelefono: o.clienteTelefono, equipo: o.equipo, marca: o.marca, modelo: o.modelo, problemaReportado: o.problemaReportado, diagnostico: o.diagnostico, estado: o.estado, fechaIngreso: o.fechaIngreso.split("T")[0], fechaEstimada: o.fechaEstimada ? o.fechaEstimada.split("T")[0] : "", presupuesto: o.presupuesto });
    setEditingId(o.id); setShowModal(true);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateOrden(editingId, form);
    } else {
      await addOrden(form);
    }
    setShowModal(false); setEditingId(null);
  };
  const handleAdvanceEstado = (orden: OrdenTrabajo) => { const idx = ESTADO_FLOW.indexOf(orden.estado); if (idx < ESTADO_FLOW.length - 1) { setNoteModalData({ orden, newState: ESTADO_FLOW[idx + 1] }); } };
  const handleRegresarEstado = async (orden: OrdenTrabajo) => { const idx = ESTADO_FLOW.indexOf(orden.estado); if (idx > 0) { await changeEstado(orden.id, ESTADO_FLOW[idx - 1], "Regreso por correccion"); } };

  const handleCobrar = async (orden: OrdenTrabajo) => {
    if (orden.presupuesto > 0) {
      await addVenta({ items: [{ productoId: orden.id, nombre: `Reparacion: ${orden.equipo} ${orden.marca} ${orden.modelo}`, cantidad: 1, precioUnitario: orden.presupuesto }], total: orden.presupuesto, canal: "local", metodoPago: "efectivo", clienteNombre: orden.clienteNombre });
    }
    await changeEstado(orden.id, "entregado", "Entregado y cobrado.");
  };

  const ic = "admin-input";
  const lc = "block text-sm font-semibold text-rm-text-muted mb-2";

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Ordenes de Trabajo</h1>
          <p className="text-rm-text-muted mt-1 text-sm">{ordenes.filter((o) => o.estado !== "entregado").length} ordenes activas</p>
        </div>
        <button onClick={openNew} className="btn-pill-blue flex items-center gap-2 px-5 py-3 text-sm w-full sm:w-auto justify-center active:scale-95 transition-transform">
          <Plus className="w-4 h-4" /> Nueva Orden
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rm-text-muted/50" />
          <input type="text" placeholder="Buscar cliente, equipo o ID..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${ic} pl-11`} />
        </div>
        <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className={`${ic} sm:w-auto sm:min-w-[170px]`}>
          <option value="all">Todos los estados</option>
          {Object.entries(ESTADO_ORDEN_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-rm-text-muted">
          <ClipboardList className="w-14 h-14 mb-4 opacity-15" />
          <p className="text-lg font-medium">No hay ordenes</p>
          <p className="text-sm opacity-50">Crea una orden para empezar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {filtered.map((o) => (
            <div key={o.id} className="liquid-glass glass-shine rounded-2xl p-4 sm:p-6 hover:-translate-y-0.5 transition-all group active:scale-[0.99]">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="font-bold text-white text-base sm:text-lg truncate">{o.clienteNombre}</p>
                  <p className="text-xs sm:text-sm text-rm-text-muted truncate">{o.clienteTelefono}</p>
                </div>
                <StatusBadge label={ESTADO_ORDEN_LABELS[o.estado]} colorClasses={ESTADO_ORDEN_COLORS[o.estado]} />
              </div>
              <div className="space-y-1 mb-3 sm:mb-4 text-sm">
                <p><span className="text-rm-text-muted/50">Equipo:</span> <span className="text-white">{o.equipo} {o.marca} {o.modelo}</span></p>
                <p className="line-clamp-1"><span className="text-rm-text-muted/50">Problema:</span> <span className="text-white">{o.problemaReportado}</span></p>
                {o.presupuesto > 0 && <p><span className="text-rm-text-muted/50">Presupuesto:</span> <span className="text-white font-mono">{formatCurrency(o.presupuesto)}</span></p>}
                <p className="text-xs text-rm-text-muted/40 flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(o.fechaIngreso)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
                <button onClick={() => setShowDetail(o)} className="btn-glass px-3 py-2 text-xs active:scale-95">Detalle</button>
                <button onClick={() => openEdit(o)} className="p-2.5 rounded-lg text-rm-text-muted hover:text-rm-blue active:bg-rm-blue/10 transition-all"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteConfirm(o.id)} className="p-2.5 rounded-lg text-rm-text-muted hover:text-red-400 active:bg-red-400/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                <div className="ml-auto flex items-center gap-2">
                  {o.estado !== "recibido" && (
                    <button onClick={() => handleRegresarEstado(o)} className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/15 active:scale-95 transition-all" title="Volver atras"><Undo2 className="w-3.5 h-3.5" /></button>
                  )}
                  {o.estado === "listo" ? (
                    <button onClick={() => handleCobrar(o)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-rm-blue bg-rm-blue/10 border border-rm-blue/20 active:scale-95 transition-all"><ArrowRightCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Cobrar y</span> Entregar</button>
                  ) : o.estado !== "entregado" && (
                    <button onClick={() => handleAdvanceEstado(o)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/15 active:scale-95 transition-all"><ArrowRightCircle className="w-3.5 h-3.5" /> Avanzar</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title={`Orden - ${showDetail?.clienteNombre ?? ""}`}>
        {showDetail && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div><p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-1">Cliente</p><p className="text-white font-semibold text-sm">{showDetail.clienteNombre}</p></div>
              <div><p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-1">Telefono</p><p className="text-white text-sm">{showDetail.clienteTelefono}</p></div>
              <div><p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-1">Equipo</p><p className="text-white text-sm">{showDetail.equipo} {showDetail.marca} {showDetail.modelo}</p></div>
              <div><p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-1">Presupuesto</p><p className="text-white font-mono text-sm">{formatCurrency(showDetail.presupuesto)}</p></div>
            </div>
            <div><p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-1">Problema</p><p className="text-white text-sm">{showDetail.problemaReportado || "-"}</p></div>
            <div><p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-1">Diagnostico</p><p className="text-white text-sm">{showDetail.diagnostico || "-"}</p></div>
            <div>
              <p className="text-[10px] text-rm-text-muted uppercase tracking-wider mb-3">Historial</p>
              {showDetail.historial.map((h, i) => (
                <div key={h.id} className="flex gap-3">
                  <div className="flex flex-col items-center"><div className={`w-2.5 h-2.5 rounded-full shrink-0 ${i === showDetail.historial.length - 1 ? "bg-rm-blue" : "bg-white/10"}`} />{i < showDetail.historial.length - 1 && <div className="w-px flex-1 bg-white/5" />}</div>
                  <div className="pb-3 min-w-0"><div className="flex flex-wrap items-center gap-2"><StatusBadge label={ESTADO_ORDEN_LABELS[h.estadoNuevo]} colorClasses={ESTADO_ORDEN_COLORS[h.estadoNuevo]} /><span className="text-[10px] text-rm-text-muted">{formatDateTime(h.fecha)}</span></div>{h.nota && <p className="text-xs text-rm-text-muted mt-1">{h.nota}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? "Editar Orden" : "Nueva Orden"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={lc}>Cliente *</label><input type="text" required value={form.clienteNombre} onChange={(e) => setForm({ ...form, clienteNombre: e.target.value })} className={ic} placeholder="Juan Perez" /></div>
            <div><label className={lc}>Telefono *</label><input type="text" required value={form.clienteTelefono} onChange={(e) => setForm({ ...form, clienteTelefono: e.target.value })} className={ic} placeholder="11 1234-5678" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className={lc}>Equipo *</label><input type="text" required value={form.equipo} onChange={(e) => setForm({ ...form, equipo: e.target.value })} className={ic} placeholder="Heladera" /></div>
            <div><label className={lc}>Marca</label><input type="text" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} className={ic} placeholder="Patrick" /></div>
            <div><label className={lc}>Modelo</label><input type="text" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} className={ic} placeholder="HPK350" /></div>
          </div>
          <div><label className={lc}>Problema *</label><textarea rows={2} required value={form.problemaReportado} onChange={(e) => setForm({ ...form, problemaReportado: e.target.value })} className={`${ic} resize-none`} placeholder="Describir problema..." /></div>
          <div><label className={lc}>Diagnostico</label><textarea rows={2} value={form.diagnostico} onChange={(e) => setForm({ ...form, diagnostico: e.target.value })} className={`${ic} resize-none`} placeholder="Opcional" /></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div><label className={lc}>Ingreso</label><input type="date" value={form.fechaIngreso} onChange={(e) => setForm({ ...form, fechaIngreso: e.target.value })} className={ic} /></div>
            <div><label className={lc}>Estimada</label><input type="date" value={form.fechaEstimada} onChange={(e) => setForm({ ...form, fechaEstimada: e.target.value })} className={ic} /></div>
            <div className="col-span-2 sm:col-span-1"><label className={lc}>Presupuesto</label><input type="number" min="0" value={form.presupuesto} onChange={(e) => setForm({ ...form, presupuesto: Number(e.target.value) })} className={ic} /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-glass px-5 py-3 text-sm active:scale-95">Cancelar</button>
            <button type="submit" className="flex-1 btn-pill-blue px-5 py-3 text-sm active:scale-95">{editingId ? "Guardar" : "Crear Orden"}</button>
          </div>
        </form>
      </Modal>

      {/* Delete */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirmar Eliminacion" maxWidth="max-w-md">
        <p className="text-rm-text-muted mb-6 text-sm">Eliminar esta orden? Se perdera todo el historial.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-glass px-5 py-3 text-sm active:scale-95">Cancelar</button>
          <button onClick={() => { if (deleteConfirm) { deleteOrden(deleteConfirm); setDeleteConfirm(null); } }} className="flex-1 px-5 py-3 rounded-xl bg-red-600/80 backdrop-blur-sm border border-red-500/20 text-white font-bold hover:bg-red-500/80 transition-all text-sm active:scale-95">Eliminar</button>
        </div>
      </Modal>
      {/* Note Modal */}
      <Modal isOpen={!!noteModalData} onClose={() => setNoteModalData(null)} title="Avanzar Estado" maxWidth="max-w-md">
        <div className="space-y-4">
          <p className="text-sm text-rm-text-muted">Avanzando a <strong className="text-white">{noteModalData && ESTADO_ORDEN_LABELS[noteModalData.newState]}</strong></p>
          <div>
            <label className={lc}>Nota al historial (Opcional)</label>
            <textarea rows={3} value={estadoNota} onChange={(e) => setEstadoNota(e.target.value)} className={`${ic} resize-none`} placeholder="El equipo fue revisado y..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { if (noteModalData) { changeEstado(noteModalData.orden.id, noteModalData.newState, ""); setNoteModalData(null); setEstadoNota(""); } }} className="flex-1 btn-glass px-5 py-3 text-sm active:scale-95">Omitir</button>
            <button onClick={() => { if (noteModalData) { changeEstado(noteModalData.orden.id, noteModalData.newState, estadoNota); setNoteModalData(null); setEstadoNota(""); } }} className="flex-1 btn-pill-blue px-5 py-3 text-sm active:scale-95">Guardar y Avanzar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}