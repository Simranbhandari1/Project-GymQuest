"use client";

import { useEffect, useState } from "react";
import LiquidChrome from "../LiquidChrome"; // optional background
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Quote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quote");
      const data = await res.json();
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch quote", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main className="relative h-screen md:h-[600px] w-full bg-black flex flex-col items-center justify-center text-white font-sans px-4">
      {/* Optional background */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.05, 0.1, 0.1]} interactive />
      </div>
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Heading outside */}
      <h1 className="relative z-20 text-4xl md:text-5xl font-bold mb-10 text-emerald-400 text-center">
        Fuel Your Grind
      </h1>

      {/* Content */}
      <div className="relative z-20 max-w-2xl text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : quote ? (
          <>
            <p className="text-xl md:text-2xl italic mb-4">&ldquo;{quote.quote}&rdquo;</p>
            <p className="text-lg text-gray-300">— {quote.author}</p>
            <button
              onClick={fetchQuote}
              className="mt-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-medium transition"
            >
              Next Quote
            </button>
          </>
        ) : (
          <p className="text-red-500">Failed to load quote. Try again!</p>
        )}

        {/* Optional Lottie */}
        <div className="hidden md:flex w-full justify-center mt-6">
          <div className="w-32 h-32">
            <DotLottieReact
              src="https://lottie.host/9cc135f0-dd0e-4ae0-a41e-0de34ca4c6d4/f9osQ3Wd0B.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </main>
  );
}
