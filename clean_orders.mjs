import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uldbknkgnpisayqweklt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY";

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanOrders() {
  console.log("Menghapus data pesanan dari Supabase...");
  // Menghapus semua pesanan (karena ini testing)
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .neq('id', 'dummy-id'); // Trick to delete all
    
  if (error) {
    console.error("Gagal menghapus:", error);
  } else {
    console.log("Berhasil menghapus seluruh data pesanan testing!");
  }
}

cleanOrders();
