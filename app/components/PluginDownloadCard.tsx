import Link from "next/link";

interface PluginDownloadCardProps {
    isAuthed: boolean;
}

export default function PluginDownloadCard({ isAuthed }: PluginDownloadCardProps) {
    return (
        <div className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 relative overflow-hidden transition-all duration-300">
            {/* Background decorative Elements */}
            <div className="absolute top-0 right-0 right-[-20%] w-[150%] h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none opacity-50"></div>

            <div className="flex flex-col relative z-10 w-full md:w-1/2">
                <h3 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
                    Monkbot<br />
                    WordPress<br />
                    Plugin
                </h3>
                <p className="text-[#4b5563] text-sm lg:text-base leading-relaxed">
                    Download the latest version of the Monkbot WordPress integration plugin. Version 1.2.4.
                </p>
            </div>

            <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                {isAuthed ? (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            alert("Downloading monkbot-v1.2.4.zip...");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] w-full md:w-auto"
                    >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Plugin.zip
                    </a>
                ) : (
                    <div className="flex flex-col items-end w-full md:w-auto">
                        <div className="w-full md:w-auto bg-gray-200/60 rounded-lg py-3 px-5 flex items-center justify-center gap-2.5 text-gray-600 border border-gray-200 shadow-sm">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="font-semibold text-sm">Authentication Required</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-2 text-center md:text-right w-full">
                            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">Log in</Link> to download
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
