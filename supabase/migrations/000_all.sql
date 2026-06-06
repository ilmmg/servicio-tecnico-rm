-- ========== 001_initial_schema.sql ==========

-- ===========================================
-- RM Servicio Tecnico - Esquema de Base de Datos
-- ===========================================

-- Productos / Inventario
CREATE TABLE IF NOT EXISTS productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('heladera', 'lavarropas', 'repuesto', 'otro')),
  estado TEXT NOT NULL CHECK (estado IN ('nuevo', 'reparado', 'en_reparacion', 'para_repuesto')),
  precio INTEGER DEFAULT 0,
  costo_usd NUMERIC(10,2) DEFAULT 0,
  costo_pesos INTEGER DEFAULT 0,
  cantidad INTEGER DEFAULT 0,
  ubicacion TEXT DEFAULT '',
  imagen TEXT DEFAULT '',
  notas TEXT DEFAULT '',
  publicado_en_ml BOOLEAN DEFAULT false,
  link_ml TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ordenes de Trabajo
CREATE TABLE IF NOT EXISTS ordenes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_nombre TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  equipo TEXT NOT NULL,
  marca TEXT DEFAULT '',
  modelo TEXT DEFAULT '',
  problema_reportado TEXT NOT NULL,
  diagnostico TEXT DEFAULT '',
  estado TEXT NOT NULL DEFAULT 'recibido' CHECK (estado IN ('recibido', 'en_diagnostico', 'en_reparacion', 'listo', 'entregado')),
  fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_estimada DATE,
  presupuesto INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Historial de cambios de estado de ordenes
CREATE TABLE IF NOT EXISTS historial_ordenes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  orden_id UUID NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE,
  estado_anterior TEXT,
  estado_nuevo TEXT NOT NULL,
  nota TEXT DEFAULT '',
  fecha TIMESTAMPTZ DEFAULT now()
);

-- Ventas
CREATE TABLE IF NOT EXISTS ventas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total INTEGER NOT NULL,
  canal TEXT NOT NULL CHECK (canal IN ('local', 'mercadolibre', 'instagram', 'otro')),
  metodo_pago TEXT NOT NULL CHECK (metodo_pago IN ('efectivo', 'transferencia', 'tarjeta', 'mercadopago')),
  cliente_nombre TEXT DEFAULT '',
  fecha TIMESTAMPTZ DEFAULT now()
);

-- Items de cada venta
CREATE TABLE IF NOT EXISTS venta_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venta_id UUID NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
  producto_id UUID,
  nombre TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  precio_unitario INTEGER NOT NULL
);

-- Settings (key-value)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger para auto-update de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$$$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER productos_updated_at
  BEFORE UPDATE ON productos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER ordenes_updated_at
  BEFORE UPDATE ON ordenes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indices
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_estado ON productos(estado);
CREATE INDEX IF NOT EXISTS idx_ordenes_estado ON ordenes(estado);
CREATE INDEX IF NOT EXISTS idx_ordenes_cliente ON ordenes(cliente_nombre);
CREATE INDEX IF NOT EXISTS idx_historial_orden ON historial_ordenes(orden_id);
CREATE INDEX IF NOT EXISTS idx_venta_items_venta ON venta_items(venta_id);

