"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Tooltip from "@/app/admin/components/Tooltip";
import { Search, ShoppingCart, Plus, Minus, Trash2, CheckCircle2, User, CreditCard, Receipt, Clock, Printer } from "lucide-react";
import { useInventory } from "@/lib/hooks/useInventory";
import { useSales } from "@/lib/hooks/useSales";
import { formatCurrency } from "@/lib/utils";
import type { Producto, CanalVenta, MetodoPago, Venta } from "@/lib/types";
import Modal from "../components/Modal";

function printTicket(venta: Venta) {
  const dateStr = new Date(venta.fecha).toLocaleString("es-AR");
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  const itemsHtml = venta.items.map(item => `<tr><td style="padding:4px 0;border-bottom:1px dashed #ccc;">${item.cantidad}x ${item.nombre}</td><td style="text-align:right;padding:4px 0;border-bottom:1px dashed #ccc;">${formatCurrency(item.precioUnitario * item.cantidad)}</td></tr>`).join("");
  printWindow.document.write(`<html><head><title>Ticket - ${venta.id}</title><style>body{font-family:'Courier New',monospace;margin:0;padding:20px;width:300px;color:#000;}.center{text-align:center;}.bold{font-weight:bold;}table{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px;}.total-row{font-size:16px;font-weight:bold;margin-top:10px;padding-top:10px;border-top:2px solid #000;display:flex;justify-content:space-between;}.footer{margin-top:20px;font-size:12px;text-align:center;color:#555;}</style></head><body><div class="center bold" style="font-size:18px;margin-bottom:5px;">RM Servicio Tecnico</div><div class="center" style="font-size:12px;">Ruiz de los Llanos 3132</div><div class="center" style="font-size:12px;margin-bottom:15px;">Tel: 11 4972-3221</div><div style="font-size:12px;">Ticket: ${venta.id.split("-")[0].toUpperCase()}</div><div style="font-size:12px;">Fecha: ${dateStr}</div>${venta.clienteNombre ? `<div style="font-size:12px;">Cliente: ${venta.clienteNombre}</div>` : ""}<table>${itemsHtml}</table><div class="total-row"><span>TOTAL:</span><span>${formatCurrency(venta.total)}</span></div><div style="font-size:12px;margin-top:5px;">Pago: ${venta.metodoPago.toUpperCase()}</div><div class="footer">Gracias por su compra!<br/>Conserve este ticket para la garantia (30 dias).</div></body></html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
}

function VentasContent() {
  const { productos, loaded: invLoaded, deductStock } = useInventory();
  const { ventas, addVenta, loaded: salesLoaded } = useSales();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"pos" | "history">("pos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<{ p: Producto; qty: number }[]>([]);
  const [canal, setCanal] = useState<CanalVenta>("local");
  const [metodo, setMetodo] = useState<MetodoPago>("efectivo");
  const [cliente, setCliente] = useState("");
  const [lastVenta, setLastVenta] = useState<Venta | null>(null);

  useEffect(() => {
    if (!invLoaded || !searchParams) return;
    const pid = searchParams.get("productId");
    if (!pid) return;
    const product = productos.find((p) => p.id === pid);
    if (!product || product.cantidad <= 0) return;
    queueMicrotask(() => {
      setCart((prev) => (prev.length === 0 ? [{ p: product, qty: 1 }] : prev));
      setActiveTab("pos");
    });
  }, [invLoaded, searchParams, productos]);

  const filteredProducts = useMemo(() => {
    if (!search) return productos.filter(p => p.cantidad > 0);
    const s = search.toLowerCase();
    return productos.filter(p => p.cantidad > 0 && (p.nombre.toLowerCase().includes(s) || p.categoria.includes(s)));
  }, [productos, search]);

  const addToCart = (p: Producto) => {
    setCart(prev => {
      const existing = prev.find(item => item.p.id === p.id);
      if (existing) {
        if (existing.qty >= p.cantidad) return prev;
        return prev.map(item => item.p.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { p, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.p.id === id) {
        const newQty = item.qty + delta;
        if (newQty > 0 && newQty <= item.p.cantidad) return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.p.id !== id));
  const total = useMemo(() => cart.reduce((sum, item) => sum + (item.p.precio * item.qty), 0), [cart]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const nVenta = await addVenta({ items: cart.map(c => ({ productoId: c.p.id, nombre: c.p.nombre, cantidad: c.qty, precioUnitario: c.p.precio })), total, canal, metodoPago: metodo, clienteNombre: cliente || undefined });
    await deductStock(cart.map(c => ({ productoId: c.p.id, cantidad: c.qty })));
    setCart([]); setCliente(""); setLastVenta(nVenta);
  };

  if (!invLoaded || !salesLoaded) {
    return (<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-rm-blue border-t-transparent rounded-full animate-spin" /></div>);
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)]">
      {/* TABS */}
      <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button onClick={() => setActiveTab("pos")} className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm active:scale-95 ${activeTab === "pos" ? "bg-rm-blue text-white shadow-[0_0_20px_rgba(0,68,255,0.3)]" : "liquid-glass text-rm-text-muted hover:text-white"}`}>
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Punto de</span> Venta
        </button>
        <button onClick={() => setActiveTab("history")} className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm active:scale-95 ${activeTab === "history" ? "bg-rm-blue text-white shadow-[0_0_20px_rgba(0,68,255,0.3)]" : "liquid-glass text-rm-text-muted hover:text-white"}`}>
          <Receipt className="w-4 h-4 sm:w-5 sm:h-5" /> Historial
        </button>
      </div>

      {activeTab === "pos" && (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 flex-1 min-h-0">
          {/* PRODUCTS */}
          <div className="flex-1 flex flex-col liquid-glass rounded-2xl overflow-hidden min-h-0">
            <div className="p-4 sm:p-5 border-b border-white/5 shrink-0">
              <h2 className="flex items-center text-base sm:text-xl font-bold text-white mb-3 sm:mb-4">Catalogo <Tooltip content="Busca productos con stock." /></h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rm-text-muted/50" />
                <input type="text" placeholder="Buscar repuestos..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-rm-blue/50 transition-colors" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {filteredProducts.map(p => (
                  <button key={p.id} onClick={() => addToCart(p)} className="text-left liquid-glass-subtle rounded-xl p-3 sm:p-4 hover:border-rm-blue/50 hover:bg-white/5 transition-all group flex flex-col active:scale-95">
                    <div className="flex justify-between items-start mb-1.5 sm:mb-2 gap-1">
                      <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-white/5 text-rm-text-muted capitalize truncate">{p.categoria}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-400 whitespace-nowrap">x{p.cantidad}</span>
                    </div>
                    <div className="flex-1 mb-1.5 sm:mb-2">
                      {p.imagen && (<div className="w-full h-16 sm:h-24 bg-white rounded-lg mb-2 flex items-center justify-center p-1.5 overflow-hidden shadow-inner"><img src={p.imagen} alt={p.nombre} className="w-full h-full object-contain mix-blend-multiply" /></div>)}
                      <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-2 group-hover:text-rm-blue transition-colors">{p.nombre}</h3>
                    </div>
                    <p className="text-sm sm:text-lg font-black text-white">{formatCurrency(p.precio)}</p>
                  </button>
                ))}
                {filteredProducts.length === 0 && (<div className="col-span-full py-10 text-center text-rm-text-muted text-sm">Sin productos con stock.</div>)}
              </div>
            </div>
          </div>

          {/* CART */}
          <div className="w-full lg:w-[380px] flex flex-col liquid-glass rounded-2xl overflow-hidden shrink-0">
            <div className="p-4 sm:p-5 border-b border-white/5 bg-rm-blue/10 flex items-center gap-3 shrink-0">
              <ShoppingCart className="w-5 h-5 text-rm-blue" />
              <h2 className="text-base sm:text-lg font-bold text-white">Carrito</h2>
              {cart.length > 0 && <span className="ml-auto bg-rm-blue/20 text-rm-blue text-xs font-bold px-2 py-1 rounded-full">{cart.length}</span>}
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 min-h-[100px]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-rm-text-muted opacity-50 py-8">
                  <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mb-3" />
                  <p className="text-sm">Carrito vacio</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.p.id} className="flex gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm truncate">{item.p.nombre}</p>
                        <p className="text-rm-text-muted text-xs mt-0.5">{formatCurrency(item.p.precio)} x {item.qty}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="font-bold text-emerald-400 text-sm">{formatCurrency(item.p.precio * item.qty)}</p>
                        <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-0.5">
                          <button onClick={() => updateQty(item.p.id, -1)} className="p-1.5 hover:bg-white/10 rounded-md text-white disabled:opacity-50 active:scale-90" disabled={item.qty <= 1}><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold w-5 text-center text-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.p.id, 1)} className="p-1.5 hover:bg-white/10 rounded-md text-white disabled:opacity-50 active:scale-90" disabled={item.qty >= item.p.cantidad}><Plus className="w-3 h-3" /></button>
                          <button onClick={() => removeFromCart(item.p.id)} className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md text-rm-text-muted ml-0.5 transition-colors active:scale-90"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* CHECKOUT */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-black/20 space-y-3 sm:space-y-4 shrink-0">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-rm-text-muted shrink-0" />
                <input type="text" placeholder="Cliente (opcional)" value={cliente} onChange={(e) => setCliente(e.target.value)} className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-rm-text-muted tracking-wider block mb-1">Canal</label>
                  <select value={canal} onChange={(e) => setCanal(e.target.value as CanalVenta)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none">
                    <option value="local">Local</option><option value="mercadolibre">MercadoLibre</option><option value="instagram">Instagram</option><option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-rm-text-muted tracking-wider block mb-1">Pago</label>
                  <select value={metodo} onChange={(e) => setMetodo(e.target.value as MetodoPago)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none">
                    <option value="efectivo">Efectivo</option><option value="mercadopago">MercadoPago</option><option value="transferencia">Transferencia</option><option value="tarjeta">Tarjeta</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-white/5">
                <span className="text-rm-text-muted font-medium text-sm">Total</span>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter">{formatCurrency(total)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full btn-pill-blue py-3.5 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform text-sm sm:text-base">
                <CreditCard className="w-5 h-5" /> Completar Venta
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="flex-1 liquid-glass rounded-2xl overflow-hidden flex flex-col min-h-0">
          <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-black/20 shrink-0">
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white mb-0.5">Historial de Ventas</h2>
              <p className="text-rm-text-muted text-xs sm:text-sm">Operaciones registradas.</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 sm:px-4 py-2 rounded-xl text-emerald-400 font-bold text-sm whitespace-nowrap">
              Total: {formatCurrency(ventas.reduce((acc, v) => acc + v.total, 0))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {ventas.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-rm-text-muted opacity-60 py-16">
                <Clock className="w-12 h-12 mb-3" />
                <p>No hay ventas aun.</p>
              </div>
            ) : (
              <>
                {/* Mobile Cards */}
                <div className="sm:hidden divide-y divide-white/5">
                  {ventas.map((v) => (
                    <div key={v.id} className="p-4 active:bg-white/[0.02]">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <p className="text-white text-sm font-semibold">{new Date(v.fecha).toLocaleDateString("es-AR")}</p>
                          <p className="text-[10px] text-rm-text-muted font-mono">{v.id.split("-")[0].toUpperCase()}</p>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm">{formatCurrency(v.total)}</span>
                      </div>
                      <p className="text-xs text-white line-clamp-1 mb-2">{v.items.map(i => `${i.cantidad}x ${i.nombre}`).join(", ")}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold text-rm-text-muted uppercase">{v.metodoPago}</span>
                          {v.clienteNombre && <span className="text-[10px] text-rm-text-muted">{v.clienteNombre}</span>}
                        </div>
                        <button onClick={() => printTicket(v)} className="p-2 bg-rm-blue/10 text-rm-blue hover:bg-rm-blue hover:text-white rounded-lg transition-colors active:scale-90"><Printer className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Desktop Table */}
                <table className="hidden sm:table w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#0A0D18]/90 backdrop-blur-md z-10">
                    <tr>
                      <th className="px-5 py-4 text-xs font-bold text-rm-text-muted uppercase tracking-wider border-b border-white/5">Fecha</th>
                      <th className="px-5 py-4 text-xs font-bold text-rm-text-muted uppercase tracking-wider border-b border-white/5">Cliente</th>
                      <th className="px-5 py-4 text-xs font-bold text-rm-text-muted uppercase tracking-wider border-b border-white/5">Detalle</th>
                      <th className="px-5 py-4 text-xs font-bold text-rm-text-muted uppercase tracking-wider border-b border-white/5">Pago</th>
                      <th className="px-5 py-4 text-xs font-bold text-rm-text-muted uppercase tracking-wider border-b border-white/5 text-right">Total</th>
                      <th className="px-5 py-4 text-xs font-bold text-rm-text-muted uppercase tracking-wider border-b border-white/5 text-center">Accion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ventas.map((v) => (
                      <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4"><p className="text-white text-sm font-semibold">{new Date(v.fecha).toLocaleDateString("es-AR")}</p><p className="text-xs text-rm-text-muted font-mono">{v.id.split("-")[0].toUpperCase()}</p></td>
                        <td className="px-5 py-4 text-sm text-rm-text-muted">{v.clienteNombre || "Consumidor Final"}</td>
                        <td className="px-5 py-4"><div className="text-sm text-white line-clamp-2">{v.items.map(i => `${i.cantidad}x ${i.nombre}`).join(", ")}</div></td>
                        <td className="px-5 py-4"><span className="px-2 py-1 bg-white/5 rounded text-xs font-bold text-rm-text-muted uppercase">{v.metodoPago}</span></td>
                        <td className="px-5 py-4 text-right"><span className="text-emerald-400 font-bold">{formatCurrency(v.total)}</span></td>
                        <td className="px-5 py-4 text-center"><button onClick={() => printTicket(v)} className="p-2 bg-rm-blue/10 text-rm-blue hover:bg-rm-blue hover:text-white rounded-lg transition-colors inline-flex"><Printer className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      <Modal isOpen={!!lastVenta} onClose={() => setLastVenta(null)} title="Venta Exitosa" maxWidth="max-w-sm">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">{lastVenta && formatCurrency(lastVenta.total)}</h3>
            <p className="text-rm-text-muted text-sm mt-1">Registrado en {lastVenta?.metodoPago}</p>
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <button onClick={() => { if(lastVenta) printTicket(lastVenta); setLastVenta(null); }} className="w-full btn-pill-blue py-3 font-bold flex items-center justify-center gap-2 active:scale-95"><Printer className="w-5 h-5" /> Imprimir Ticket</button>
            <button onClick={() => setLastVenta(null)} className="w-full btn-glass py-3 font-bold flex items-center justify-center gap-2 active:scale-95"><Plus className="w-4 h-4" /> Nueva Venta</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function VentasPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-rm-blue border-t-transparent rounded-full animate-spin" /></div>}>
      <VentasContent />
    </Suspense>
  );
}