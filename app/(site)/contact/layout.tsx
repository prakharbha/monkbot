import type { Metadata } from "next";

const BASE_URL = "https://monkbot.app";

export const metadata: Metadata = {
  title: "Contact Us | Book a Demo or Send a Message",
  description:
    "Get in touch with the Monkbot team. Book a 15-minute demo, send a message, or explore career opportunities. We respond within 24 hours.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact Monkbot | Book a Demo",
    description:
      "Book a 15-minute demo to see Monkbot in action, or send us a message. We help agencies automate WordPress operations with AI.",
    url: `${BASE_URL}/contact`,
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Monkbot",
  url: `${BASE_URL}/contact`,
  description:
    "Contact the Monkbot team for support, demos, or career inquiries.",
  mainEntity: {
    "@type": "Organization",
    name: "Monkbot",
    url: BASE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "English",
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
