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
      .select("id, status_payment, midtrans_id, magic_token, slug, email, template_id, created_at")
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
              
              if (!currentSlug) {
                const randomSuffix = crypto.randomBytes(2).toString("hex");
                currentSlug = `udg-${order.id.split("-")[0]}-${randomSuffix}`;
              }
              
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

      // If still pending after Midtrans check (or if Midtrans 404'd), enforce our own 6-minute timeout.
      // Since our Snap tokens and transactions expire in 5 minutes, if it's still pending after 6 minutes,
      // it's effectively expired. This handles Midtrans delays in updating status to 'expire'.
      if (currentStatus === "pending" && order.created_at) {
        const createdAt = new Date(order.created_at);
        const now = new Date();
        if ((now - createdAt) > 6 * 60 * 1000) {
          currentStatus = "failed";
          await supabaseAdmin
            .from("orders")
            .update({ status_payment: "failed" })
            .eq("id", orderId);
        }
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
