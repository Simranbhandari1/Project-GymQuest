"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LiquidChrome from "../LiquidChrome";

export default function HeroSection() {
  const router = useRouter();
  const sectionRef = useRef(null); // scope for GSAP context

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline with infinite repeat and 4s delay
      const bottleTimeline = gsap.timeline({ repeat: -1, repeatDelay: 4 });

      bottleTimeline
        .from("#box1", {
          y: -500,
          opacity: 0,
          duration: 1.8,
          ease: "bounce.out",
        })
        .from(
          "#box2",
          {
            y: -500,
            opacity: 0,
            duration: 1.8,
            ease: "bounce.out",
          },
          "-=1.6"
        )
        .from(
          "#box3",
          {
            y: -500,
            opacity: 0,
            duration: 2.0,
            ease: "bounce.out",
          },
          "-=1.4"
        );
    }, sectionRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <main
      ref={sectionRef}
      className="relative bg-gradient-to-b from-black via-[#0f3e3b] to-black flex items-center justify-center pt-6 pb-10"
    >
      {/* Liquid Chrome Background */}
      <div
        style={{ width: "100%", height: "870px", position: "absolute", zIndex: 0 }}
      >
        <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-[#1e4d4a] to-black opacity-80 z-0" />

      {/* LEFT CONTENT */}
     <div className="w-[90%] md:w-[55%] mx-auto  md:ml-10 z-10">
  <div
    id="leftContent"
    className="text-left px-6 py-6 md:px-10 md:py-10 border border-white/20 bg-white/5 backdrop-blur-md rounded-3xl animate-glow flex flex-col justify-between"
  >
    <div>
      <h2 className="text-white text-base md:text-lg font-semibold tracking-wider uppercase mb-2">
        Together with
        <span className="text-[#2e8b57] font-bold ml-2">MuscleFactory</span>
      </h2>
      <h1 className="text-white text-3xl md:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        FITNESS TO <br /> LOOK COOL
      </h1>
      <p className="text-white text-sm md:text-base md:text-lg max-w-full md:max-w-md">
        Your physical person will really form and look cool. Interested? Join now!
      </p>
    </div>

    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <button
        onClick={() => router.push("/Gemini")}
        className="bg-[#2e8b57] hover:bg-[#267356] text-white px-6 py-2 md:px-8 md:py-3 rounded-xl font-bold tracking-wide w-full md:w-auto text-sm md:text-lg"
      >
        Join Us
      </button>
    </div>
  </div>
</div>


      {/* Protein Bottles Section */}
    <div className="relative w-full max-w-7xl mt-20 z-10 hidden md:flex items-center justify-center md:h-[700px]">
  <div
    id="box1"
    className="absolute top-0 left-[20%] transform -translate-x-1/2 w-[280px] h-[380px] rounded-xl flex items-center justify-center"
  >
    <Image
      src="/gym.png"
      alt="Protein 1"
      width={252}
      height={342}
      className="object-contain rounded-lg"
    />
  </div>
  <div
    id="box2"
    className="absolute top-0 left-[80%] transform -translate-x-1/2 w-[280px] h-[380px] rounded-xl flex items-center justify-center"
  >
    <Image
      src="/gym.png"
      alt="Protein 2"
      width={252}
      height={342}
      className="object-contain rounded-lg"
    />
  </div>
  <div
    id="box3"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[500px] rounded-xl flex items-center justify-center"
  >
    <Image
      src="/gym.png"
      alt="Protein 3"
      width={342}
      height={450}
      className="object-contain rounded-xl"
    />
  </div>
</div>

    </main>
  );
}
