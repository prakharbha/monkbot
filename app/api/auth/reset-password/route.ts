import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password || typeof token !== 'string' || typeof password !== 'string') {
            return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        // Find and validate the token
        const record = await prisma.verificationToken.findUnique({ where: { token } });

        if (!record) {
            return NextResponse.json({ error: 'Invalid or expired reset link.' }, { status: 400 });
        }

        if (record.expiresAt < new Date()) {
            // Clean up expired token
            await prisma.verificationToken.delete({ where: { token } });
            return NextResponse.json({ error: 'This reset link has expired. Please request a new one.' }, { status: 400 });
        }

        // Update the user's password
        const hashed = await bcrypt.hash(password, 12);
        await prisma.user.update({
            where: { email: record.email },
            data: { password: hashed },
        });

        // Delete the used token
        await prisma.verificationToken.delete({ where: { token } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error resetting password:', error);
        return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
    }
}
