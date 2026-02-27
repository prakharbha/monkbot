import Link from "next/link";
import BackgroundGlow from "../components/BackgroundGlow";
import ChatSlider from "../components/ChatSlider";
import WordRotator from "../components/WordRotator";
import PluginDownloadCard from "../components/PluginDownloadCard";

export default function HomePage() {
  return (
    <>
      {/* Interactive Antigravity Particle Field */}
      <BackgroundGlow />

      <section className="w-full relative overflow-hidden flex-1 min-h-[500px] md:min-h-[700px] flex items-center justify-center -mt-12">
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center px-4 md:px-8 w-full max-w-[1400px] mx-auto mt-24 md:mt-32 pb-12">

          {/* Left Side 5/12: Hero Content */}
          <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white shadow-sm mb-6 text-sm font-medium text-gray-600 hover:shadow-md transition-shadow">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              MonkBot MCP Server Active
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-balance text-gray-900">
              <span className="flex flex-wrap items-center">
                <span>The AI&nbsp;</span>
                <WordRotator />
              </span>
              <span className="block mt-2">for WordPress</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-gray-600 text-balance font-light leading-relaxed">
              Stop switching context. Manage content, tweak designs, and resolve site issues directly through natural language. Connect your WordPress sites to the ultimate agentic backend.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
              <Link href="/get-started" className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap">
                Start for free
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow whitespace-nowrap">
                Book a demo
              </Link>
            </div>
          </div>

          {/* Right Side 7/12: Chat Slider */}
          <div className="w-full lg:w-7/12 relative mt-12 lg:mt-0">
            <ChatSlider />
          </div>

        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center max-w-3xl mx-auto text-gray-900">
            Full control over your fleet
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600 max-w-2xl mx-auto">
            MonkBot gives you the primitive tools needed to automate mundane CMS tasks across hundreds of domains simultaneously.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-[#f8f9fa] border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Omnichannel Commands</h3>
              <p className="text-gray-600 mb-8 max-w-md">Invoke MonkBot from Slack, Microsoft Teams, or custom API endpoints. Your CMS operations are never more than a prompt away.</p>
              <div className="h-[280px] w-full bg-white rounded-xl border border-gray-200 shadow-inner flex flex-col p-4 overflow-hidden relative">
                {/* Fading edges to make it look like a Continuous chat */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

                <div className="w-full max-w-[250px] mx-auto flex flex-col gap-4 mt-auto">
                  {/* Example 1 */}
                  <div className="flex flex-col gap-1.5 opacity-40">
                    <div className="flex gap-2 w-full">
                      <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-300">
                        <img src="https://i.pravatar.cc/100?img=33" alt="User Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2 text-[10px] sm:text-[11px] text-gray-600 w-[calc(100%-20px)] leading-tight shadow-sm text-left">Check site health.</div>
                    </div>
                    <div className="flex gap-2 flex-row-reverse w-full">
                      <div className="w-5 h-5 rounded-full bg-yellow-50 border border-yellow-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-[10px] sm:text-[11px] text-gray-700 w-[calc(100%-20px)] leading-tight tracking-tight shadow-sm text-left">All systems nominal. No broken links.</div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="flex flex-col gap-1.5 opacity-70">
                    <div className="flex gap-2 w-full">
                      <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-300">
                        <img src="https://i.pravatar.cc/100?img=33" alt="User Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2 text-[10px] sm:text-[11px] text-gray-600 w-[calc(100%-20px)] leading-tight shadow-sm text-left">Draft a new post about our Spring Collection.</div>
                    </div>
                    <div className="flex gap-2 flex-row-reverse w-full">
                      <div className="w-5 h-5 rounded-full bg-yellow-50 border border-yellow-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-[10px] sm:text-[11px] text-gray-700 w-[calc(100%-20px)] leading-tight tracking-tight shadow-sm text-left">Draft created with ID 142. Ready for review!</div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 w-full">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-300">
                        <img src="https://i.pravatar.cc/100?img=33" alt="User Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2 text-[10px] sm:text-xs text-gray-600 w-[calc(100%-24px)] leading-tight shadow-sm text-left">Update the winter sale post status to published.</div>
                    </div>
                    <div className="flex gap-2 flex-row-reverse w-full">
                      <div className="w-6 h-6 rounded-full bg-yellow-50 border border-yellow-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-[10px] sm:text-xs text-gray-700 w-[calc(100%-24px)] leading-tight tracking-tight shadow-sm text-left">Done. The post is now live!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-[#f8f9fa] border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Secure Execution</h3>
              <p className="text-gray-600 mb-6">Every prompt execution is strictly logged, rate-limited, and verified via secure API tokens.</p>
              <div className="h-40 w-full bg-white rounded-xl border border-gray-200 shadow-inner p-4 flex flex-col justify-between">
                {/* Mini Logs */}
                <div className="space-y-2">
                  <div className="h-2 w-full bg-green-100 rounded"></div>
                  <div className="h-2 w-4/5 bg-gray-100 rounded"></div>
                  <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                </div>
                <div className="text-[10px] text-green-600 font-mono text-right font-semibold border-t border-gray-100 pt-2">
                  VERIFIED
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 w-full">
              <PluginDownloadCard isAuthed={false} showAuthToggle={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Basic CTA */}
      <section className="w-full py-20 bg-gray-900 border-t border-gray-800 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Ready to upgrade your workflow?</h2>
          <p className="mt-4 text-xl text-gray-400 font-light">Join the agencies automating WordPress operations with MonkBot.</p>
          <div className="mt-10">
            <Link href="/pricing" className="bg-white text-gray-900 hover:bg-gray-100 text-base font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-white/10">
              View Free Plan Details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
