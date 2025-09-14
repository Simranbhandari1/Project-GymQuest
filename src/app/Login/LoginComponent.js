"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@/app/api/auth/AuthContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LiquidChrome from "../components/organisms/LiquidChrome";
import Script from "next/script";

const ADMIN_EMAIL = "admin_@gmail.com";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.email === ADMIN_EMAIL) {
        router.replace("/Admin");
      } else {
        router.replace("/");
      }
    }
  }, [user, router]);

  // Reset form on logout
  useEffect(() => {
    if (searchParams?.get("logout") === "true") {
      setFormData({ email: "", password: "" });
      toast.success("👋 Logged out successfully");
    }
  }, [searchParams]);

  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("❌ Email and password are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("❌ Invalid email format");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "❌ Invalid credentials");
        return;
      }

      toast.success("✅ Login successful");

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      login(data.user); // redirect handled by useEffect
    } catch {
      toast.error("❌ Server error");
    }
  };

  // ✅ Google Login callback
  const handleGoogleCredentialResponse = useCallback(
    async (googleResponse) => {
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: googleResponse.credential }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "❌ Google login failed");
          return;
        }

        toast.success("✅ Google login successful");

        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }

        login(data.user);
      } catch {
        toast.error("❌ Something went wrong");
      }
    },
    [login]
  );

  // ✅ Initialize Google button after script loads
  const onGoogleScriptLoad = () => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    ) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
      });

      const btn = document.getElementById("google-signin-btn");
      if (btn) {
        window.google.accounts.id.renderButton(btn, {
          theme: "outline",
          size: "large",
          width: "100%",
        });
      }

      // Optional One-Tap
      window.google.accounts.id.prompt();
    }
  };

  if (user) return null;

  return (
    <main className="relative bg-gradient-to-b mt-12 from-black via-[#0f3e3b] to-black flex items-center justify-center min-h-screen">
      {/* ✅ Google script with onLoad */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={onGoogleScriptLoad}
      />

      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive />
      </div>

      <div className="absolute inset-0 bg-gradient-to-l from-black via-[#1e4d4a] to-black opacity-80 z-0" />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="flex w-full rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/10">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center mb-2">Login</h2>
            <p className="text-center text-gray-300 mb-6">
              Welcome back to your fitness journey
            </p>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border text-sm text-white border-white/30 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10"
              type="email"
              required
            />

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border text-sm text-white border-white/30 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10"
              type="password"
              required
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded text-sm font-medium transition duration-200 shadow"
            >
              Login
            </button>

            <div className="text-center text-gray-300 text-sm my-6">or</div>

            {/* ✅ Google Sign In Button */}
            <div id="google-signin-btn" className="w-full flex justify-center mb-4" />

            <p className="text-center text-gray-300 text-sm">
              Don’t have an account?{" "}
              <Link
                href="/Signup"
                className="text-emerald-400 hover:underline font-semibold"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Right: Lottie */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
            <div className="w-[300px] h-[300px]">
              <DotLottieReact
                src="https://lottie.host/9cc135f0-dd0e-4ae0-a41e-0de34ca4c6d4/f9osQ3Wd0B.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
