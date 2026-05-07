// === Tipos de Logística Interna ===

export type Categoria = 'heladera' | 'lavarropas' | 'repuesto' | 'otro';
export type EstadoProducto = 'nuevo' | 'reparado' | 'en_reparacion' | 'para_repuesto';
export type EstadoOrden = 'recibido' | 'en_diagnostico' | 'en_reparacion' | 'listo' | 'entregado';

export interface Producto {
  id: string;
  nombre: string;
  categoria: Categoria;
  estado: EstadoProducto;
  precio: number;
  costoUSD: number;
  costoPesos: number;
  cantidad: number;
  ubicacion: string;
  imagen?: string;
  notas: string;
  publicadoEnML?: boolean;
  linkML?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistorialEntry {
  id: string;
  estadoAnterior: EstadoOrden | null;
  estadoNuevo: EstadoOrden;
  nota: string;
  fecha: string;
}

export interface OrdenTrabajo {
  id: string;
  clienteNombre: string;
  clienteTelefono: string;
  equipo: string;
  marca: string;
  modelo: string;
  problemaReportado: string;
  diagnostico: string;
  estado: EstadoOrden;
  fechaIngreso: string;
  fechaEstimada: string;
  presupuesto: number;
  historial: HistorialEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProductos: number;
  totalUnidades: number;
  ordenesActivas: number;
  ordenesCompletadasHoy: number;
  valorStock: number;
  stockBajo: number;
}

export interface AppSettings {
  cotizacionDolar: number;
  margenGlobal: number;
}

export type CanalVenta = 'local' | 'mercadolibre' | 'instagram' | 'otro';
export type MetodoPago = 'efectivo' | 'transferencia' | 'tarjeta' | 'mercadopago';

export interface VentaItem {
  productoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Venta {
  id: string;
  items: VentaItem[];
  total: number;
  canal: CanalVenta;
  metodoPago: MetodoPago;
  clienteNombre?: string;
  fecha: string;
}
