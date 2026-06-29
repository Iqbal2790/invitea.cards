import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanOrders() {
  console.log("Menghapus data pesanan dari Supabase...");
  // Menghapus semua pesanan (karena ini testing)
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .neq('order_id', 'dummy-id'); // Trick to delete all
    
  if (error) {
    console.error("Gagal menghapus:", error);
  } else {
    console.log("Berhasil menghapus seluruh data pesanan testing!");
  }
}

cleanOrders();
