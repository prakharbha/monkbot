import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

const BASE_URL = "https://monkbot.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Monkbot | WordPress AI Operations Platform",
    template: "%s | Monkbot",
  },
  description:
    "Monkbot connects your WordPress sites to a managed AI operations backend with domain control, API key security, and usage governance.",
  keywords: [
    "WordPress AI",
    "WordPress automation",
    "AI chatbot WordPress",
    "WordPress management platform",
    "MCP server WordPress",
    "WooCommerce automation",
    "WordPress agency tools",
    "AI WordPress plugin",
    "WordPress agentic backend",
  ],
  authors: [{ name: "Monkbot", url: BASE_URL }],
  creator: "Monkbot",
  publisher: "Monkbot",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Monkbot",
    title: "Monkbot | WordPress AI Operations Platform",
    description:
      "Connect your WordPress sites to a managed AI backend. Automate content, plugins, and WooCommerce via natural language.",
    images: [
      {
        url: "/brand/monkbot-logo.png",
        width: 1200,
        height: 630,
        alt: "Monkbot - WordPress AI Operations Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monkbot | WordPress AI Operations Platform",
    description:
      "Connect your WordPress sites to a managed AI backend. Automate via natural language.",
    images: ["/brand/monkbot-logo.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Monkbot",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/monkbot-logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${BASE_URL}/contact`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Monkbot",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H8Q2G85TCC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H8Q2G85TCC');
          `}
        </Script>
      </body>
    </html>
  );
}
