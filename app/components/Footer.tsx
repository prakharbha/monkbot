import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 py-12 px-4 md:px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <span className="font-bold text-xl tracking-tight text-gray-900">MONKBOT</span>
                    </Link>
                    <p className="mt-4 text-sm text-gray-600">
                        The ultimate AI Copilot for WordPress. Automate mundane CMS tasks and scale your agency.
                    </p>
                </div>

                <div className="col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link href="/product" className="hover:text-gray-900 transition-colors">Features</Link></li>
                        <li><Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
                        <li><Link href="/customers" className="hover:text-gray-900 transition-colors">Customer Success</Link></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link href="/resources" className="hover:text-gray-900 transition-colors">Documentation</Link></li>
                        <li><Link href="/resources" className="hover:text-gray-900 transition-colors">Blog</Link></li>
                        <li><Link href="/resources" className="hover:text-gray-900 transition-colors">API Reference</Link></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
                        <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Careers</Link></li>
                        <li><Link href="/talk-to-sales" className="hover:text-gray-900 transition-colors">Talk to Sales</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} MonkBot Inc. All rights reserved.
                </p>
                <div className="flex gap-4 text-xs text-gray-500">
                    <Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
