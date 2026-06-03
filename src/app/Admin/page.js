'use client';

import { useEffect, useState } from 'react';
import DonutChart from '../components/organisms/DonutChart'; // adjust path

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/Admin/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => {
        console.error('Failed to load stats', err);
        setError('Unable to fetch dashboard stats.');
      });
  }, []);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!stats) return <div className="p-8">Loading...</div>;

  const donutData = [
    { name: 'Users', value: stats.users },
    { name: 'Diet Plans', value: stats.dietPlans },
    { name: 'BMI Checks', value: stats.bmiChecks },
    { name: 'Contacts', value: stats.contacts },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Welcome back, Admin!
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Users"
          value={stats.users}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Diet Plans"
          value={stats.dietPlans}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Progress"
          value={stats.bmiChecks}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Contacts"
          value={stats.contacts}
          gradient="from-green-500 to-emerald-500"
        />
      </div>

      {/* Donut Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Stats Distribution
        </h2>
        <DonutChart data={donutData} />
      </div>
    </div>
  );
}

function StatCard({ title, value, gradient }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg text-white bg-gradient-to-r ${gradient} transform hover:scale-105 transition-transform duration-200`}
    >
      <h3 className="text-md font-medium">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
