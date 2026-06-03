'use client';

import Link from 'next/link';
import LiquidChrome from '../organisms/LiquidChrome';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white py-16 px-6">
      <LiquidChrome
        baseColor={[0.05, 0.25, 0.25]}
        amplitude={0.8}
        speed={0.6}
      />

      <div className="absolute inset-0 bg-gradient-to-b  mt-2 border border-fuchsia-50 from-black via-[#0c2725]/80 to-black z-0" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <h2 className="text-5xl font-extrabold mb-8">
          Gym
          <span className="text-emerald-300 drop-shadow-[0_0_10px_#34d399]">
            Quest
          </span>
        </h2>

        {/* Navigation */}
        <div>
          <ul className="flex flex-wrap justify-center gap-8 text-sm md:text-base text-emerald-100/80">
            <li>
              <Link href="/" className="hover:text-emerald-300 transition-all">
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/Exercise"
                className="hover:text-emerald-300 transition-all"
              >
                Workout
              </Link>
            </li>

            <li>
              <Link
                href="/Gemini"
                className="hover:text-emerald-300 transition-all"
              >
                Fitness
              </Link>
            </li>

            <li>
              <Link
                href="/Meals"
                className="hover:text-emerald-300 transition-all"
              >
                Nutrition
              </Link>
            </li>

            <li>
              <Link
                href="/Progress"
                className="hover:text-emerald-300 transition-all"
              >
                Progress
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="w-64 h-px bg-emerald-400/30 my-8" />

        {/* Copyright */}
        <p className="text-xs text-emerald-100/60 text-center">
          © {new Date().getFullYear()} GymQuest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// "use client";

// import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
// import LiquidChrome from "../organisms/LiquidChrome"; // Adjust path if needed

// export default function Footer() {
//   return (
//     <footer className="relative overflow-hidden bg-black text-white px-6 md:px-12 lg:px-20 pt-20 pb-10 font-sans">
//       {/* 🌊 Liquid Chrome Background */}
//       <LiquidChrome />

//       {/* 🎨 Dark Emerald Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#1e2f2e]/90 to-black/90 z-0" />

//       {/* 📦 Footer Content */}
//       <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-emerald-500/30 pb-12">
//         {/* 🔰 Logo & About */}
//         <div>
//           <h2 className="text-2xl font-bold">
//             Muscle<span className="text-emerald-300">Factory</span>
//           </h2>
//           <p className="text-sm text-emerald-100/80 mt-4 leading-6">
//             Your ultimate fitness companion. Join the movement and reshape your body and mind.
//           </p>
//           <div className="flex gap-4 mt-6 text-lg text-emerald-200">
//             <FaTwitter className="hover:text-white transition" />
//             <FaFacebookF className="hover:text-white transition" />
//             <FaInstagram className="hover:text-white transition" />
//             <FaGithub className="hover:text-white transition" />
//           </div>
//         </div>

//         {/* 📌 Company Links */}
//         <div>
//           <h3 className="uppercase text-sm text-emerald-200 mb-4">Company</h3>
//           <ul className="space-y-2 text-sm text-emerald-100/80">
//             <li className="hover:text-white cursor-pointer">About</li>
//             <li className="hover:text-white cursor-pointer">Features</li>
//             <li className="hover:text-white cursor-pointer">Works</li>
//             <li className="hover:text-white cursor-pointer">Careers</li>
//           </ul>
//         </div>

//         {/* 🔧 Help Links */}
//         <div>
//           <h3 className="uppercase text-sm text-emerald-200 mb-4">Help</h3>
//           <ul className="space-y-2 text-sm text-emerald-100/80">
//             <li className="hover:text-white cursor-pointer">Customer Support</li>
//             <li className="hover:text-white cursor-pointer">Delivery Info</li>
//             <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
//             <li className="hover:text-white cursor-pointer">Privacy Policy</li>
//           </ul>
//         </div>

//         {/* 📨 Newsletter */}
//         <div>
//           <h3 className="uppercase text-sm text-emerald-200 mb-4">
//             Subscribe to our newsletter
//           </h3>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 rounded-full bg-transparent border border-emerald-400 text-sm text-white placeholder-emerald-100 focus:outline-none"
//           />
//           <button className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 text-sm font-semibold text-black hover:opacity-90 transition">
//             Subscribe
//           </button>
//         </div>
//       </div>

//       {/* 📅 Copyright */}
//       <div className="relative z-10 text-center text-sm text-emerald-100/60 mt-8">
//         © {new Date().getFullYear()} MuscleFactory. All rights reserved.
//       </div>
//     </footer>
//   );
// }
