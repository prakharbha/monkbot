import { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://monkbot.app";

export const metadata: Metadata = {
  title: "Terms of Service | MonkBot",
  description: "MonkBot Terms of Service — your rights and obligations when using the platform.",
  alternates: { canonical: `${BASE_URL}/terms` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "March 7, 2025";
const CONTACT_EMAIL = "legal@monkbot.app";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* Beta notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="font-semibold text-amber-900 mb-1">Beta Product — Important Limitations</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              MonkBot is a beta product. Features may be added, changed, or removed at any time without notice. The Service is provided &ldquo;as is&rdquo; without warranties of any kind. We make no commitments regarding uptime, data preservation, performance, or the availability of third-party integrations. Your use of the beta is at your own risk.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the MonkBot platform and website operated by MonkBot Inc. (&ldquo;MonkBot,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By creating an account or using the Service, you agree to be bound by these Terms and our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
            <p className="mt-3">
              If you do not agree to these Terms, do not use the Service. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              MonkBot is an AI-powered WordPress automation platform that allows users to manage their WordPress sites through natural language prompts. The Service may include, among other features:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>AI-generated content creation and publishing.</li>
              <li>Plugin and theme update automation.</li>
              <li>WooCommerce order and inventory management.</li>
              <li>Database introspection and querying.</li>
              <li>Custom PHP code execution within a sandboxed environment.</li>
              <li>Integration with Slack, Microsoft Teams, and other messaging platforms.</li>
            </ul>
            <p className="mt-3">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice or liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Accounts</h2>
            <p>
              You must register for an account to use the Service. You agree to provide accurate information and keep it updated. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us immediately of any unauthorized access at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
            </p>
            <p className="mt-3">
              We may suspend or terminate your account at any time, at our sole discretion, without notice or liability, including if we believe you have violated these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Use of Third-Party AI Services</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
              <p className="text-sm text-blue-900 font-medium mb-1">Disclosure: AI Provider Processing</p>
              <p className="text-sm text-blue-800">
                Your prompts and related data are transmitted to third-party AI providers. MonkBot does not control and is not responsible for their handling of your data.
              </p>
            </div>
            <p>
              The Service relies on third-party AI providers including OpenAI and Anthropic to generate responses. By using MonkBot, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Your prompts, instructions, and related context will be transmitted to these providers.</li>
              <li>Each provider&apos;s own terms of service and privacy policy govern their processing of your data.</li>
              <li>MonkBot does not guarantee the accuracy, quality, or appropriateness of AI-generated outputs.</li>
              <li>MonkBot is not responsible for actions taken on your WordPress sites based on AI-generated instructions — you are solely responsible for reviewing and approving any automated actions.</li>
              <li>AI provider availability, pricing, and features may change without notice, which may affect the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. WordPress Abilities API and MCP Server</h2>
            <p>
              MonkBot routes your instructions and site data through its WordPress Abilities API and a Model Context Protocol (MCP) server to execute multi-step operations on your WordPress installations. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Data transmitted to these services is necessary for the Service to function.</li>
              <li>MonkBot does not guarantee the reliability, security, or continued availability of these services during the beta phase.</li>
              <li>You are responsible for the consequences of operations executed on your WordPress sites through MonkBot.</li>
              <li>You should maintain your own backups of your WordPress sites independent of MonkBot.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Credits and Billing</h2>
            <p>
              Access to MonkBot features may require credits. Free plan users receive a limited credit allocation. Paid plans are billed as described on our{" "}
              <Link href="/pricing" className="text-blue-600 hover:underline">Pricing page</Link>.
            </p>
            <p className="mt-3">
              During the beta phase, pricing, credit allocations, and billing terms are subject to change. We will attempt to provide advance notice of material pricing changes. Credits are non-refundable except where required by applicable law. We reserve the right to adjust credit balances or plan limits at any time during the beta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Violate any applicable law or regulation.</li>
              <li>Execute operations on WordPress sites you do not own or are not authorized to manage.</li>
              <li>Generate, distribute, or publish harmful, illegal, defamatory, or infringing content.</li>
              <li>Attempt to circumvent rate limits, abuse credits, or exploit platform vulnerabilities.</li>
              <li>Reverse engineer, decompile, or attempt to extract source code from the Service.</li>
              <li>Use the Service in a manner that disrupts, degrades, or impairs its availability for other users.</li>
              <li>Transmit malware, viruses, or other harmful code.</li>
              <li>Harvest or scrape data from the Service in an automated manner without our written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Content and Data</h2>
            <p>
              You retain ownership of the content and data you input into MonkBot. By using the Service, you grant MonkBot a limited, non-exclusive license to process your content solely to provide the Service (including transmitting it to third-party AI providers as described above).
            </p>
            <p className="mt-3">
              You represent that you have all rights necessary to provide your content to MonkBot, and that doing so does not violate any third-party rights or applicable laws.
            </p>
            <p className="mt-3">
              Do not input sensitive personal data (such as passwords, financial account numbers, government IDs, or health information) into MonkBot prompts. We are not responsible for the security of such data once transmitted to third-party AI providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
            <p>
              The Service, including its design, code, trademarks, and content (excluding user-provided content), is owned by MonkBot Inc. and protected by intellectual property laws. You may not copy, modify, or distribute any part of the Service without our prior written consent.
            </p>
            <p className="mt-3">
              AI-generated outputs produced by the Service may be used by you subject to the terms of the underlying AI providers. MonkBot makes no warranties regarding the originality or intellectual property status of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
            <p className="uppercase text-sm font-semibold text-gray-500 tracking-wide mb-3">Important — Please Read Carefully</p>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OR ERROR-FREE OPERATION.
            </p>
            <p className="mt-3">
              WE DO NOT WARRANT THAT: (A) THE SERVICE WILL MEET YOUR REQUIREMENTS; (B) THE SERVICE WILL BE AVAILABLE AT ANY PARTICULAR TIME; (C) ANY AI-GENERATED OUTPUT WILL BE ACCURATE, COMPLETE, OR SUITABLE FOR ANY PURPOSE; (D) ANY THIRD-PARTY SERVICES (INCLUDING OPENAI, ANTHROPIC, MCP, OR WORDPRESS APIS) WILL FUNCTION AS EXPECTED; OR (E) YOUR DATA WILL BE PRESERVED OR PROTECTED AGAINST LOSS.
            </p>
            <p className="mt-3">
              AS A BETA PRODUCT, THE SERVICE MAY HAVE SIGNIFICANT BUGS, LIMITATIONS, AND PERIODS OF UNAVAILABILITY. USE THE SERVICE AT YOUR OWN RISK AND MAINTAIN INDEPENDENT BACKUPS OF ALL IMPORTANT DATA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MONKBOT INC. AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            <p className="mt-3">
              OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE SIX MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS (USD $100).
            </p>
            <p className="mt-3">
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATION OF LIABILITY. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless MonkBot Inc. and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your content or data; or (d) your violation of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which MonkBot Inc. is incorporated, without regard to its conflict of law provisions. Any dispute arising from these Terms or the Service shall be resolved through binding arbitration or in the competent courts of that jurisdiction, and you consent to personal jurisdiction in that forum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to These Terms</h2>
            <p>
              We may update these Terms at any time. We will update the &ldquo;Last updated&rdquo; date at the top of this page. For material changes, we will attempt to notify you via email or a notice on the Service. Your continued use of the Service after changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Miscellaneous</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Entire agreement:</strong> These Terms and the Privacy Policy constitute the entire agreement between you and MonkBot regarding the Service.</li>
              <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in full force.</li>
              <li><strong>No waiver:</strong> Failure to enforce any provision does not constitute a waiver of that right.</li>
              <li><strong>Assignment:</strong> You may not assign your rights under these Terms without our consent. We may assign our rights freely.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Us</h2>
            <p>
              For questions about these Terms, contact us at:
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
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-gray-900 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
