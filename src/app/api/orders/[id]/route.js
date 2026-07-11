import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { coreApi } from "@/lib/midtrans";
import crypto from "crypto";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;
  
  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    // Check order in Supabase
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, status_payment, midtrans_id, magic_token, slug, email, template_id")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let currentStatus = order.status_payment;
    let currentMagicToken = order.magic_token;
    let currentSlug = order.slug;

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
                newStatus = "paid";
              }
          } else if (transactionStatus == 'settlement') {
              newStatus = "paid";
          } else if (transactionStatus == 'cancel' ||
              transactionStatus == 'deny' ||
              transactionStatus == 'expire') {
              newStatus = "failed";
          }

          if (newStatus !== "pending") {
            // Update Supabase
            const updatePayload = { status_payment: newStatus };

            // Generate magic token if paid and doesn't have one
            if (newStatus === "paid" && !currentMagicToken) {
              currentMagicToken = crypto.randomBytes(16).toString("hex");
              const randomSuffix = crypto.randomBytes(2).toString("hex");
              currentSlug = `udg-${order.id.split("-")[0]}-${randomSuffix}`;
              
              const expiredDate = new Date();
              expiredDate.setFullYear(expiredDate.getFullYear() + 1);

              updatePayload.magic_token = currentMagicToken;
              updatePayload.slug = currentSlug;
              updatePayload.expired_at = expiredDate.toISOString();
            }

            await supabaseAdmin
              .from("orders")
              .update(updatePayload)
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
      status: currentStatus,
      magic_token: currentMagicToken,
      slug: currentSlug
    });
    
  } catch (error) {
    console.error("Error fetching order status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
