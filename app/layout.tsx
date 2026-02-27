import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monkbot | WordPress AI Operations Platform",
  description:
    "Monkbot connects your WordPress sites to a managed AI operations backend with domain control, API key security, and usage governance."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}
