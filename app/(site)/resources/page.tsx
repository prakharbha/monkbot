import Link from "next/link";
import PluginDownloadCard from "../../components/PluginDownloadCard";

const steps = [
    {
        id: "account",
        number: "01",
        title: "Create an Account & Get Your API Key",
        color: "blue",
        items: [
            {
                step: "Sign up",
                detail: <>Visit <Link href="https://monkbot.app/sign-up" className="text-blue-600 hover:underline font-medium">monkbot.app/sign-up</Link> and create a free account. Verify your email address when prompted.</>
            },
            {
                step: "Generate an API Key",
                detail: "After signing in, go to your Dashboard. Click \"Get a New Key\" to generate your MonkBot API key. Copy it and keep it safe — you'll need it in Step 3."
            },
            {
                step: "Add your domain",
                detail: <>On the Dashboard, click <strong>+ Add Domain</strong> and enter your WordPress site's domain (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">yoursite.com</code>). This authorises your site to use the API key. You must verify your email before adding a domain.</>
            },
        ]
    },
    {
        id: "plugin",
        number: "02",
        title: "Install the Plugin & Connect to MonkBot",
        color: "purple",
        items: [
            {
                step: "Download the plugin",
                detail: "Download the MonkBot plugin zip using the button below. You must be logged in to access the download."
            },
            {
                step: "Install in WordPress",
                detail: <>In your WordPress admin panel go to <strong>Plugins → Add New → Upload Plugin</strong>. Upload the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">monkbot-plugin.zip</code> file and click <strong>Install Now</strong>, then <strong>Activate</strong>.</>
            },
            {
                step: "Add your API Key",
                detail: <>After activation, go to <strong>MonkBot → Settings</strong> in the WordPress sidebar. Paste your API key from Step 1 into the <strong>API Key</strong> field and click <strong>Save Settings</strong>. MonkBot will validate your key and domain automatically.</>
            },
            {
                step: "Test it",
                detail: <>Go to <strong>MonkBot</strong> in the WordPress sidebar and type a message. If the connection is working, MonkBot will respond. If you see a validation error, double-check that the domain registered on monkbot.app exactly matches your WordPress site URL.</>
            },
        ]
    },
    {
        id: "telegram",
        number: "03",
        title: "Set Up Telegram Integration (Optional)",
        color: "green",
        subtitle: "Get AI-powered alerts and site updates directly in your Telegram.",
        subsections: [
            {
                heading: "A. Create a Telegram Bot",
                steps: [
                    <>Open Telegram and search for <strong>@BotFather</strong> (the official bot manager).</>,
                    <>Send the command <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/newbot</code> and follow the prompts to choose a name and username for your bot.</>,
                    <>BotFather will reply with a <strong>Bot API Token</strong> that looks like: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">7123456789:AAHdqTcvCH1vGWJxfSeofSs0K38W-1SJxxx</code>. Copy this token.</>,
                ]
            },
            {
                heading: "B. Find Your Telegram Chat ID",
                steps: [
                    <>Start a conversation with your newly created bot by searching for it in Telegram and clicking <strong>Start</strong>.</>,
                    <>Open this URL in your browser (replace <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">YOUR_TOKEN</code> with your bot token): <br /><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono break-all">https://api.telegram.org/botYOUR_TOKEN/getUpdates</code></>,
                    <>In the JSON response, find the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">message.chat.id</code> field — this is your <strong>Chat ID</strong>. It will be a number like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">123456789</code>.</>,
                ]
            },
            {
                heading: "C. Configure in MonkBot",
                steps: [
                    <>In WordPress, go to <strong>MonkBot → Settings → Telegram</strong>.</>,
                    <>Enter your <strong>Bot API Token</strong> and <strong>Chat ID</strong> in the respective fields.</>,
                    <>Save settings and test the connection. You can ask MonkBot to "send me a Telegram message" to verify it's working.</>,
                ]
            },
        ]
    }
];

const colorMap: Record<string, { badge: string; dot: string; num: string }> = {
    blue: { badge: "bg-blue-50 border-blue-100 text-blue-700", dot: "bg-blue-500", num: "text-blue-600" },
    purple: { badge: "bg-purple-50 border-purple-100 text-purple-700", dot: "bg-purple-500", num: "text-purple-600" },
    green: { badge: "bg-green-50 border-green-100 text-green-700", dot: "bg-green-500", num: "text-green-600" },
};

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gray-50 border-b border-gray-200 py-16 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white shadow-sm mb-6 text-sm font-medium text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Setup Guide
                    </div>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
                        Get Started with MonkBot
                    </h1>
                    <p className="text-lg text-gray-600 font-light">
                        From zero to a fully connected AI assistant for your WordPress site in three steps.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 space-y-16">

                {steps.map((section) => {
                    const c = colorMap[section.color];
                    return (
                        <div key={section.id} id={section.id}>
                            {/* Section header */}
                            <div className="flex items-center gap-4 mb-8">
                                <span className={`text-5xl font-black tracking-tight ${c.num} select-none`}>{section.number}</span>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                                    {section.subtitle && <p className="text-gray-500 text-sm mt-1">{section.subtitle}</p>}
                                </div>
                            </div>

                            {/* Regular step list */}
                            {"items" in section && section.items && (
                                <ol className="space-y-6">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 mb-1">{item.step}</p>
                                                <p className="text-gray-600 leading-relaxed text-[15px]">{item.detail}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            )}

                            {/* Plugin download card embedded into step 02 */}
                            {section.id === "plugin" && (
                                <div className="mt-8">
                                    <PluginDownloadCard isAuthed={false} />
                                </div>
                            )}

                            {/* Telegram subsections */}
                            {"subsections" in section && section.subsections && (
                                <div className="space-y-10">
                                    {section.subsections.map((sub, si) => (
                                        <div key={si}>
                                            <h3 className="font-semibold text-gray-800 mb-4 text-base">{sub.heading}</h3>
                                            <ol className="space-y-4">
                                                {sub.steps.map((s, i) => (
                                                    <li key={i} className="flex gap-4">
                                                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed text-[15px] pt-0.5">{s}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Divider */}
                <hr className="border-gray-100" />

                {/* Help CTA */}
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Still stuck?</h3>
                        <p className="text-gray-500 text-sm">Our team is happy to help with setup, domain validation issues, or custom configurations.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="flex-shrink-0 bg-gray-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-md text-sm whitespace-nowrap"
                    >
                        Contact Support
                    </Link>
                </div>

            </section>
        </div>
    );
}
