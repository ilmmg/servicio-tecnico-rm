/**
 * Script de migración: Normaliza el campo "nombre" de todos los productos
 * al formato Sentence Case (primera letra en mayúscula, resto en minúsculas,
 * preservando siglas de 2-4 letras en mayúsculas).
 *
 * Uso: node scripts/normalize-nombres.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dhhmafjtytaethuypdze.supabase.co';
const supabaseKey = 'sb_publishable_1wSVOeJaP3cW0dz9oJBveQ_qOjFWp88';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Convierte un texto al formato Sentence Case.
 * Preserva siglas (palabras de 2-4 letras totalmente en mayúsculas, ej: ML, GAS, USD).
 */
function toSentenceCase(text) {
  if (!text) return text;
  const trimmed = text.trim();
  if (!trimmed) return trimmed;

  const words = trimmed.split(/\s+/);
  const normalized = words.map((word, index) => {
    // Preservar siglas: palabras de 2-4 letras completamente en mayúsculas
    if (/^[A-Z0-9]{2,4}$/.test(word)) return word;
    // Primera palabra: primera letra mayúscula, resto minúsculas
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    // Resto de palabras: todo en minúsculas
    return word.toLowerCase();
  });

  return normalized.join(' ');
}

async function run() {
  console.log('🔍 Leyendo productos desde Supabase...');

  const { data: productos, error } = await supabase
    .from('productos')
    .select('id, nombre');

  if (error) {
    console.error('❌ Error al leer productos:', error.message);
    process.exit(1);
  }

  console.log(`✅ ${productos.length} productos encontrados.\n`);

  let actualizados = 0;
  let sinCambios = 0;
  const errores = [];

  for (const producto of productos) {
    const nombreNormalizado = toSentenceCase(producto.nombre);

    if (nombreNormalizado === producto.nombre) {
      sinCambios++;
      continue;
    }

    console.log(`  [${producto.id.slice(0, 8)}] "${producto.nombre}" → "${nombreNormalizado}"`);

    const { error: updateError } = await supabase
      .from('productos')
      .update({ nombre: nombreNormalizado })
      .eq('id', producto.id);

    if (updateError) {
      console.error(`  ❌ Error actualizando "${producto.nombre}":`, updateError.message);
      errores.push({ id: producto.id, nombre: producto.nombre, error: updateError.message });
    } else {
      actualizados++;
    }
  }

  console.log('\n=============================');
  console.log(`✅ Actualizados:  ${actualizados}`);
  console.log(`⏭️  Sin cambios:   ${sinCambios}`);
  if (errores.length > 0) {
    console.log(`❌ Con errores:   ${errores.length}`);
    errores.forEach(e => console.log(`   - ${e.nombre}: ${e.error}`));
  }
  console.log('=============================');
}

run();
