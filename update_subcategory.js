const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://uldbknkgnpisayqweklt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY';
const TEMPLATE_ID = 'b61395f5-c1ad-486f-add9-cac4bb13d314';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase
    .from('templates')
    .select('fields_config')
    .eq('id', TEMPLATE_ID)
    .single();

  if (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }

  const currentConfig = data.fields_config || {};
  currentConfig.subCategory = 'Romantis';

  const { data: updateData, error: updateError } = await supabase
    .from('templates')
    .update({ fields_config: currentConfig })
    .eq('id', TEMPLATE_ID)
    .select()
    .single();

  if (updateError) {
    console.error('Update error:', updateError);
    process.exit(1);
  }

  console.log('✅ Updated fields_config:', updateData.fields_config);
}

run();
