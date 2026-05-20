"use client";

import { useState } from "react";
import Tooltip from "@/app/admin/components/Tooltip";
import { Plus, Search, Pencil, Trash2, Package, DollarSign, TrendingUp, Calculator, Store } from "lucide-react";
import { useInventory } from "@/lib/hooks/useInventory";
import { useSettings } from "@/lib/hooks/useSettings";
import { CATEGORIA_LABELS, ESTADO_PRODUCTO_LABELS, ESTADO_PRODUCTO_COLORS, formatCurrency, formatUSD } from "@/lib/utils";
import type { Producto, Categoria, EstadoProducto } from "@/lib/types";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const EMPTY_FORM = { nombre: "", categoria: "heladera" as Categoria, estado: "nuevo" as EstadoProducto, precio: 0, costoUSD: 0, costoPesos: 0, cantidad: 1, ubicacion: "", notas: "", publicadoEnML: false, linkML: "", imagen: "" };

export default function InventarioPage() {
  const { productos, loaded, addProducto, updateProducto, deleteProducto } = useInventory();
  const { settings, loaded: settingsLoaded, updateCotizacion, updateMargenGlobal } = useSettings();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterEstado, setFilterEstado] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [tempMargen, setTempMargen] = useState<string>("");
  const [showMargenConfirm, setShowMargenConfirm] = useState(false);

  const margenConfirmValue =
    settingsLoaded && tempMargen === "" ? settings.margenGlobal.toString() : tempMargen;

  const costoTotalActual = Math.max((form.costoPesos || 0), (form.costoUSD || 0) * settings.cotizacionDolar);
  const margenActual = form.precio > 0 && costoTotalActual > 0 ? Math.round(((form.precio / costoTotalActual) - 1) * 100) : 0;

  if (!loaded || !settingsLoaded) {
    return (<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-rm-blue border-t-transparent rounded-full animate-spin" /></div>);
  }

  const filtered = productos.filter((p) => {
    const s = search.toLowerCase();
    return (p.nombre.toLowerCase().includes(s) || p.ubicacion.toLowerCase().includes(s)) && (filterCat === "all" || p.categoria === filterCat) && (filterEstado === "all" || p.estado === filterEstado);
  });

  const openNew = () => { setForm(EMPTY_FORM); setEditingId(null); setShowModal(true); };
  const openEdit = (p: Producto) => {
    setForm({ nombre: p.nombre, categoria: p.categoria, estado: p.estado, precio: p.precio, costoUSD: p.costoUSD, costoPesos: p.costoPesos, cantidad: p.cantidad, ubicacion: p.ubicacion, notas: p.notas, publicadoEnML: p.publicadoEnML || false, linkML: p.linkML || "", imagen: p.imagen || "" });
    setEditingId(p.id); setShowModal(true);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form };
    if (!data.publicadoEnML) data.linkML = "";
    if (editingId) {
      await updateProducto(editingId, data);
    } else {
      await addProducto(data);
    }
    setShowModal(false); setEditingId(null);
  };

  const ic = "admin-input";
  const lc = "block text-sm font-semibold text-rm-text-muted mb-2";

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Inventario</h1>
          <p className="text-rm-text-muted mt-1 text-sm">{productos.length} productos registrados</p>
        </div>
        <button onClick={openNew} className="btn-pill-blue flex items-center gap-2 px-5 py-3 text-sm w-full sm:w-auto justify-center active:scale-95 transition-transform">
          <Plus className="w-4 h-4" /> Nuevo Producto
        </button>
      </div>

      {/* Info Bar */}
      <div className="liquid-glass-subtle rounded-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span className="text-rm-text-muted font-semibold">Dolar:</span>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-2 py-1">
            <span className="text-rm-text-muted mr-1">$</span>
            <input type="number" value={settings.cotizacionDolar || ""} onChange={(e) => updateCotizacion(Number(e.target.value))} className="bg-transparent w-16 text-white font-bold focus:outline-none" />
          </div>
        </div>
        <div className="hidden sm:block w-px h-5 bg-white/10" />
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-rm-blue" />
          <label className="flex items-center gap-1 text-rm-text-muted font-semibold">Margen <Tooltip content="Margen sugerido para nuevos productos." /></label>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-2 py-1">
            <input type="number" value={settings.margenGlobal || ""} onChange={(e) => updateMargenGlobal(Number(e.target.value))} className="bg-transparent w-10 text-white font-bold focus:outline-none text-right" />
            <span className="text-rm-text-muted ml-1">%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rm-text-muted/50" />
          <input type="text" placeholder="Buscar por nombre o ubicacion..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${ic} pl-11`} />
        </div>
        <div className="grid grid-cols-2 sm:flex gap-3">
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className={`${ic} sm:w-auto sm:min-w-[150px]`}>
            <option value="all">Categorias</option>
            {Object.entries(CATEGORIA_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
          </select>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className={`${ic} sm:w-auto sm:min-w-[150px]`}>
            <option value="all">Estados</option>
            {Object.entries(ESTADO_PRODUCTO_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
          </select>
        </div>
      </div>

      {/* Product List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-rm-text-muted">
          <Package className="w-14 h-14 mb-4 opacity-15" />
          <p className="text-lg font-medium">No hay productos</p>
          <p className="text-sm opacity-50">Agrega un producto para empezar</p>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {filtered.map((p) => {
              const costoBase = Math.max((p.costoPesos || 0), (p.costoUSD || 0) * settings.cotizacionDolar);
              const g = p.precio > 0 && costoBase > 0 ? Math.round(((p.precio - costoBase) / costoBase) * 100) : 0;
              return (
                <div key={p.id} className="liquid-glass rounded-xl p-4 active:scale-[0.99] transition-transform">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white text-sm truncate flex items-center gap-1.5">
                        {p.nombre}
                        {p.publicadoEnML && <span className="bg-[#FFE600]/20 text-[#FFE600] text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0">ML</span>}
                      </p>
                      <p className="text-xs text-rm-text-muted mt-0.5">{CATEGORIA_LABELS[p.categoria]} {p.ubicacion && `· ${p.ubicacion}`}</p>
                    </div>
                    <StatusBadge label={ESTADO_PRODUCTO_LABELS[p.estado]} colorClasses={ESTADO_PRODUCTO_COLORS[p.estado]} />
                  </div>
                  <div className="flex items-end justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex gap-4 text-xs">
                      {p.costoUSD > 0 && <div><span className="text-rm-text-muted">USD </span><span className="text-emerald-400 font-mono">{formatUSD(p.costoUSD)}</span></div>}
                      <div><span className="text-rm-text-muted">Venta </span><span className="text-white font-bold font-mono">{formatCurrency(p.precio)}</span>{g > 0 && <span className={`ml-1 ${g >= settings.margenGlobal ? "text-emerald-400" : "text-amber-400"}`}>+{g}%</span>}</div>
                      <div><span className="text-rm-text-muted">Cant </span><span className={`font-bold ${p.cantidad <= 1 ? "text-red-400" : "text-white"}`}>{p.cantidad}</span></div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => openEdit(p)} className="p-2.5 rounded-lg text-rm-text-muted hover:text-rm-blue active:bg-rm-blue/10 transition-all"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="p-2.5 rounded-lg text-rm-text-muted hover:text-red-400 active:bg-red-400/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block liquid-glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-white/5">
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-rm-text-muted uppercase tracking-wider">Producto</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-rm-text-muted uppercase tracking-wider">Cat.</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-rm-text-muted uppercase tracking-wider">Estado</th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold text-rm-text-muted uppercase tracking-wider">USD</th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold text-rm-text-muted uppercase tracking-wider">Costo $</th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold text-rm-text-muted uppercase tracking-wider">Venta</th>
                  <th className="px-5 py-3.5 text-center text-xs font-bold text-rm-text-muted uppercase tracking-wider">Cant.</th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold text-rm-text-muted uppercase tracking-wider"></th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((p) => {
                    const costoBase = Math.max((p.costoPesos || 0), (p.costoUSD || 0) * settings.cotizacionDolar);
                    const g = p.precio > 0 && costoBase > 0 ? Math.round(((p.precio - costoBase) / costoBase) * 100) : 0;
                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5"><p className="font-semibold text-white text-sm flex items-center gap-2">{p.nombre} {p.publicadoEnML && <span className="bg-[#FFE600]/20 text-[#FFE600] text-[10px] px-2 py-0.5 rounded font-bold">ML</span>}</p>{p.ubicacion && <p className="text-xs text-rm-text-muted/50 mt-0.5">{p.ubicacion}</p>}</td>
                        <td className="px-5 py-3.5 text-xs text-rm-text-muted">{CATEGORIA_LABELS[p.categoria]}</td>
                        <td className="px-5 py-3.5"><StatusBadge label={ESTADO_PRODUCTO_LABELS[p.estado]} colorClasses={ESTADO_PRODUCTO_COLORS[p.estado]} /></td>
                        <td className="px-5 py-3.5 text-right font-mono text-xs text-emerald-400">{p.costoUSD > 0 ? formatUSD(p.costoUSD) : <span className="text-white/10">&mdash;</span>}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-xs text-rm-text-muted">{p.costoPesos > 0 ? formatCurrency(p.costoPesos) : <span className="text-white/10">&mdash;</span>}</td>
                        <td className="px-5 py-3.5 text-right"><p className="font-mono text-xs font-bold text-white">{formatCurrency(p.precio)}</p>{g > 0 && <p className={`text-[10px] mt-0.5 ${g >= settings.margenGlobal ? "text-emerald-400" : "text-amber-400"}`}>+{g}%</p>}</td>
                        <td className="px-5 py-3.5 text-center"><span className={`text-sm font-bold ${p.cantidad <= 1 ? "text-red-400" : "text-white"}`}>{p.cantidad}</span></td>
                        <td className="px-5 py-3.5"><div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-rm-text-muted hover:text-rm-blue hover:bg-rm-blue/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setDeleteConfirm(p.id)} className="p-2 rounded-lg text-rm-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PRODUCT MODAL */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? "Editar Producto" : "Nuevo Producto"}>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div><label className={lc}>Nombre *</label><input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={ic} placeholder="Ej: Heladera Patrick 300L" /></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div><label className={lc}>Categoria</label><select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value as Categoria })} className={ic}>{Object.entries(CATEGORIA_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}</select></div>
            <div><label className={lc}>Estado</label><select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as EstadoProducto })} className={ic}>{Object.entries(ESTADO_PRODUCTO_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}</select></div>
          </div>
          <div className="liquid-glass-subtle rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-400" /><span className="text-sm font-bold text-white">Costos de Compra</span><span className="text-xs text-rm-text-muted ml-auto">Dolar: {formatCurrency(settings.cotizacionDolar)}</span></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lc}>Costo USD</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-bold">U$D</span><input type="number" min="0" step="0.01" value={form.costoUSD || ""} onChange={(e) => setForm({ ...form, costoUSD: Number(e.target.value) })} className={`${ic} pl-12`} placeholder="0.00" /></div>{form.costoUSD > 0 && <p className="text-xs text-rm-text-muted mt-1">= {formatCurrency(form.costoUSD * settings.cotizacionDolar)}</p>}</div>
              <div><label className={lc}>Costo Pesos</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-rm-text-muted text-xs font-bold">$</span><input type="number" min="0" value={form.costoPesos || ""} onChange={(e) => setForm({ ...form, costoPesos: Number(e.target.value) })} className={`${ic} pl-8`} placeholder="0" /></div></div>
            </div>
          </div>
          <div className="liquid-glass-subtle rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2"><Calculator className="w-4 h-4 text-rm-blue" /><span className="text-sm font-bold text-white">Precio de Venta</span></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lc}>Margen (%)</label>
                <div className="relative"><input type="number" value={margenActual} onChange={(e) => { const m = Number(e.target.value); setForm({...form, precio: Math.round(costoTotalActual * (1 + m/100))}); }} className={`${ic} pr-8`} placeholder="50" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-rm-blue font-bold">%</span></div>
                <button type="button" onClick={() => setForm({...form, precio: Math.round(costoTotalActual * (1 + settings.margenGlobal/100))})} className="text-[10px] text-rm-blue hover:underline mt-1 block">Usar default ({settings.margenGlobal}%)</button>
              </div>
              <div>
                <label className={lc}>Precio Final</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">$</span><input type="number" min="0" value={form.precio || ""} onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })} className={`${ic} pl-8 font-bold`} placeholder="0" /></div>
                {form.precio > 0 && <p className={`text-[10px] mt-1 ${margenActual >= settings.margenGlobal ? "text-emerald-400" : "text-amber-400"}`}>Ganancia: {formatCurrency(form.precio - costoTotalActual)}</p>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lc}>Cantidad</label><input type="number" min="0" value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: Number(e.target.value) })} className={ic} /></div>
            <div><label className={lc}>Ubicacion</label><input type="text" value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })} className={ic} placeholder="Estante A" /></div>
          </div>
          <div><label className={lc}>URL de Imagen</label><input type="url" value={form.imagen || ""} onChange={(e) => setForm({ ...form, imagen: e.target.value })} className={ic} placeholder="https://..." /></div>
          <div><label className={lc}>Notas</label><textarea rows={2} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} className={`${ic} resize-none`} placeholder="Observaciones..." /></div>
          <div className="liquid-glass-subtle rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFE600]/10 rounded-lg border border-[#FFE600]/20"><Store className="w-5 h-5 text-[#FFE600]" /></div>
                <div><p className="text-white font-bold text-sm">MercadoLibre</p><p className="text-rm-text-muted text-xs hidden sm:block">Vincular publicacion</p></div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={form.publicadoEnML || false} onChange={(e) => setForm({ ...form, publicadoEnML: e.target.checked })} />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFE600]"></div>
              </label>
            </div>
            {form.publicadoEnML && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <label className={lc}>Enlace MercadoLibre</label>
                <input type="text" value={form.linkML || ""} onChange={(e) => setForm({ ...form, linkML: e.target.value })} className={ic} placeholder="https://articulo.mercadolibre.com.ar/MLA-..." />
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-glass px-5 py-3 text-sm active:scale-95 transition-transform">Cancelar</button>
            <button type="submit" className="flex-1 btn-pill-blue px-5 py-3 text-sm active:scale-95 transition-transform">{editingId ? "Guardar" : "Agregar"}</button>
          </div>
        </form>
      </Modal>

      {/* Delete */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirmar Eliminacion" maxWidth="max-w-md">
        <p className="text-rm-text-muted mb-6">Eliminar este producto? Esta accion no se puede deshacer.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-glass px-5 py-3 text-sm active:scale-95">Cancelar</button>
          <button onClick={() => { if (deleteConfirm) { deleteProducto(deleteConfirm); setDeleteConfirm(null); } }} className="flex-1 px-5 py-3 rounded-xl bg-red-600/80 backdrop-blur-sm border border-red-500/20 text-white font-bold hover:bg-red-500/80 transition-all text-sm active:scale-95">Eliminar</button>
        </div>
      </Modal>

      {/* Confirm Margen */}
      <Modal isOpen={showMargenConfirm} onClose={() => { setShowMargenConfirm(false); setTempMargen(settings.margenGlobal.toString()); }} title="Confirmar Margen Global" maxWidth="max-w-md">
        <p className="text-rm-text-muted mb-6">Cambiar margen de <strong>{settings.margenGlobal}%</strong> a <strong>{margenConfirmValue}%</strong>?</p>
        <div className="flex gap-3">
          <button onClick={() => { setShowMargenConfirm(false); setTempMargen(settings.margenGlobal.toString()); }} className="flex-1 btn-glass px-5 py-3 text-sm">Cancelar</button>
          <button onClick={() => { updateMargenGlobal(Number(margenConfirmValue)); setShowMargenConfirm(false); }} className="flex-1 btn-pill-blue px-5 py-3 text-sm">Confirmar</button>
        </div>
      </Modal>
    </div>
  );
}