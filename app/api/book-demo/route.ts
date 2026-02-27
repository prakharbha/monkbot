import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_to_bypass_build");
    try {
        const { name, email, phone, demoTime } = await req.json();

        if (!name || !email || !phone || !demoTime) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Email to Prakhar
        const internalHtmlContent = `
      <h2>New Demo Booking request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Requested Slot:</strong> ${demoTime}</p>
    `;

        // 2. Email to Customer
        const customerHtmlContent = `
      <h2>Demo Request Confirmed: Monkbot</h2>
      <p>Hi ${name},</p>
      <p>Thank you for expressing interest in Monkbot. We have received your demo request for <strong>${demoTime}</strong>.</p>
      <p>Our team will reach out shortly to provide the meeting link.</p>
      <br />
      <p>Best,<br>The Monkbot Team</p>
    `;

        // Send to Prakhar
        const internalEmail = await resend.emails.send({
            from: 'Monkbot Demo <onboarding@resend.dev>',
            to: 'prakhar@nandann.com',
            subject: `[ACTION REQUIRED] New Demo Request: ${name}`,
            html: internalHtmlContent,
        });

        // Send to Customer
        const customerEmail = await resend.emails.send({
            from: 'Monkbot Team <onboarding@resend.dev>',
            to: email, // This requires the Resend domain to be verified, or using a sandbox email address
            subject: `Demo Confirmation: Monkbot`,
            html: customerHtmlContent,
        });

        return NextResponse.json({ success: true, internal: internalEmail, customer: customerEmail });
    } catch (error) {
        console.error('Error booking demo:', error);
        return NextResponse.json(
            { error: 'Failed to book demo' },
            { status: 500 }
        );
    }
}
