import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features | Monkbot',
  description: 'Explore the powerful features that make Monkbot the ultimate AI Copilot for WordPress.',
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-200 py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
            The Primitive Tools for <br className="hidden md:block" /> Complex CMS Operations
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto mb-10">
            MonkBot isn't just a basic chatbot. It's an intelligent agent hooked directly into WordPress core APIs, capable of performing multi-step operations instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </Link>
            <Link href="/talk-to-sales" className="bg-white border text-gray-900 hover:border-gray-400 font-medium px-8 py-4 rounded-xl transition-all shadow-sm">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900">Core Capabilities</h2>
          <p className="text-gray-600 mt-2">Everything you need to automate your WordPress fleet.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Dynamic Content Generation", desc: "Draft, edit, and publish posts automatically using state-of-the-art LLMs.", icon: "📝" },
            { title: "Plugin & Theme Updates", desc: "Query outdated plugins and instantly run safe, background updates.", icon: "🔄" },
            { title: "Database Introspection", desc: "Safely query tables and structure without opening phpMyAdmin.", icon: "🗄️" },
            { title: "WooCommerce Management", desc: "Update order statuses, check inventory, and analyze sales via prompt.", icon: "🛍️" },
            { title: "User Moderation", desc: "Review comments, combat spam, and manage subscriber roles instantly.", icon: "🛡️" },
            { title: "Custom Code Execution", desc: "Safely execute scoped PHP scripts directly inside the sandbox.", icon: "⚡" },
          ].map((feature, i) => (
            <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center border border-gray-100">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="bg-gray-900 text-white py-24 px-4 md:px-6 mt-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 bg-gray-800 text-xs font-semibold mb-6 tracking-wide text-gray-300 uppercase">
              Enterprise Ready
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">Omnichannel Control</h2>
            <p className="text-gray-400 text-lg font-light mb-8 max-w-lg">
              Manage your WordPress sites directly from Slack, Microsoft Teams, or WhatsApp. MonkBot's headless architecture lets you invoke operations from anywhere, ensuring your team never has to switch tabs to update order statuses or moderate comments.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Slack & Teams native apps</li>
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Secure API endpoints for custom triggers</li>
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Rate-limited execution and audit logs</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 flex flex-col gap-4">
              {/* Mockup Slack UI */}
              <div className="flex gap-4 p-4 rounded-xl bg-gray-900 border border-gray-700">
                <div className="w-10 h-10 rounded bg-indigo-500 flex-shrink-0 flex items-center justify-center font-bold text-white shadow-inner">P</div>
                <div>
                  <div className="font-semibold text-sm mb-1">Pete (Admin) <span className="text-gray-500 text-xs font-normal ml-2">12:04 PM</span></div>
                  <p className="text-sm text-gray-300">@MonkBot Check if WooCommerce needs an update on the staging site.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-gray-800 border border-gray-700 ml-8">
                <div className="w-10 h-10 rounded bg-white flex-shrink-0 p-1">
                  <img src="/brand/monkbot-logo.png" alt="Monkbot" className="w-full h-full object-contain grayscale opacity-80" />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-white">MonkBot <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded text-gray-400 ml-2">APP</span></div>
                  <p className="text-sm text-gray-300 mb-2">Yes, WooCommerce v8.5.2 is available. Want me to run the update?</p>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded transition-colors">Yes, update now</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded transition-colors">No, remind me later</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
