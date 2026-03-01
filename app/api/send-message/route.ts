import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// H1 Fix: Escape user input to prevent HTML injection in emails
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, message } = await req.json();

        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // H1 Fix: Escape all user-supplied values before embedding in HTML
        const safeFirstName = escapeHtml(String(firstName));
        const safeLastName = escapeHtml(String(lastName));
        const safeEmail = escapeHtml(String(email));
        const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br>');

        const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `;

        const data = await resend.emails.send({
            from: 'Monkbot Website <onboarding@resend.dev>',
            to: 'prakhar@nandann.com',
            subject: `New Message from ${safeFirstName} ${safeLastName}`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
