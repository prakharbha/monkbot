import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/verify-email?token=${token}`;

    try {
        await resend.emails.send({
            from: "MonkBot <noreply@nandann.com>",
            to: email,
            subject: "Verify your email address - MonkBot",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">Welcome to MonkBot!</h2>
          <p style="color: #555; line-height: 1.5;">Please verify your email address to start adding domains and using your API keys.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email</a>
          </p>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">If you didn't request this email, there's nothing to worry about — you can safely ignore it.</p>
        </div>
      `,
        });
    } catch (error) {
        console.error("Failed to send verification email:", error);
    }
}
