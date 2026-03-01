import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// Very basic in-memory rate limiter: max 3 requests per IP per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const window = 15 * 60 * 1000; // 15 minutes
    const entry = rateLimitMap.get(ip);
    if (!entry || entry.resetAt < now) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + window });
        return false;
    }
    if (entry.count >= 3) return true;
    entry.count++;
    return false;
}

export async function POST(req: Request) {
    // H2 Fix: Rate limit by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
        return NextResponse.json({ success: true }); // Don't reveal rate limiting
    }

    try {
        const { email } = await req.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // C1 Fix: Always return success to prevent account enumeration
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Don't reveal that this email doesn't exist
            return NextResponse.json({ success: true });
        }

        // C1 Fix: Generate a real, cryptographically secure token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Upsert so we don't get a unique constraint error on repeated requests
        await prisma.verificationToken.upsert({
            where: { email },
            update: { token, expiresAt },
            create: { email, token, expiresAt },
        });

        const host = req.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const resetLink = `${protocol}://${host}/reset-password?token=${token}`;

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555;">We received a request to reset the password for your MonkBot account.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background-color:#111827;color:#ffffff;text-decoration:none;border-radius:5px;font-weight:bold;">Reset Password</a>
        </p>
        <p style="color: #888; font-size: 12px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `;

        await resend.emails.send({
            from: 'MonkBot Security <onboarding@resend.dev>',
            to: email,
            subject: 'Reset your MonkBot password',
            html: htmlContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending password reset:', error);
        return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
    }
}
