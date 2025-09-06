"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Confetti from "react-confetti";
import LiquidChrome from "@/app/components/organisms/LiquidChrome"; // adjust path if needed

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState([false, false, false]);
  const [confetti, setConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Fetch exercise details
  useEffect(() => {
    if (!id) return;
    fetch(`/api/auth/exercises/${id}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch(() => setExercise(null));
  }, [id]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (running) interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  // Confetti effect
  useEffect(() => {
    if (sessions.every((s) => s)) {
      setConfetti(true);
      const timeout = setTimeout(() => setConfetti(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [sessions]);

  // Window size for confetti
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!exercise) {
    return <div className="text-white text-center mt-20">Loading exercise...</div>;
  }

  const youtubeID = extractYouTubeID(exercise.youtubeUrl);

  return (
    <div className="relative min-h-screen mt-20 flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-b from-[#0f3e3b]/80 via-black/30 to-[#0f3e3b]/80 backdrop-blur-2xl">
      {/* Background Liquid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidChrome />
      </div>

      {confetti && <Confetti width={dimensions.width} height={dimensions.height} />}

      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl max-w-4xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">{exercise.title}</h1>

        {/* YouTube Video */}
        {youtubeID ? (
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&mute=0`}
            title={exercise.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg border border-white/20 mx-auto"
          />
        ) : (
          <p className="italic text-gray-300">No video available</p>
        )}

        {/* Timer */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Workout Timer</h2>
          <p className="text-2xl font-mono text-green-400">
            {Math.floor(time / 60).toString().padStart(2, "0")}:
            {(time % 60).toString().padStart(2, "0")}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setRunning(!running)}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => {
                setTime(0);
                setRunning(false);
              }}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Sessions */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-white">Workout Progress</h2>
          <p className="text-gray-300 mb-4">
            Completed {sessions.filter(Boolean).length} of {sessions.length} sets
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {sessions.map((done, i) => (
              <button
                key={i}
                onClick={() =>
                  setSessions((prev) => prev.map((s, idx) => (idx === i ? !s : s)))
                }
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  done
                    ? "bg-green-600 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {done ? `✔ Set ${i + 1}` : `Set ${i + 1}`}
              </button>
            ))}
          </div>

          {sessions.every((s) => s) && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-green-400">🎉 DONE! 🎉</h3>
              <p className="text-gray-300">Great job completing all sets!</p>
              <button
                onClick={() => setConfetti(true)}
                className="mt-4 px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md"
              >
                Celebrate Again 🎊
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper: extract YouTube ID
function extractYouTubeID(url) {
  if (!url) return null;
  const reg = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  return url.match(reg)?.[1] || null;
}
