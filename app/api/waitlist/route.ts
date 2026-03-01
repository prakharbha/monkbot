import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_to_bypass_build");

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        if (!name || !email || typeof name !== 'string' || typeof email !== 'string') {
            return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
        }

        const trimmedName = name.trim().slice(0, 200);
        const trimmedEmail = email.trim().toLowerCase().slice(0, 320);

        // Basic email format check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        // Notify admin
        await resend.emails.send({
            from: 'MonkBot Waitlist <onboarding@resend.dev>',
            to: 'prakhar@nandann.com',
            subject: `🎉 New Pro Waitlist Signup: ${trimmedName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 500px;">
                    <h2 style="color:#1d4ed8;">New Pro Plan Waitlist Signup</h2>
                    <p><strong>Name:</strong> ${trimmedName}</p>
                    <p><strong>Email:</strong> ${trimmedEmail}</p>
                    <p style="color:#6b7280; font-size:13px;">Signed up at ${new Date().toISOString()}</p>
                </div>
            `,
        });

        // Confirmation to user
        await resend.emails.send({
            from: 'MonkBot Team <onboarding@resend.dev>',
            to: trimmedEmail,
            subject: `You're on the MonkBot Pro waitlist!`,
            html: `
                <div style="font-family: sans-serif; max-width: 500px;">
                    <h2 style="color:#1d4ed8;">You're on the list, ${trimmedName}! 🎉</h2>
                    <p>Thanks for joining the MonkBot Pro waitlist. We're working hard to launch Pro and you'll be among the first to know when it's ready.</p>
                    <p>In the meantime, you can keep using MonkBot Free — no credit card required.</p>
                    <br/>
                    <p>Best,<br/>The MonkBot Team</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Waitlist signup error:', error);
        return NextResponse.json({ error: 'Failed to join waitlist. Please try again.' }, { status: 500 });
    }
}
