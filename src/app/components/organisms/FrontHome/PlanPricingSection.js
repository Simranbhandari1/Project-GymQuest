"use client";

import React from "react";
import LiquidChrome from "../LiquidChrome";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    title: "Basic Plan",
    price: 29,
    features: [
      "Open gym hours (No trainer support)",
      "Perfect for beginners and casual workouts",
      "Locker room & shower access",
      "Full access to gym equipment",
    ],
  },
  {
    title: "Standard Plan",
    price: 59,
    features: [
      "Group fitness classes (Yoga, Zumba, Pilates)",
      "Locker room & shower access",
      "Body composition analysis",
      "Includes everything in Basic",
    ],
  },
  {
    title: "Premium Plan",
    price: 99,
    features: [
      "All Standard Plan features",
      "One-on-one personal training",
      "Personalized diet & workout",
      "Weekly fitness tracking",
    ],
  },
];

export default function PlanPricingSection() {
  const handleCheckout = async (plan) => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const { id, error } = await res.json();
    if (error) {
      alert("Payment error: " + error);
      return;
    }

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <section className="relative w-full py-20 px-6 md:px-12 text-white overflow-hidden font-sans bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#052e2b] to-black opacity-90 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your <span className="text-green-400">Plan</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
          Find the perfect fitness plan that matches your goals and lifestyle!
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch flex-wrap">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative w-full max-w-xs mx-auto rounded-2xl bg-[#0f0c1b]/90 shadow-[0_0_20px_rgba(0,255,180,0.15)] border border-[#24ffcb44] px-6 py-8 transition hover:scale-[1.03]"
            >
              <h3 className="text-2xl font-semibold text-white mb-3">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-green-400 mb-2">
                ${plan.price}
                <span className="text-base text-gray-300 font-medium">
                  /month
                </span>
              </p>
              <ul className="text-left mt-6 text-sm space-y-3 text-gray-200">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <span className="text-green-400 font-bold mr-2">✔</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan)}
                className="mt-8 w-full py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-green-400 text-black hover:from-white hover:to-white hover:text-green-700 shadow-[0_0_10px_#00ffcc99] transition"
              >
                Buy Now ↗
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
