const { createClient } = require('@supabase/supabase-js');
const fields_config = require('../Template-Build-Undangan/retro-vintage/02-generated/fields_config.json');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uldbknkgnpisayqweklt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('Checking / Inserting Retro Vintage template into Supabase...');

  // Check if template exists by name
  const { data: existing } = await supabase
    .from('templates')
    .select('id, nama')
    .eq('nama', 'Retro Vintage Romance');

  let result;
  if (existing && existing.length > 0) {
    console.log('Template already exists. Updating...', existing[0].id);
    const { data, error } = await supabase
      .from('templates')
      .update({
        kategori: 'undangan',
        harga: 149000,
        fields_config: fields_config,
        fitur_maps: true,
        fitur_countdown: true,
        fitur_rsvp: true,
        is_active: true
      })
      .eq('id', existing[0].id)
      .select();
    if (error) {
      console.error('Update error:', error);
      process.exit(1);
    }
    result = data;
  } else {
    console.log('Inserting new Retro Vintage template...');
    const { data, error } = await supabase
      .from('templates')
      .insert({
        nama: 'Retro Vintage Romance',
        kategori: 'undangan',
        harga: 149000,
        fields_config: fields_config,
        fitur_maps: true,
        fitur_countdown: true,
        fitur_rsvp: true,
        is_active: true
      })
      .select();
    if (error) {
      console.error('Insert error:', error);
      process.exit(1);
    }
    result = data;
  }

  console.log('✅ Berhasil! Template Retro Vintage Romance tersimpan di Supabase:');
  result.forEach(d => {
    console.log('   ID:', d.id);
    console.log('   Nama:', d.nama);
    console.log('   Kategori:', d.kategori);
  });
}

run();
