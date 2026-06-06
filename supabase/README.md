# Supabase — configuración

## 1. Variables de entorno

```bash
cp .env.example .env.local
```

Completá en `.env.local`:

| Variable | Dónde obtenerla |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard → Settings → API → service_role key (solo scripts) |

## 2. Aplicar migraciones

En el [SQL Editor](https://supabase.com/dashboard) de tu proyecto, ejecutá **en orden**:

1. `migrations/001_initial_schema.sql`
2. `migrations/002_admin_auth.sql`
3. `migrations/003_public_order_rpc.sql`
4. `migrations/004_grant_public_rpc.sql`

O pegá el contenido de `migrations/000_all.sql` (archivo combinado generado para setup rápido).

## 3. Crear usuario administrador

Con `SUPABASE_SERVICE_ROLE_KEY` en `.env.local`:

```bash
npm run admin:create -- --email admin@tudominio.com --password "TuPasswordSegura123"
```

Opcional: `--name "Nombre Admin"`.

El script crea el usuario en Supabase Auth con `user_metadata.role = admin`, requerido por `middleware.ts` y las políticas RLS.

## 4. Verificar

1. `npm run dev`
2. Ir a `http://localhost:3000/login`
3. Iniciar sesión con el usuario admin
4. Deberías acceder a `/admin` sin redirección

## Notas

- Sin migraciones aplicadas, el panel fallará al cargar datos.
- Sin `role = admin` en `user_metadata`, el login redirige con error `forbidden`.
- La RPC `get_order_by_id_public` solo expone datos no sensibles de la orden.
