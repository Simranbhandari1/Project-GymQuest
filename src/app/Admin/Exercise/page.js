"use client";

import { useState } from "react";

export default function AddExercise() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getYouTubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu")) {
        if (u.hostname === "youtu.be") return u.pathname.slice(1);
        const v = u.searchParams.get("v");
        if (v) return v;
        const pathMatch = u.pathname.match(/\/embed\/([^\/\?&]+)/);
        if (pathMatch) return pathMatch[1];
      }
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = (url || "").match(regExp);
      return match && match[2] && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const youtubeId = getYouTubeId(youtubeUrl);
    if (!youtubeId) {
      setMessage("Please enter a valid YouTube URL");
      setLoading(false);
      return;
    }

    const newExercise = {
      title: title.trim(),
      description: description.trim(),
      thumbnailPublicId: thumbnail.trim(),
      youtubeId,
      youtubeUrl: youtubeUrl.trim(),
      steps: [],
    };

    try {
      const res = await fetch("/api/auth/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ Failed: ${data.message || res.statusText}`);
      } else {
        setMessage("✅ Exercise added successfully!");
        setTitle("");
        setDescription("");
        setThumbnail("");
        setYoutubeUrl("");
      }
    } catch (err) {
      setMessage(`⚠️ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Exercise
        </h1>

        {message && (
          <div
            className={`mb-6 p-3 rounded-md text-sm ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter exercise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe the exercise"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Thumbnail Public ID
            </label>
            <input
              type="text"
              placeholder="Cloudinary public ID"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              YouTube Video URL
            </label>
            <input
              type="url"
              placeholder="Enter YouTube link"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Exercise"}
          </button>
        </form>
      </div>
    </div>
  );
}
