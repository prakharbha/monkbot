import Link from "next/link";

const pricingCards = [
  {
    name: "Free Plan",
    price: "$0",
    suffix: "/forever",
    note: "Everything you need to try out MonkBot.",
    cta: "Start for free",
    href: "/get-started",
    features: ["50 credits", "1 Domain", "Standard Email Support"],
    featured: true
  },
  {
    name: "Pro",
    price: "$19",
    suffix: "/month",
    note: "For agencies and power users scaling CMS operations.",
    cta: "Coming Soon",
    href: "#",
    features: ["500 credits", "Limit of 3 domains", "Different Workflow integrations", "Priority Support"],
    featured: false
  }
];

export default function PricingPage() {
  return (
    <>
      {/* Background Light Glow Element */}
      <div className="agent-bg-glow"></div>

      <section className="w-full relative z-10 min-h-[calc(100vh-80px)] xl:min-h-[800px] flex items-center justify-center py-12 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Copy */}
          <div className="w-full lg:w-5/12 flex flex-col items-start text-left lg:pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white shadow-sm mb-6 text-sm font-medium text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Open Beta Launch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900">Simple, transparent pricing</h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              Start automating your WordPress operations today. Upgrade only when you need to scale your usage across more domains.
            </p>
          </div>

          {/* Right Side: Pricing Cards with Background */}
          <div className="w-full lg:w-7/12 relative">
            {/* Soft decorative background for the cards area */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-[40px] -m-6 md:-m-12 border border-gray-100/50 shadow-sm pointer-events-none"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 pt-8 md:pt-0">
              {pricingCards.map((card) => (
                <article
                  key={card.name}
                  className={`rounded-3xl border p-6 md:p-8 flex flex-col bg-white transition-all duration-300 ${card.featured
                    ? "border-yellow-400 shadow-xl shadow-yellow-400/10 scale-100 md:scale-105 z-10 relative"
                    : "border-gray-200 shadow-sm hover:shadow-md"
                    }`}
                >
                  {card.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-gray-900 text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-sm whitespace-nowrap z-20">
                      Recommended Launch Plan
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-2xl font-semibold text-gray-900">{card.name}</p>
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <p className="text-5xl font-bold tracking-tight text-gray-900">{card.price}</p>
                    {card.suffix && <p className="text-gray-500 font-medium">{card.suffix}</p>}
                  </div>

                  <p className="mt-4 text-gray-600 min-h-[48px]">{card.note}</p>

                  <Link
                    href={card.href}
                    className={`mt-8 flex items-center justify-center h-12 w-full rounded-xl text-base font-semibold transition-all ${card.featured
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                      }`}
                  >
                    {card.cta}
                  </Link>

                  <div className="mt-8 border-t border-gray-100 pt-6 space-y-4 flex-1">
                    {card.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${card.featured ? 'text-green-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
