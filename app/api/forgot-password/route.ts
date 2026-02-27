import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_to_bypass_build");
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const host = req.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const resetLink = `${protocol}://${host}/reset-password?token=mock-token-${Date.now()}`;

        const htmlContent = `
      <h2>Password Reset Request</h2>
      <p>Hi there,</p>
      <p>We received a request to reset the password for your Monkbot account associated with this email address.</p>
      <p>Please click the link below to set a new password:</p>
      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#111827;color:#ffffff;text-decoration:none;border-radius:5px;margin-top:15px;margin-bottom:15px;">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <br />
      <p>Best,<br>The Monkbot Team</p>
    `;

        const data = await resend.emails.send({
            from: 'Monkbot Security <onboarding@resend.dev>',
            to: email, // Must be verified domain or test email in sandbox
            subject: `Reset your Monkbot password`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error sending password reset:', error);
        return NextResponse.json(
            { error: 'Failed to send password reset email' },
            { status: 500 }
        );
    }
}
