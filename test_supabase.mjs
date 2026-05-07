import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://dhhmafjtytaethuypdze.supabase.co';
const supabaseKey = 'sb_publishable_1wSVOeJaP3cW0dz9oJBveQ_qOjFWp88';
const supabase = createClient(supabaseUrl, supabaseKey);
async function testInsert() {
  console.log('Testing Supabase insert...');
  const { data, error } = await supabase.from('productos').insert({ nombre: 'Test Script', categoria: 'repuesto', estado: 'nuevo', precio: 100 }).select();
  if (error) console.error('ERROR inserting:', JSON.stringify(error, null, 2));
  else console.log('SUCCESS inserting:', data);
}
testInsert();