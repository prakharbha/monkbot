"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);

  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [selectedDemoTime, setSelectedDemoTime] = useState('');
  const [localTimezone, setLocalTimezone] = useState('');

  // Dynamic dates
  const [dates, setDates] = useState({ day1: 'Tomorrow', day2: 'Day After' });

  useEffect(() => {
    try {
      const parts = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date());
      const tz = parts.find(p => p.type === 'timeZoneName')?.value;
      if (tz) setLocalTimezone(`${tz} Timezone`);

      // Calculate next two days
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextDay = new Date(today);
      nextDay.setDate(nextDay.getDate() + 2);

      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

      // If today is Thursday, day2 is Saturday. Let's just give exact names.
      setDates({
        day1: 'Tomorrow',
        day2: nextDay.toLocaleDateString('en-US', options)
      });

    } catch (e) {
      // Fallback silently
    }
  }, []);

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsMessageLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessageSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsMessageLoading(false);
      setTimeout(() => setMessageSuccess(false), 5000);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDemoTime) return;
    setIsDemoLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      demoTime: selectedDemoTime,
    };

    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setDemoSuccess(true);
        setSelectedDemoTime('');
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Booking failed', error);
    } finally {
      setIsDemoLoading(false);
      setTimeout(() => setDemoSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-20 w-full">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4 text-center">Contact Us</h1>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto font-light">
          Whether you have a technical question or want to explore career opportunities, we're here to help.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-2">Send a Message</h2>
            <p className="text-sm text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleMessageSubmit} className="space-y-5 flex-1">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                  <input required name="firstName" id="firstName" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white" placeholder="Jane" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                  <input required name="lastName" id="lastName" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Work Email</label>
                <input required name="email" id="email" type="email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white" placeholder="jane@company.com" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea required name="message" id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button disabled={isMessageLoading} type="submit" className="w-full bg-gray-900 flex justify-center text-white font-medium px-6 py-3.5 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-lg mt-4">
                {isMessageLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : "Send Message"}
              </button>
              {messageSuccess && <p className="text-green-600 text-sm mt-2 font-medium">Message sent successfully!</p>}
            </form>
          </div>

          {/* Booking & Careers Column */}
          <div className="space-y-8 flex flex-col h-full">
            {/* Demo Booking Snippet */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex-1">
              <h2 className="text-2xl font-semibold mb-2">Book a Demo</h2>
              <p className="text-sm text-gray-500 mb-6">Select a 15-minute slot below to speak with an expert.</p>

              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-sm flex justify-between items-center">
                    <span>{dates.day1}</span>
                    {localTimezone && <span className="text-xs text-gray-500 font-normal animate-fade-in">{localTimezone}</span>}
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM"].map((time, i) => (
                      <button
                        type="button"
                        key={`day1-${i}`}
                        onClick={() => setSelectedDemoTime(`${dates.day1}, ${time}`)}
                        className={`py-2 px-1 text-sm border rounded-lg transition-colors font-medium text-center ${selectedDemoTime === `${dates.day1}, ${time}` ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">{dates.day2}</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {["9:00 AM", "11:00 AM", "2:00 PM", "4:30 PM"].map((time, i) => (
                      <button
                        type="button"
                        key={`day2-${i}`}
                        onClick={() => setSelectedDemoTime(`${dates.day2}, ${time}`)}
                        className={`py-2 px-1 text-sm border rounded-lg transition-colors font-medium text-center ${selectedDemoTime === `${dates.day2}, ${time}` ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDemoTime && (
                  <div className="space-y-4 pt-4 border-t border-gray-100 animate-slide-up">
                    <div className="space-y-1.5">
                      <label htmlFor="demoName" className="text-sm font-medium text-gray-700">Full Name</label>
                      <input required name="name" id="demoName" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="demoEmail" className="text-sm font-medium text-gray-700">Email Address</label>
                      <input required name="email" id="demoEmail" type="email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="demoPhone" className="text-sm font-medium text-gray-700">Phone Number</label>
                      <input required name="phone" id="demoPhone" type="tel" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-shadow bg-gray-50 hover:bg-white" placeholder="+1 (555) 000-0000" />
                    </div>
                    <button disabled={isDemoLoading} type="submit" className="w-full bg-yellow-400 text-gray-900 font-bold tracking-wide uppercase px-6 py-3.5 rounded-xl flex justify-center hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50 mt-4">
                      {isDemoLoading ? <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : "Confirm Booking"}
                    </button>
                    {demoSuccess && <p className="text-green-600 text-sm mt-2 font-medium">Demo booked successfully! Check your email.</p>}
                  </div>
                )}
              </form>
            </div>

            {/* Careers Snippet */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2 text-white">Careers</h2>
                <p className="text-gray-400 mb-6 text-sm">
                  Join us in building the agentic future of WordPress. We are actively looking for Senior Backend Engineers and AI Researchers.
                </p>
              </div>
              <Link href="#" className="relative z-10 inline-flex items-center justify-center bg-white text-gray-900 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                View Open Roles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
