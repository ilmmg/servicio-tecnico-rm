#!/usr/bin/env node
/**
 * Crea un usuario administrador en Supabase Auth.
 * Uso: node scripts/create-admin.mjs --email x@y.com --password "secret"
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(resolve(root, ".env.local"));
loadEnvFile(resolve(root, ".env"));

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--email") args.email = argv[++i];
    else if (arg === "--password") args.password = argv[++i];
    else if (arg === "--name") args.name = argv[++i];
  }
  return args;
}

const { email, password, name } = parseArgs(process.argv.slice(2));

if (!email || !password) {
  console.error("Uso: npm run admin:create -- --email admin@ejemplo.com --password \"TuPassword\" [--name \"Nombre\"]");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: {
    role: "admin",
    ...(name ? { full_name: name } : {}),
  },
});

if (error) {
  console.error("Error creando admin:", error.message);
  process.exit(1);
}

console.log("Usuario admin creado:");
console.log("  ID:", data.user.id);
console.log("  Email:", data.user.email);
console.log("  role:", data.user.user_metadata?.role);
console.log("\nPodés iniciar sesión en /login con esas credenciales.");
