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