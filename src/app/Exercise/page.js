"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LiquidChrome from "@/app/components/organisms/LiquidChrome";
import ProtectedRoute from '../components/organisms/Access/ProtectedRoute';
import { getCloudinaryUrl } from "@/lib/cloudinary"; 

export default function ExerciseList() {
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    fetch("/api/auth/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch(() => setExercises([]));
  }, []);

  // Loading skeleton
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-4 w-[340px] h-[360px]">
      <div className="bg-gray-700 bg-opacity-40 rounded h-2/3 mb-4"></div>
      <div className="h-6 bg-gray-700 bg-opacity-40 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-700 bg-opacity-40 rounded w-5/6"></div>
    </div>
  );

  return (
     <ProtectedRoute>
    <div className="relative min-h-screen overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-[#0f3e3b] to-black pointer-events-none">
        <LiquidChrome />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl mt-20 mx-auto p-6">
        {/* Title */}
        <h1 className="text-6xl mt-10 font-bold text-white text-center mb-12">
          Workout
        </h1>

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {/* Loading skeletons */}
          {exercises === null &&
            Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)}

          {/* No data */}
          {exercises?.length === 0 && (
            <p className="text-white text-center col-span-full">
              No exercises found.
            </p>
          )}

          {/* Exercise cards */}
          {exercises?.length > 0 &&
            exercises.map((ex) => {
              const imageUrl = getCloudinaryUrl(ex.thumbnailPublicId || "");
              return (
                <Link
                  key={ex._id}
                  href={`/Exercise/${ex._id}`} // <-- Uppercase "E" matches folder
                  className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 p-4 cursor-pointer w-[340px] h-[360px] block"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={ex.title || "Exercise image"}
                      width={340}
                      height={220}
                      priority
                      unoptimized
                      className="w-full h-2/3 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-2/3 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <h2 className="text-xl font-bold mt-4">{ex.title}</h2>
                  <p className="text-gray-200">
                    {ex.description
                      ? ex.description.slice(0, 60) + "..."
                      : "No description"}
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
     </ProtectedRoute>
  );
}
