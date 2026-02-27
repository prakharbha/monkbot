"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CHAT_SLIDES = [
    {
        id: 1,
        category: "Content Management",
        prompt: "Draft a new blog post titled 'Top 10 AI Tools for 2026', write a 500-word introduction about the rise of agentic web, and publish it immediately.",
        response: "I have drafted the blog post with a 500-word introduction focusing on the agentic web and set its status to published.",
        logs: [
            "Content generated: 512 words.",
            "Sent POST request to /wp-json/wp/v2/posts.",
            "Status: Post published successfully (ID: #4092)."
        ]
    },
    {
        id: 2,
        category: "WooCommerce Analytics",
        prompt: "What were my top 5 selling products over the last week? Give me their names, quantities sold, and total revenue.",
        response: "Here are your top 5 selling products from the last 7 days:",
        logs: [
            "Querying WooCommerce REST API for orders in the last 7 days.",
            "Calculating line items totals.",
            "1. Premium Widget (14 sold, $350) | 2. Pro Theme (8 sold, $400)"
        ]
    },
    {
        id: 3,
        category: "System Updates",
        prompt: "Do I have any plugins that need an update right now? If so, tell me which ones and update them for me.",
        response: "Yes, 2 plugins needed updates. I have successfully updated them for you.",
        logs: [
            "Checking WordPress update transients.",
            "Found updates for 'WooCommerce' and 'Yoast SEO'.",
            "Executing background plugin update routine... Success."
        ]
    },
    {
        id: 4,
        category: "Comment Moderation",
        prompt: "Find all pending comments. Read them and if any look like spam promoting crypto, mark them as spam. Approve the rest.",
        response: "I reviewed 12 pending comments. I marked 3 crypto-related comments as spam and approved the remaining 9.",
        logs: [
            "Fetched 12 pending comments.",
            "Analyzing content for 'crypto', 'bitcoin' keywords...",
            "Updated comment status: 3 spam, 9 approved."
        ]
    },
    {
        id: 5,
        category: "Database Introspection",
        prompt: "List all the database tables in my installation and tell me how many there are in total.",
        response: "Your WordPress installation has a total of 24 database tables.",
        logs: [
            "Executing 'SHOW TABLES' query.",
            "Counting results...",
            "Tables include: wp_posts, wp_options, wp_users, etc."
        ]
    },
    {
        id: 6,
        category: "WooCommerce Operations",
        prompt: "Find order #1052. Tell me what they bought, and then update the order status to 'completed' and add a note saying 'Shipped via FedEx'.",
        response: "Order #1052 contained 1x 'Cool T-Shirt'. I have updated the status to completed and added the FedEx shipping note.",
        logs: [
            "Fetched Order #1052 details.",
            "Updated order status to 'wc-completed'.",
            "Added order note: 'Shipped via FedEx'."
        ]
    },
    {
        id: 7,
        category: "User Management",
        prompt: "List all my subscribers. Create a new user account for 'jane.doe@example.com' with the role of Author and tell me their ID.",
        response: "You currently have 142 subscribers. I have created the new Author account for jane.doe@example.com. The new user ID is #482.",
        logs: [
            "Querying users with role 'subscriber' -> Count: 142.",
            "Executing wp_insert_user for jane.doe@example.com (Role: author).",
            "User created successfully. ID: 482"
        ]
    },
    {
        id: 8,
        category: "Content Editing",
        prompt: "Can you find my draft post about 'Summer Sale' and update the content to say the sale ends on Friday, then change its status to published?",
        response: "I found the draft 'Summer Sale'. I've added the text about the sale ending on Friday and published the post.",
        logs: [
            "Searching posts for 'Summer Sale' (status: draft).",
            "Appending text: 'The sale ends on Friday.'",
            "Updating post status to 'publish'. Success."
        ]
    },
    {
        id: 9,
        category: "WP Hooks Analysis",
        prompt: "Which functions are hooked into wp_enqueue_scripts and at what priority levels?",
        response: "Here are the top functions hooked into wp_enqueue_scripts:",
        logs: [
            "Inspecting global $wp_filter variable.",
            "Priority 10: 'enque_my_theme_styles', 'load_plugin_assets'",
            "Priority 20: 'late_script_overrides'"
        ]
    },
    {
        id: 10,
        category: "WP Shell Execution",
        prompt: "Execute a PHP script to return get_bloginfo('url') so I can confirm the absolute base URL.",
        response: "The absolute base URL of your WordPress installation is: https://agency-demo.com",
        logs: [
            "Initializing safe WP Shell sandbox.",
            "Executing: return get_bloginfo('url');",
            "Result: https://agency-demo.com"
        ]
    }
];

