import { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://monkbot.app";

export const metadata: Metadata = {
  title: "Privacy Policy | MonkBot",
  description: "MonkBot Privacy Policy — how we collect, use, and share your data.",
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "March 7, 2025";
const CONTACT_EMAIL = "privacy@monkbot.app";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* Beta notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="font-semibold text-amber-900 mb-1">Beta Product Notice</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              MonkBot is currently in beta. Features, data practices, and third-party integrations may change without prior notice. We make no guarantees regarding data retention, uptime, or the behavior of third-party services used within the platform. By using MonkBot, you acknowledge and accept these limitations.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Who We Are</h2>
            <p>
              MonkBot (&ldquo;MonkBot,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides an AI-powered automation platform for WordPress site management. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you use our website at{" "}
              <Link href="https://monkbot.app" className="text-blue-600 hover:underline">monkbot.app</Link>{" "}
              and our software-as-a-service platform (collectively, the &ldquo;Service&rdquo;).
            </p>
            <p className="mt-3">
              If you have questions about this policy, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account information:</strong> name, email address, and password when you register.</li>
              <li><strong>WordPress connection credentials:</strong> API keys, site URLs, or plugin credentials you provide to connect your WordPress installations.</li>
              <li><strong>Prompts and instructions:</strong> natural language queries and commands you enter into MonkBot to perform operations on your WordPress sites.</li>
              <li><strong>Payment information:</strong> processed by our third-party payment provider; we do not store raw card data.</li>
              <li><strong>Communications:</strong> messages you send us via contact forms or email.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Usage data:</strong> pages visited, features used, timestamps, and interaction logs.</li>
              <li><strong>Device and browser data:</strong> IP address, browser type, operating system.</li>
              <li><strong>Session cookies:</strong> HTTP-only session tokens used to authenticate your account. We do not use cross-site tracking cookies.</li>
              <li><strong>API call logs:</strong> records of API requests made through your account, including prompt content, for billing, debugging, and abuse prevention.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide, operate, and improve the Service.</li>
              <li>Authenticate your account and maintain your session.</li>
              <li>Process your WordPress automation requests.</li>
              <li>Calculate credit usage and enforce plan limits.</li>
              <li>Send transactional emails (account verification, password resets, billing receipts).</li>
              <li>Investigate abuse, fraud, or violations of our Terms of Service.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information to third parties, and we do not use your data for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Disclosure to Third Parties</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
              <p className="text-sm text-blue-900 font-medium mb-1">Important: Third-Party AI Processing</p>
              <p className="text-sm text-blue-800">
                To deliver AI-powered responses, your prompts and related context are transmitted to external AI providers. By using MonkBot, you consent to this transmission.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 AI Model Providers</h3>
            <p>Your natural language prompts and relevant context (such as WordPress site data retrieved to fulfil a request) are forwarded to one or more of the following providers to generate responses:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>OpenAI</strong> — <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a>
              </li>
              <li>
                <strong>Anthropic</strong> — <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a>
              </li>
            </ul>
            <p className="mt-3">
              Each provider has its own data retention and usage policies. MonkBot does not control how these providers handle data once transmitted. We encourage you to review their privacy policies. Do not include sensitive personal data (passwords, financial information, private keys) in your prompts.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4.2 WordPress Abilities API</h3>
            <p>
              To execute WordPress operations (plugin management, content creation, WooCommerce actions, etc.), MonkBot transmits your instructions and relevant site context to our WordPress Abilities API service. This service acts as a bridge between MonkBot's AI layer and your WordPress installation. Data sent may include your natural language instruction, the resolved action parameters, and data returned from your WordPress site needed to complete the request.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4.3 MCP Server</h3>
            <p>
              MonkBot uses a Model Context Protocol (MCP) server to coordinate multi-step agentic operations. Your prompts, intermediate results, and tool call parameters may be routed through this server. This is required for the Service to function. The MCP server is operated by MonkBot or its infrastructure partners.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4.4 Infrastructure and Service Providers</h3>
            <p>We use reputable third-party vendors for hosting, database services, email delivery, and payment processing. These vendors are contractually bound to protect your data and are prohibited from using it for purposes other than providing services to us.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4.5 Legal Disclosures</h3>
            <p>We may disclose your information if required by law, court order, or government authority, or if we believe disclosure is necessary to protect the rights, property, or safety of MonkBot, our users, or the public.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p>
              As a beta product, we have not yet established fixed data retention schedules. We retain your account data for as long as your account is active or as needed to provide the Service. API call logs may be retained for billing, debugging, and abuse prevention purposes for an unspecified period. We reserve the right to delete data at any time during the beta phase.
            </p>
            <p className="mt-3">
              You may request deletion of your account and associated personal data by contacting us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>. Note that data already transmitted to third-party AI providers cannot be retrieved or deleted by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information, including HTTPS encryption, hashed passwords, and HTTP-only session cookies. However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security, particularly during the beta phase. Use the Service at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate data.</li>
              <li>Request deletion of your personal data (subject to legal obligations and limitations regarding third-party transmitted data).</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <p>
              The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own, including countries where AI model providers and infrastructure partners operate. By using MonkBot, you consent to such transfers. We take steps to ensure adequate protections are in place, but cannot guarantee equivalent legal protections to those in your country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy at any time, particularly during the beta phase. We will update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the Service after changes constitutes your acceptance of the updated policy. We recommend reviewing this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p>
              For questions or concerns about this Privacy Policy or our data practices, contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm">
              <p className="font-semibold text-gray-900">MonkBot Inc.</p>
              <p className="mt-1">
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>
              </p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-gray-900 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
