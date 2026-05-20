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
