
"use client";

import { Package, ClipboardList, DollarSign, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
import { useInventory } from "@/lib/hooks/useInventory";
import { useOrders } from "@/lib/hooks/useOrders";
import { useSales } from "@/lib/hooks/useSales";
import { formatCurrency, ESTADO_ORDEN_LABELS } from "@/lib/utils";
import StatsCard from "./components/StatsCard";
import Link from "next/link";

export default function AdminDashboard() {
  const { productos, loaded: invLoaded, getStats: getInvStats } = useInventory();
  const { ordenes, loaded: ordLoaded, getStats: getOrdStats } = useOrders();
  const { ventas, loaded: salesLoaded } = useSales();

  if (!invLoaded || !ordLoaded || !salesLoaded) {
    return (<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-rm-blue border-t-transparent rounded-full animate-spin" /></div>);
  }

  const invStats = getInvStats();
  const ordStats = getOrdStats();
  const hoyStr = new Date().toISOString().split("T")[0];
  const ingresosHoy = ventas.filter(v => v.fecha.startsWith(hoyStr)).reduce((sum, v) => sum + v.total, 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-rm-text-muted mt-1 text-sm sm:text-base">Panel de control de RM Servicio Tecnico</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
        <StatsCard title="Productos" value={invStats.totalProductos ?? 0} href="/admin/inventario" icon={<Package className="w-5 h-5 sm:w-6 sm:h-6" />} />
        <StatsCard title="Unidades" value={invStats.totalUnidades ?? 0} href="/admin/inventario" icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />} color="text-rm-blue" />
        <StatsCard title="Ingresos Hoy" value={formatCurrency(ingresosHoy)} href="/admin/ventas" icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />} color="text-emerald-400" />
        <StatsCard title="Valor Stock" value={formatCurrency(invStats.valorStock ?? 0)} href="/admin/inventario" icon={<Package className="w-5 h-5 sm:w-6 sm:h-6" />} color="text-rm-text-muted" />
        <StatsCard title="Ordenes Activas" value={ordStats.ordenesActivas ?? 0} href="/admin/ordenes" icon={<ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />} color="text-amber-400" />
        <StatsCard title="Completadas Hoy" value={ordStats.ordenesCompletadasHoy ?? 0} href="/admin/ordenes" icon={<CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />} color="text-rm-blue" />
        <StatsCard title="Stock Bajo" value={invStats.stockBajo ?? 0} href="/admin/inventario" icon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />} color={((invStats.stockBajo ?? 0) > 0) ? "text-red-400" : "text-rm-text-muted"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Link href="/admin/inventario" className="group liquid-glass glass-shine rounded-2xl p-5 sm:p-8 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-rm-blue/15 border border-rm-blue/15 text-rm-blue group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold text-white">Inventario</h3>
              <p className="text-xs sm:text-sm text-rm-text-muted">Productos, stock y precios</p>
            </div>
          </div>
          <div className="flex items-center text-rm-blue text-sm font-semibold">Ir al inventario &rarr;</div>
        </Link>

        <Link href="/admin/ordenes" className="group liquid-glass glass-shine rounded-2xl p-5 sm:p-8 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-rm-blue/15 border border-rm-blue/15 text-rm-blue group-hover:scale-110 transition-transform">
              <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold text-white">Ordenes</h3>
              <p className="text-xs sm:text-sm text-rm-text-muted">Seguimiento de reparaciones</p>
            </div>
          </div>
          <div className="flex items-center text-rm-blue text-sm font-semibold">Ver ordenes &rarr;</div>
        </Link>
      </div>

      {ordenes.length > 0 && (
        <div className="liquid-glass rounded-2xl overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-white/5">
            <h3 className="text-base sm:text-lg font-bold text-white">Ultimas Ordenes</h3>
          </div>
          <div className="divide-y divide-white/5">
            {ordenes.slice(0, 5).map((orden) => (
              <Link href="/admin/ordenes" key={orden.id} className="px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors block active:bg-white/[0.04]">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="font-semibold text-white text-sm sm:text-base truncate">{orden.clienteNombre}</p>
                  <p className="text-xs sm:text-sm text-rm-text-muted truncate">{orden.equipo} {orden.marca}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border whitespace-nowrap shrink-0 ${
                  orden.estado === "listo" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" :
                  orden.estado === "en_reparacion" ? "bg-amber-500/15 text-amber-400 border-amber-500/20" :
                  orden.estado === "entregado" ? "bg-rm-blue/15 text-rm-blue border-rm-blue/20" :
                  "bg-white/5 text-rm-text-muted border-white/10"
                }`}>
                  {ESTADO_ORDEN_LABELS[orden.estado]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
