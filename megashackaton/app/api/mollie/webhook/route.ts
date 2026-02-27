import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";

const mollie = createMollieClient({ apiKey: "test_fd2jFxTtr9Wfbnb3cfpTejeJKqyJeg" });

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const paymentId = formData.get("id") as string;

        if (!paymentId) {
            return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
        }

        const payment = await mollie.payments.get(paymentId);
        console.log(`[Mollie webhook] Payment ${paymentId} status: ${payment.status}`);

        // TODO: update your database subscription status here based on payment.status
        // e.g. if (payment.status === "paid") { activateSubscription(payment.metadata.planId, payment.customerId) }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("[Mollie webhook error]", err);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