export default function ChatSlider() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const handlePromptSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            router.push("/dashboard");
        }
    };

    // Auto-play interval
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % CHAT_SLIDES.length);
            }, 5000); // Change slide every 5 seconds
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const slide = CHAT_SLIDES[currentIndex];

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false); // Pause auto-play on manual interaction
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % CHAT_SLIDES.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? CHAT_SLIDES.length - 1 : prev - 1));
        setIsAutoPlaying(false);
    };

    return (
        <div
            className="w-full glass-panel p-4 md:p-6 rounded-3xl relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="absolute top-0 left-10 -translate-y-1/2 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-gray-800 shadow-sm flex items-center gap-2 z-20">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM ONLINE
            </div>

            <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-4 md:p-8 pt-[10px] md:pt-[10px] min-h-[560px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 ease-in-out">

                {/* Category Badge */}
                <div className="w-full flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Skill: {slide.category}
                    </span>
                    <div className="flex items-center gap-2">
                        <button onClick={prevSlide} className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <span className="text-xs font-medium text-gray-400">{currentIndex + 1} / {CHAT_SLIDES.length}</span>
                        <button onClick={nextSlide} className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                {/* Dynamic Chat Content - Wrappers applied for slide transitions */}
                <div className="flex-1 relative overflow-hidden flex flex-col justify-end mt-4">
                    {CHAT_SLIDES.map((s, idx) => (
                        <div
                            key={s.id}
                            className={`absolute bottom-0 w-full flex flex-col justify-end transition-all duration-500 ease-in-out ${idx === currentIndex
                                ? "opacity-100 translate-x-0 z-10"
                                : idx < currentIndex
                                    ? "opacity-0 -translate-x-full z-0 pointer-events-none"
                                    : "opacity-0 translate-x-full z-0 pointer-events-none"
                                }`}
                        >
                            <div className="chat-bubble chat-bubble-user">
                                "{s.prompt}"
                            </div>
                            <div className="chat-bubble chat-bubble-agent relative mt-4 block">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src="/brand/monkbot-logo.png" alt="MonkBot" className="h-5 w-auto grayscale" />
                                    <span className="text-xs font-semibold text-gray-500">MonkBot Agent</span>
                                </div>
                                <div className="mb-3 text-gray-800">{s.response}</div>
                                <div className="bg-gray-100 p-3 rounded-lg font-mono text-xs text-green-700 border border-green-200 flex flex-col items-start gap-2 max-w-[100%] overflow-hidden">
                                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <div className="space-y-1">
                                        {s.logs.map((log, i) => (
                                            <div key={i} className="truncate">{log}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive input area */}
                <form
                    onSubmit={handlePromptSubmit}
                    className="mt-4 bg-white border border-gray-200 rounded-xl p-2 flex items-center shadow-sm relative z-20 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsAutoPlaying(false)}
                        placeholder="Reply to Monkbot..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 text-sm pl-3 h-10 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-gray-900 text-white p-2.5 rounded-lg ml-2 hover:bg-gray-800 transition-colors flex shrink-0 items-center justify-center h-10 w-10"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </form>
            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center gap-1.5 mt-4">
                {CHAT_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-gray-800" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
