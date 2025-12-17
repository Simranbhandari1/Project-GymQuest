"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import LiquidChrome from "../organisms/LiquidChrome";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white px-6 md:px-12 lg:px-24 pt-24 pb-12 font-sans">

    
      <LiquidChrome baseColor={[0.05, 0.25, 0.25]} amplitude={0.8} speed={0.6} />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c2725]/80 to-black z-0 pointer-events-none" />

     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-emerald-400/30 blur-sm" />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">


        <div className="space-y-5">
          <h2 className="text-4xl font-extrabold tracking-wide">
            Gym<span className="text-emerald-300 drop-shadow-[0_0_5px_#34d399]">Quest</span>
          </h2>

          <p className="text-sm text-emerald-100/80 leading-6 max-w-sm">
            Level up your fitness journey with customized workouts, sculpting routines, 
            and advanced nutrition guidance — made for every body.
          </p>

          <div className="flex gap-5 text-xl text-emerald-200 mt-4">
            {/* Social Icons */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_0_8px_#34d399]" />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_0_8px_#34d399]" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_0_8px_#34d399]" />
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_0_8px_#34d399]" />
            </a>
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="uppercase text-xs tracking-wider text-emerald-300 mb-5 font-semibold">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-emerald-100/80">
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/Workout">Workout</Link>
            </li>
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/Fitness">Fitness</Link>
            </li>
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/Nutrition">Nutrition</Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="uppercase text-xs tracking-wider text-emerald-300 mb-5 font-semibold">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-emerald-100/80">
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/about">About Us</Link>
            </li>
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li className="hover:text-emerald-300 transition-all hover:translate-x-1">
              <Link href="/help">Help Center</Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-4">
          <h3 className="uppercase text-xs tracking-wider text-emerald-300 mb-3 font-semibold">
            Stay Updated
          </h3>

          <p className="text-sm text-emerald-100/70">
            Subscribe to get fitness tips, exclusive plans, and updates.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-emerald-500/40 
              text-sm text-white placeholder-emerald-200 focus:outline-none focus:border-emerald-300 
              transition-all"
          />

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 
            text-black font-semibold hover:opacity-90 transition-all duration-300 shadow-[0_0_10px_#34d399]">
            Subscribe
          </button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative z-10 text-center mt-10 text-xs tracking-wide text-emerald-100/60">
        © {new Date().getFullYear()} GymQuest. All rights reserved.
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-emerald-400/30 blur-sm" />
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
