import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uldbknkgnpisayqweklt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY";

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanOrders() {
  console.log("Menghapus data pesanan dari database...");
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .not('id', 'is', null);
    
  if (error) {
    console.error("Gagal menghapus database:", error);
  } else {
    console.log("Berhasil menghapus seluruh data pesanan dari database!");
  }

  console.log("Menghapus file gambar dari Storage...");
  const { data: storageData, error: storageError } = await supabase.storage.emptyBucket('orders');
  
  if (storageError) {
    console.error("Gagal menghapus bucket:", storageError);
  } else {
    console.log("Berhasil membersihkan seluruh gambar di Storage!");
  }
}

cleanOrders();
