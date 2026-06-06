# RM Servicio Técnico — Estado del proyecto

## Completado

- [x] Proyecto Next.js con App Router, TypeScript y Tailwind CSS v4
- [x] Landing pública (`/`) con tema claro/oscuro
- [x] Autenticación Supabase y middleware de admin (`/login`, `/admin`)
- [x] Panel admin: dashboard, inventario, órdenes, ventas/POS, integraciones (UI)
- [x] Seguimiento público de reparaciones (`/work`)
- [x] Esquema de base de datos y migraciones en `supabase/migrations/`
- [x] Correcciones de UI (modal, tema, HTML semántico)
- [x] ESLint sin errores (`npm run lint`)

## En curso / pendiente

- [ ] Aplicar migraciones en el proyecto Supabase de producción/local
- [ ] Crear usuario administrador con `user_metadata.role = admin`
- [ ] Verificar login y acceso al panel en local

## Roadmap

- [ ] Integraciones reales: Mercado Libre, Mercado Pago, Meta (hoy es maqueta)
- [ ] Mover operaciones críticas a capa server-side (API routes / Server Actions)
- [ ] Endurecer RLS y revisar RPC pública de órdenes
- [ ] Tests automatizados (hooks, panel, auth)
- [ ] Imágenes optimizadas, reportes y comprobantes

## Comandos útiles

```bash
npm run dev          # desarrollo local
npm run build        # build de producción
npm run lint         # verificar código
npm run db:setup     # instrucciones para migraciones
npm run admin:create # crear usuario admin (requiere service role key)
```
