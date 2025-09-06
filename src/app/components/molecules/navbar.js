"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/api/auth/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (pathname.startsWith("/Admin")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Workouts", href: "/Exercise" },
    { name: "Fitness", href: "/Gemini" },
    { name: "Nutrition", href: "/Meals" },
    { name: "BMI", href: "/BMI" },
    { name: "Contact", href: "/ContactUS" },
  ];

  const finalNavLinks = [
    ...navLinks,
    ...(user &&
    user.email?.toLowerCase().trim() === ADMIN_EMAIL?.toLowerCase().trim()
      ? [{ name: "Admin Panel", href: "/Admin" }]
      : []),
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/Login?logout=true");
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-3 bg-gradient-to-l from-gray-900 via-[#1e2f2e] to-black bg-opacity-95 backdrop-blur-md shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between h-[70px] w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 md:h-20 w-auto">
            <Image
              src="/images/logo.jpg"
              alt="MuscleFactory Logo"
              width={96}
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-semibold text-sm lg:text-base text-white">
          {finalNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="border border-white rounded-full px-4 py-1.5 hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 shadow-sm"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <Link
              href="/Login"
              className="text-white font-semibold border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black hover:scale-105 transition duration-200 shadow-md hover:shadow-lg text-sm lg:text-base"
            >
              Log In
            </Link>
          ) : (
            <>
              <button
                onClick={() => router.push("/Profile")}
                className="text-white text-3xl md:text-4xl hover:text-emerald-400 transition"
                aria-label="Profile"
              >
                <FaUserCircle />
              </button>
              <button
                onClick={handleLogout}
                className="text-white border border-white px-5 py-2 rounded-full hover:bg-red-500 hover:scale-105 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden  fixed inset-0 z-[999] bg-gray-900 text-white flex flex-col p-6 transition-all duration-300 ease-in-out">
          {/* Top Section */}
          <div className="flex  items-center justify-between mb-6">
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logo.jpg"
                  alt="MuscleFactory Logo"
                  width={80}
                  height={80}
                  className="object-contain rounded-full border border-gray-700 shadow-md"
                  priority
                />
              </div>
              <span className="ml-3 text-xl font-bold tracking-wide">MuscleFactory</span>
            </Link>
            <button
              className="text-4xl hover:text-red-400 transition"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-4 text-base font-medium">
            {finalNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl bg-gray-800 hover:bg-emerald-500 hover:text-black transition-all duration-200 shadow-lg"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Profile + Auth */}
          <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-gray-700">
            {user ? (
              <>
                <Link
                  href="/Profile"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl bg-gray-800 hover:bg-white hover:text-black transition-all duration-200 shadow-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/Login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-center transition-all duration-200 font-semibold shadow-lg"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
