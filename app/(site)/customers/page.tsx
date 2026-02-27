import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Customer Feedback | Monkbot',
    description: 'See how agencies and businesses are using MonkBot to scale their WordPress operations.',
};

export default function CustomersPage() {
    const testimonials = [
        {
            text: "MonkBot has fundamentally changed how we handle routine maintenance. We used to spend 15 hours a week manually updating plugins across 40 WooCommerce sites and dealing with the occasional breakages. Now, a single Slack prompt handles updates and reports back only if visual regressions are detected.",
            author: "Sarah Jenkins",
            title: "Lead Developer @ GrowthStack",
            bgColor: "bg-white",
            textColor: "text-gray-900",
            borderColor: "border-gray-200",
            span: "md:col-span-2 md:row-span-1"
        },
        {
            text: "The database introspection feature alone is worth the price. I no longer need to grant dev access to phpMyAdmin just so they can check if a custom table got created during activation.",
            author: "Marcus T.",
            title: "CTO, RetailWP",
            bgColor: "bg-gray-900",
            textColor: "text-white",
            borderColor: "border-gray-800",
            span: "md:col-span-1 md:row-span-2"
        },
        {
            text: "We integrated MonkBot into our custom dashboard. Clients can now ask 'how many sales did I make today' and our platform queries the WP REST API via MonkBot securely to give an instant answer.",
            author: "Elena Rodriguez",
            title: "Product Manager",
            bgColor: "bg-blue-50",
            textColor: "text-blue-900",
            borderColor: "border-blue-100",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            text: "It's like having a junior developer working 24/7. Content drafts, meta updates, category assignments—we automate all the tedious WordPress admin work.",
            author: "David Chen",
            title: "Editor in Chief",
            bgColor: "bg-white",
            textColor: "text-gray-900",
            borderColor: "border-gray-200",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            text: "Spam moderation used to be a nightmare on our high-traffic blogs. MonkBot scrubs through pending comments, identifies crypto spam with terrifying accuracy, and approves the genuine ones while I sleep.",
            author: "Amelia B.",
            title: "Community Manager",
            bgColor: "bg-gray-50",
            textColor: "text-gray-900",
            borderColor: "border-gray-200",
            span: "md:col-span-2 md:row-span-1"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-white border-b border-gray-100 py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Built for scale</div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
                        Trusted by the best WordPress teams
                    </h1>
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Don't just take our word for it. See how teams are managing their fleets with agentic workflows.
                    </p>
                </div>
            </section>

            {/* Masonry / Grid Layout for Feedback */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                    {testimonials.map((t, index) => (
                        <div key={index} className={`${t.bgColor} ${t.textColor} ${t.borderColor} border p-8 rounded-3xl ${t.span} shadow-sm flex flex-col justify-between hover:shadow-xl transition-shadow duration-300`}>
                            <div className="mb-8">
                                {/* SVG Quote Icon */}
                                <svg className={`w-8 h-8 mb-6 ${t.textColor === 'text-white' ? 'opacity-20' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.570 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-lg md:text-xl font-medium leading-relaxed">
                                    "{t.text}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.textColor === 'text-white' ? 'bg-white/10' : 'bg-gray-100'}`}>
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{t.author}</h4>
                                    <p className={`text-sm ${t.textColor === 'text-white' ? 'text-gray-400' : 'text-gray-500'}`}>{t.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
