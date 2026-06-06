#!/usr/bin/env node
/**
 * Genera migrations/000_all.sql combinando todas las migraciones en orden.
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = resolve(__dirname, "../supabase/migrations");

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql") && f !== "000_all.sql")
  .sort();

const combined = files
  .map((f) => {
    const content = readFileSync(resolve(migrationsDir, f), "utf8");
    return `-- ========== ${f} ==========\n\n${content.trim()}\n`;
  })
  .join("\n");

const outPath = resolve(migrationsDir, "000_all.sql");
writeFileSync(outPath, combined, "utf8");

console.log("Archivo generado:", outPath);
console.log("\nPasos:");
console.log("1. Abrí el SQL Editor de tu proyecto en https://supabase.com/dashboard");
console.log("2. Pegá el contenido de supabase/migrations/000_all.sql");
console.log("3. Ejecutá el script");
console.log("4. Creá el admin: npm run admin:create -- --email ... --password ...");
