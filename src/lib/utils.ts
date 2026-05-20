// === Utilidades ===

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calcularPrecioSugerido(
  costoUSD: number,
  costoPesos: number,
  cotizacion: number,
  margen: number
): { costoBase: number; precioSugerido: number } {
  // El costo base es el mayor entre: costo manual en pesos, o costo USD * cotización
  const costoDesdeUSD = costoUSD > 0 && cotizacion > 0 ? costoUSD * cotizacion : 0;
  const costoBase = Math.max(costoPesos, costoDesdeUSD);
  const precioSugerido = costoBase > 0 ? Math.round(costoBase * (1 + margen / 100)) : 0;
  return { costoBase, precioSugerido };
}

export const CATEGORIA_LABELS: Record<string, string> = {
  heladera: 'Heladera',
  lavarropas: 'Lavarropas',
  repuesto: 'Repuesto',
  otro: 'Otro',
};

export const ESTADO_PRODUCTO_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  reparado: 'Reparado',
  en_reparacion: 'En reparación',
  para_repuesto: 'Para repuesto',
};

export const ESTADO_ORDEN_LABELS: Record<string, string> = {
  recibido: 'Recibido',
  en_diagnostico: 'En diagnóstico',
  en_reparacion: 'En reparación',
  listo: 'Listo para retirar',
  entregado: 'Entregado',
};

export const ESTADO_PRODUCTO_COLORS: Record<string, string> = {
  nuevo: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  reparado: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  en_reparacion: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  para_repuesto: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const ESTADO_ORDEN_COLORS: Record<string, string> = {
  recibido: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  en_diagnostico: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  en_reparacion: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  listo: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  entregado: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export const DEFAULT_MARGENES: Record<string, number> = {
  heladera: 40,
  lavarropas: 40,
  repuesto: 60,
  otro: 50,
};
