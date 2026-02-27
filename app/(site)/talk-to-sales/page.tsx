import Link from 'next/link';

export const metadata = {
    title: 'Talk to Sales | Monkbot',
    description: 'Schedule a demo with our team to see how MonkBot can scale your WordPress agency.',
};

export default function TalkToSalesPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16">

                {/* Left Side: Copy */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">Talk to Sales</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-lg font-light leading-relaxed">
                        Ready to completely automate your WordPress operations? Schedule a bespoke 30-minute demonstration with our product experts.
                    </p>

                    <div className="space-y-6 mt-12 border-t border-gray-100 pt-12">
                        <h3 className="font-semibold text-lg text-gray-900">What to expect:</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Customized Demonstration</h4>
                                    <p className="text-sm text-gray-500 mt-1">We'll show you exactly how MonkBot can replace your current maintenance routines.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Security Deep Dive</h4>
                                    <p className="text-sm text-gray-500 mt-1">Learn about our sandbox architecture and SOC2 compliance controls.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Volume Pricing Options</h4>
                                    <p className="text-sm text-gray-500 mt-1">Get a custom quote based on the size of your WordPress fleet.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Form Placeholder */}
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                    <form className="space-y-6 flex flex-col h-full">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow" placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Work Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow" placeholder="jane@company.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Company Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow" placeholder="Acme Corp" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Number of WordPress Sites</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-white text-gray-700">
                                <option value="">Select an option</option>
                                <option value="1-10">1 - 10 sites</option>
                                <option value="11-50">11 - 50 sites</option>
                                <option value="51-200">51 - 200 sites</option>
                                <option value="200+">200+ sites</option>
                            </select>
                        </div>

                        <div className="mt-8 pt-4">
                            <button type="button" className="w-full bg-gray-900 text-white font-medium px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                                Request Demo
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-4">By submitting this form, you agree to our privacy policy and terms of service.</p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
