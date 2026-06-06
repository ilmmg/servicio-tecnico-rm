-- Permite que usuarios anonimos consulten el estado de su orden via RPC
GRANT EXECUTE ON FUNCTION public.get_order_by_id_public(UUID) TO anon, authenticated;