-- Settings default
INSERT INTO settings (key, value) VALUES 
  ('cotizacion_dolar', '1200'::jsonb),
  ('margen_global', '50'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Row Level Security (permisivo por ahora)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE historial_ordenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE venta_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_productos" ON productos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_ordenes" ON ordenes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_historial" ON historial_ordenes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_ventas" ON ventas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_venta_items" ON venta_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- ========== 002_admin_auth.sql ==========

-- ===========================================
-- Seguridad de admin con Supabase Auth
-- ===========================================

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin';
$$;

DROP POLICY IF EXISTS allow_all_productos ON productos;
DROP POLICY IF EXISTS allow_all_ordenes ON ordenes;
DROP POLICY IF EXISTS allow_all_historial ON historial_ordenes;
DROP POLICY IF EXISTS allow_all_ventas ON ventas;
DROP POLICY IF EXISTS allow_all_venta_items ON venta_items;
DROP POLICY IF EXISTS allow_all_settings ON settings;

CREATE POLICY productos_admin_select ON productos
  FOR SELECT USING (public.is_admin_user());
CREATE POLICY productos_admin_insert ON productos
  FOR INSERT WITH CHECK (public.is_admin_user());
CREATE POLICY productos_admin_update ON productos
  FOR UPDATE USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY productos_admin_delete ON productos
  FOR DELETE USING (public.is_admin_user());

CREATE POLICY ordenes_admin_select ON ordenes
  FOR SELECT USING (public.is_admin_user());
CREATE POLICY ordenes_admin_insert ON ordenes
  FOR INSERT WITH CHECK (public.is_admin_user());
CREATE POLICY ordenes_admin_update ON ordenes
  FOR UPDATE USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY ordenes_admin_delete ON ordenes
  FOR DELETE USING (public.is_admin_user());

CREATE POLICY historial_admin_select ON historial_ordenes
  FOR SELECT USING (public.is_admin_user());
CREATE POLICY historial_admin_insert ON historial_ordenes
  FOR INSERT WITH CHECK (public.is_admin_user());
CREATE POLICY historial_admin_update ON historial_ordenes
  FOR UPDATE USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY historial_admin_delete ON historial_ordenes
  FOR DELETE USING (public.is_admin_user());

CREATE POLICY ventas_admin_select ON ventas
  FOR SELECT USING (public.is_admin_user());
CREATE POLICY ventas_admin_insert ON ventas
  FOR INSERT WITH CHECK (public.is_admin_user());
CREATE POLICY ventas_admin_update ON ventas
  FOR UPDATE USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY ventas_admin_delete ON ventas
  FOR DELETE USING (public.is_admin_user());

CREATE POLICY venta_items_admin_select ON venta_items
  FOR SELECT USING (public.is_admin_user());
CREATE POLICY venta_items_admin_insert ON venta_items
  FOR INSERT WITH CHECK (public.is_admin_user());
CREATE POLICY venta_items_admin_update ON venta_items
  FOR UPDATE USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY venta_items_admin_delete ON venta_items
  FOR DELETE USING (public.is_admin_user());

CREATE POLICY settings_admin_select ON settings
  FOR SELECT USING (public.is_admin_user());
CREATE POLICY settings_admin_insert ON settings
  FOR INSERT WITH CHECK (public.is_admin_user());
CREATE POLICY settings_admin_update ON settings
  FOR UPDATE USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY settings_admin_delete ON settings
  FOR DELETE USING (public.is_admin_user());

-- ========== 003_public_order_rpc.sql ==========

-- ===========================================
-- Busqueda Publica de Ordenes Segura
-- ===========================================

-- Funcion para obtener una orden publica de forma segura por su UUID
CREATE OR REPLACE FUNCTION get_order_by_id_public(order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
  o RECORD;
BEGIN
  -- Buscar la orden por ID exacto
  SELECT * INTO o FROM ordenes WHERE id = order_id;
  
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Retornar solo datos no sensibles publicos
  SELECT jsonb_build_object(
    'orden', jsonb_build_object(
      'id', o.id,
      'equipo', o.equipo,
      'marca', o.marca,
      'modelo', o.modelo,
      'estado', o.estado
    ),
    'historial', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', h.id,
          'estado_nuevo', h.estado_nuevo,
          'nota', h.nota,
          'fecha', h.fecha
        )
      ), '[]'::jsonb)
      FROM historial_ordenes h 
      WHERE h.orden_id = o.id
    )
  ) INTO result;

  RETURN result;
END;
$$;

-- ========== 004_grant_public_rpc.sql ==========

-- Permite que usuarios anonimos consulten el estado de su orden via RPC
GRANT EXECUTE ON FUNCTION public.get_order_by_id_public(UUID) TO anon, authenticated;
