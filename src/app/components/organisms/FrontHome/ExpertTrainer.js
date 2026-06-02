'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // ✅ Import Next.js Image
import LiquidChrome from '../LiquidChrome';
import toast, { Toaster } from 'react-hot-toast';

const trainers = [
  {
    name: 'Esther Howard',
    role: 'Senior Fitness Trainer',
    image: '/gym-trainer-1.jpg',
    email: 'esther.howard@example.com',
  },
  {
    name: 'Jenny Wilson',
    role: 'Senior Fitness Trainer',
    image: '/gym-trainer-2.jpg',
    email: 'jenny.wilson@example.com',
  },
  {
    name: 'John Doe',
    role: 'Senior Fitness Trainer',
    image: '/gym-trainer-3.jpg',
    email: 'john.doe@example.com',
  },
  {
    name: 'Alex Smith',
    role: 'Senior Fitness Trainer',
    image: '/gym-trainer-4.jpg',
    email: 'alex.smith@example.com',
  },
];

export default function ExpertTrainersSection() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    userEmail: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const toastId = useRef(null);

  useEffect(() => {
    if (selectedTrainer) {
      setFormData({ name: '', userEmail: '', message: '' });
      toastId.current = null;
    }
  }, [selectedTrainer]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('/api/auth/send-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainerEmail: selectedTrainer.email,
          name: formData.name,
          userEmail: formData.userEmail,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (!toastId.current) {
          toastId.current = toast.success('Your query was sent successfully!', {
            duration: 3000,
          });
          setSelectedTrainer(null);
        }
      } else {
        if (!toastId.current) {
          toastId.current = toast.error(
            'Failed to send query: ' + (data.error || 'Unknown error'),
          );
        }
      }
    } catch (error) {
      if (!toastId.current) {
        toastId.current = toast.error(
          'An error occurred while sending your query.',
        );
      }
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-12 text-white bg-black">
      {/* Toast container */}

      {/* 🌊 Liquid Chrome Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidChrome
          baseColor={[0.05, 0.2, 0.2]}
          speed={1}
          amplitude={0.4}
          interactive={true}
        />
      </div>

      {/* 🌓 Overlay for darkening */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#0f3e3b]/80 to-black/90 z-10" />

      {/* 👥 Trainers Content */}
      <div className="relative z-20 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight">
          Expert <span className="text-green-400">Trainers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              onClick={() => setSelectedTrainer(trainer)}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-green-400/30 transition-transform duration-300 hover:scale-[1.04] border border-green-500/30 cursor-pointer"
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl z-0 bg-gradient-to-br from-[#00ffc266] via-[#00ffc233] to-[#00ffc266] blur-md opacity-30 group-hover:opacity-70 transition" />

              <div className="relative z-10 bg-[#111]/90 rounded-2xl overflow-hidden">
                {/* ✅ Use Next.js Image instead of <img> */}
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-5 text-left">
                  <h3 className="text-xl font-semibold">{trainer.name}</h3>
                  <p className="text-sm text-gray-400">{trainer.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup Form */}
      {selectedTrainer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => (isSending ? null : setSelectedTrainer(null))}
        >
          <div
            className="bg-green-900 bg-opacity-40 backdrop-blur-md rounded-xl p-8 max-w-md w-full shadow-xl border border-green-600 transition-transform transform hover:scale-[1.02]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              disabled={isSending}
              className="absolute top-4 right-4 text-green-200 hover:text-white text-3xl font-bold disabled:opacity-50"
              onClick={() => setSelectedTrainer(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h3 className="text-3xl font-semibold mb-6 text-green-200 drop-shadow-md">
              Send a Query to {selectedTrainer.name}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 text-green-100">
              <input
                required
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-green-800 bg-opacity-30 border border-green-500 placeholder-green-300 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                disabled={isSending}
              />

              <input
                required
                type="email"
                name="userEmail"
                placeholder="Your Email"
                value={formData.userEmail}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-green-800 bg-opacity-30 border border-green-500 placeholder-green-300 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                disabled={isSending}
              />

              <textarea
                required
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-green-800 bg-opacity-30 border border-green-500 placeholder-green-300 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none transition"
                disabled={isSending}
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending...' : 'Send Query'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
