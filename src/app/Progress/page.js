'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/api/auth/AuthContext';
import toast from 'react-hot-toast';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
export default function ProgressTracker() {
  const { user } = useAuth();

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [history, setHistory] = useState([]);
  // const [goal, setGoal] = useState('');
  const fetchHistory = async () => {
    if (!user?._id) return;

    const res = await fetch('/api/Progress/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });

    const data = await res.json();

    console.log('History:', data);

    setHistory(data);
  };
  useEffect(() => {
    fetchHistory();
  }, [user]);

  const handleSave = async () => {
    try {
      if (!user?._id) {
        toast.error('Please login first');
        return;
      }

      if (!weight.trim()) {
        toast.error('Weight is required');
        return;
      }

      if (!height.trim()) {
        toast.error('Height is required');
        return;
      }

      // if (!goal.trim()) {
      //   toast.error('Please select a fitness goal');
      //   return;
      // }

      const weightNum = Number(weight);
      const heightNum = Number(height);

      if (isNaN(weightNum)) {
        toast.error('Weight must be a number');
        return;
      }

      if (isNaN(heightNum)) {
        toast.error('Height must be a number');
        return;
      }

      if (weightNum < 20 || weightNum > 300) {
        toast.error('Weight must be between 20kg and 300kg');
        return;
      }

      if (heightNum < 50 || heightNum > 250) {
        toast.error('Height must be between 50cm and 250cm');
        return;
      }

      const res = await fetch('/api/Progress/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          weight: weightNum,
          height: heightNum,
          // goal,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save');
      }

      toast.success('Progress Saved Successfully!');

      fetchHistory();

      setWeight('');
      setHeight('');
      // setGoal('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save progress');
    }
  };
  return (
    <div className="min-h-screen  bg-gradient-to-b mt-20 pt-8 from-black via-[#0f3e3b] to-black flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-white mb-2">
          Progress Tracker
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Track your fitness journey and monitor improvements over time.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Current Weight (kg)
            </label>

            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Height (cm)
            </label>

            <input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Fitness Goal
            </label>

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="" className="text-black">
                Select Goal
              </option>

              <option value="Weight Loss" className="text-black">
                Weight Loss
              </option>

              <option value="Muscle Gain" className="text-black">
                Muscle Gain
              </option>

              <option value="Maintenance" className="text-black">
                Maintenance
              </option>

              <option value="Body Toning" className="text-black">
                Body Toning
              </option>
            </select>
          </div> */}

          <button
            onClick={handleSave}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Save Progress
          </button>
        </div>

        {history.length > 0 && (
          <div className="mt-8 bg-black/20 rounded-2xl p-5 border border-white/10">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              Weight Progress
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="createdAt"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />

                <YAxis />

                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />

                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {history.length > 0 && (
          <div className="mt-8 bg-black/20 rounded-2xl p-5 border border-white/10">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              Weight History
            </h3>

            <div className="space-y-3">
              {[...history].reverse().map((item) => (
                <div
                  key={item._id}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <p className="text-white font-semibold">
                    Weight: {item.weight} kg
                  </p>

                  {/* <p className="text-gray-300">Goal: {item.goal}</p> */}

                  <p className="text-gray-400 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
