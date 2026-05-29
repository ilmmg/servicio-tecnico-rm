## Descripción General

RM Servicio Técnico es una aplicación web para operar un servicio técnico de línea blanca y electrónica con una misma base de datos. Resuelve tres necesidades del negocio: mostrar la propuesta comercial al público, administrar internamente inventario/órdenes/ventas desde un panel privado y permitir que los clientes consulten el estado de su reparación con un identificador de orden.

## Stack Tecnológico

- **Frontend y backend web:** Next.js 16 con App Router
- **Lenguaje principal:** TypeScript
- **UI:** React 19, Tailwind CSS v4, Lucide React y Sonner
- **Persistencia y autenticación:** Supabase (PostgreSQL, Auth, RPC y Row Level Security)
- **Despliegue/configuración:** Vercel

## Funcionalidades Principales

- **Landing pública:** la ruta `/` presenta servicios, proceso comercial, contacto y accesos rápidos, con soporte de tema claro/oscuro persistido en `localStorage`.
- **Acceso administrativo protegido:** `/login` autentica contra Supabase Auth y el `middleware.ts` restringe `/admin` a usuarios con `user_metadata.role = admin`.
- **Gestión de inventario:** `/admin/inventario` permite alta, edición y baja de productos, control de stock, cálculo de costo base en ARS/USD, margen sugerido, publicación en Mercado Libre y parámetros globales como cotización del dólar y margen.
- **Gestión de órdenes de trabajo:** `/admin/ordenes` registra ingresos de equipos, diagnóstico, presupuesto y avance de estados; además, guarda historial técnico en `historial_ordenes`.
- **Ventas y punto de venta:** `/admin/ventas` arma carrito, registra ventas, descuenta stock, guarda ítems vendidos y genera tickets imprimibles.
- **Seguimiento público de reparaciones:** `/work` consulta la RPC `get_order_by_id_public` para exponer solo datos no sensibles de la orden y su historial.
- **Modelo de datos operativo:** las migraciones de Supabase definen tablas para `productos`, `ordenes`, `historial_ordenes`, `ventas`, `venta_items` y `settings`, con políticas RLS orientadas a administración.
- **Integraciones en evolución:** `/admin/integraciones` ya expone la UI base para Mercado Libre, Mercado Pago y catálogo Meta, aunque hoy funciona como maqueta funcional sin conexión real a APIs externas.

## Instalación

```bash
cd /tmp/workspace/ilmmg/servicio-tecnico-rm
npm ci
cat <<'EOF' > .env.local
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
EOF
npm run dev
```

La aplicación quedará disponible en `http://localhost:3000`. Para que el panel funcione correctamente, la base de Supabase debe tener aplicado el esquema de `supabase/migrations` y al menos un usuario administrador con `user_metadata.role = admin`.

## Roadmap

- Conectar las integraciones de Mercado Libre, Mercado Pago y Meta con credenciales reales, sincronización y webhooks.
- Mover operaciones críticas de inventario, órdenes y ventas a capas server-side para reducir lógica sensible en cliente.
- Endurecer la seguridad de datos públicos y revisar las políticas RLS junto con la RPC de consulta de órdenes.
- Incorporar testing automatizado para hooks, flujos del panel y regresiones de autenticación.
- Normalizar carga de imágenes, reportes y comprobantes para profesionalizar el módulo comercial.
