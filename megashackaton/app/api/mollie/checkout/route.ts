import { NextRequest, NextResponse } from "next/server";
import { createMollieClient, SequenceType } from "@mollie/api-client";

const mollie = createMollieClient({ apiKey: "test_fd2jFxTtr9Wfbnb3cfpTejeJKqyJeg" });

const PLAN_CONFIG: Record<string, { amount: string; description: string }> = {
    starter: { amount: "149.00", description: "Complai Starter — Monthly Subscription" },
    growth: { amount: "449.00", description: "Complai Growth — Monthly Subscription" },
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, planId } = body as {
            firstName: string;
            lastName: string;
            email: string;
            planId: string;
        };

        if (!firstName || !lastName || !email || !planId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const plan = PLAN_CONFIG[planId.toLowerCase()];
        if (!plan) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        // 1. Create a Mollie customer
        const customer = await mollie.customers.create({
            name: `${firstName} ${lastName}`,
            email,
            metadata: { planId },
        });

        // 2. Create a first payment — establishes a mandate for future recurring billing
        const baseUrl = req.headers.get("origin") ?? "http://localhost:3000";

        const payment = await mollie.payments.create({
            amount: { currency: "EUR", value: plan.amount },
            description: plan.description,
            sequenceType: SequenceType.first,
            customerId: customer.id,
            redirectUrl: `${baseUrl}/dashboard?payment=success&plan=${planId}`,
            webhookUrl: `${baseUrl}/api/mollie/webhook`,
            metadata: { planId, customerId: customer.id },
        });

        // The checkout URL is available on the _links object
        const checkoutUrl =
            (payment as unknown as { _links?: { checkout?: { href?: string } } })?._links?.checkout?.href ??
            `https://www.mollie.com/checkout/test/${payment.id}`;

        return NextResponse.json({ checkoutUrl });
    } catch (err: unknown) {
        console.error("[Mollie checkout error]", err);
        const message = err instanceof Error ? err.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
