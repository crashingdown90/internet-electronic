"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been given/declined
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for better entry animation
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-auto md:mx-0 animate-fade-in-up">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-[1.5rem] p-6 shadow-2xl space-y-4 relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500 rounded-full blur-[40px] opacity-20 pointer-events-none"></div>

        <div className="flex gap-3 items-start relative z-10">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black tracking-wide uppercase">Cookie Consent</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We use cookies to personalize content, ads, and analyze our traffic in compliance with GDPR & CCPA. Read our{" "}
              <Link href="/privacy-policy" className="text-sky-400 hover:text-sky-300 underline font-bold">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pt-2 relative z-10">
          <button 
            onClick={handleDecline} 
            className="px-4 py-2 hover:bg-white/5 text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept} 
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/25 hover:scale-102 cursor-pointer"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
