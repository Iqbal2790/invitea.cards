const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://uldbknkgnpisayqweklt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: templates, error: fetchError } = await supabase.from('templates').select('id, nama, created_at');
  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return;
  }
  
  const ivoryTemplates = templates.filter(t => t.nama === 'Ivory Line');
  console.log("Found Ivory Line templates:", ivoryTemplates);
  
  if (ivoryTemplates.length > 1) {
    ivoryTemplates.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const toDelete = ivoryTemplates[0]; // The older one
    console.log("Deleting duplicate (older one):", toDelete.id);
    
    const { error: deleteError } = await supabase.from('templates').delete().eq('id', toDelete.id);
    if (deleteError) {
        console.error("Delete error:", deleteError);
    } else {
        console.log("Deleted successfully.");
    }
  } else {
    console.log("No duplicates found or only 1 exists.");
  }
}
main();
