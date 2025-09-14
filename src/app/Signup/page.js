"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LiquidChrome from "../components/organisms/LiquidChrome";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Email validator
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully");
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/"); // Redirect immediately
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Google login response
  const handleGoogleCredentialResponse = useCallback(
    async (response) => {
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Logged in with Google");
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/");
        } else {
          toast.error(data.error || "Google login failed");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [router]
  );

  // Load Google script
  useEffect(() => {
    const scriptId = "google-client-script-signup";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = scriptId;

    script.onload = () => {
      if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: "100%" }
        );
      }
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [handleGoogleCredentialResponse]);

  return (
    <main className="relative bg-gradient-to-b from-black via-[#0f3e3b] to-black flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={1}
          amplitude={0.6}
          interactive
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-l from-black via-[#1e4d4a] to-black opacity-80 z-0" />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="flex w-full rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/10">
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Sign Up
            </h2>
            <p className="text-center text-gray-300 mb-6">
              Join the journey to fitness
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

            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border text-sm text-white border-white/30 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10"
              type="password"
              required
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded text-sm font-medium transition duration-200 shadow"
            >
              Create Account
            </button>

            <div className="text-center text-gray-300 text-sm my-6">or</div>
            <div id="google-signin-btn" className="w-full flex justify-center mb-4" />

            <p className="text-center text-gray-300 text-sm">
              Already have an account?{" "}
              <Link
                href="/Login"
                className="text-emerald-400 hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
             <div className="w-[400px] h-[400px]">
                          <DotLottieReact
                            src="https://lottie.host/32ae7a00-ef07-408c-8ccb-4c9c76e4cbc5/gAHOTm4Mk8.lottie"
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
