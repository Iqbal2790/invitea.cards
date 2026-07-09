import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { coreApi } from "@/lib/midtrans";

export async function GET(request, { params }) {
  // Use `await` for `params` in Next.js 15+ if needed, but since we are handling resolved params typically:
  const orderId = params.id;
  
  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    // Check order in Supabase
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, status, midtrans_id")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let currentStatus = order.status;

    // If still pending, optionally check midtrans directly for the most up-to-date status
    if (currentStatus === "pending") {
      try {
        const midtransStatus = await coreApi.transaction.status(orderId);
        if (midtransStatus) {
          const transactionStatus = midtransStatus.transaction_status;
          const fraudStatus = midtransStatus.fraud_status;

          let newStatus = "pending";
          if (transactionStatus == 'capture') {
              if (fraudStatus == 'challenge') {
                newStatus = "pending";
              } else if (fraudStatus == 'accept') {
                newStatus = "settlement";
              }
          } else if (transactionStatus == 'settlement') {
              newStatus = "settlement";
          } else if (transactionStatus == 'cancel' ||
              transactionStatus == 'deny' ||
              transactionStatus == 'expire') {
              newStatus = "cancel";
          }

          if (newStatus !== "pending") {
            // Update Supabase
            await supabaseAdmin
              .from("orders")
              .update({ status: newStatus })
              .eq("id", orderId);
            
            currentStatus = newStatus;
          }
        }
      } catch (midtransError) {
        // Midtrans transaction might not exist yet if they haven't chosen a payment method,
        // so we ignore 404 errors from coreApi and just return pending.
        console.log("Midtrans status check skipped or not found:", midtransError.message);
      }
    }

    return NextResponse.json({ 
      id: order.id, 
      status: currentStatus 
    });
    
  } catch (error) {
    console.error("Error fetching order status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
