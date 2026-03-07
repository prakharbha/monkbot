import type { Metadata } from "next";

const BASE_URL = "https://monkbot.app";

export const metadata: Metadata = {
  title: "Pricing | Simple, Transparent WordPress AI Pricing",
  description:
    "Start automating your WordPress operations for free. Monkbot offers a free plan with 50 credits and 1 domain, with Pro plans for agencies scaling across multiple sites.",
  alternates: { canonical: `${BASE_URL}/pricing` },
  openGraph: {
    title: "Pricing | Monkbot - WordPress AI Platform",
    description:
      "Free forever plan with 50 credits. Pro plan at $19/month for agencies managing multiple WordPress sites with AI automation.",
    url: `${BASE_URL}/pricing`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Monkbot free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Monkbot offers a free plan forever with 50 credits and support for 1 domain. No credit card required to get started.",
      },
    },
    {
      "@type": "Question",
      name: "What are credits in Monkbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credits are consumed each time you run an AI operation on your WordPress site, such as drafting content, updating plugins, or querying your database. The free plan includes 50 credits.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the Pro plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pro plan at $19/month includes 500 credits, support for up to 3 domains, workflow integrations (Slack, Teams), and priority support.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade from the free plan later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can start with the free plan and join the waitlist for Pro when you are ready to scale your WordPress automation across more domains.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with Monkbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sign up for a free account at monkbot.app, generate an API key from your dashboard, install the Monkbot WordPress plugin, and paste your API key in the plugin settings. You will be up and running in minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Does Monkbot work with WooCommerce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Monkbot integrates directly with WooCommerce, allowing you to check inventory, update order statuses, and analyze sales data through natural language prompts.",
      },
    },
  ],
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Monkbot Pricing Plans",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Offer",
        name: "Monkbot Free Plan",
        description: "50 credits, 1 domain, standard email support. Free forever.",
        price: "0",
        priceCurrency: "USD",
        eligibleDuration: "P1Y",
        url: `${BASE_URL}/pricing`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Offer",
        name: "Monkbot Pro",
        description: "500 credits, up to 3 domains, workflow integrations, priority support.",
        price: "19",
        priceCurrency: "USD",
        billingIncrement: "P1M",
        url: `${BASE_URL}/pricing`,
      },
    },
  ],
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />
      {children}
    </>
  );
}
