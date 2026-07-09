import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("templates").select("id, nama, created_at");
  return NextResponse.json({ data, error });
}
