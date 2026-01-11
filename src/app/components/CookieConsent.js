"use client";

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 shadow-lg z-50 border-t border-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-body-sm">
          We use cookies and analytics to improve your experience. By continuing, you consent to our use of cookies.
        </p>
        <button
          onClick={acceptCookies}
          className="px-6 py-2 bg-black text-white text-body-sm uppercase tracking-wider hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
