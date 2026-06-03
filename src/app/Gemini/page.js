'use client';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/api/auth/AuthContext';
import toast from 'react-hot-toast';

import LiquidChrome from '../components/organisms/LiquidChrome';
import ProtectedRoute from '../components/organisms/Access/ProtectedRoute';

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    dietPreference: '',
  });

  const [loading, setLoading] = useState(false);
  const [htmlResult, setHtmlResult] = useState('');
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {}, [user]);
  const isFormComplete = Object.values(formData).every(
    (val) => val.trim() !== '',
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (!isFormComplete) {
    //   toast.error('Please fill out all required fields!');
    //   return;
    // }
    e.preventDefault();

    // Name validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      toast.error('Name should contain only letters');
      return;
    }

    if (formData.name.trim().length < 3) {
      toast.error('Name must be at least 3 characters');
      return;
    }

    // Age validation
    const age = Number(formData.age);

    if (age < 10 || age > 100) {
      toast.error('Age must be between 10 and 100');
      return;
    }

    // Height validation
    const height = Number(formData.height);

    if (height < 100 || height > 250) {
      toast.error('Height must be between 100cm and 250cm');
      return;
    }

    // Weight validation
    const weight = Number(formData.weight);

    if (weight < 20 || weight > 300) {
      toast.error('Weight must be between 20kg and 300kg');
      return;
    }

    // Goal validation
    if (!formData.goal) {
      toast.error('Please select a fitness goal');
      return;
    }

    // Diet validation
    if (!formData.dietPreference) {
      toast.error('Please select a diet preference');
      return;
    }

    setLoading(true);
    setHtmlResult('');
    setShowForm(false);
    console.log('Sending User ID:', user._id);

    try {
      console.log('User:', user);
      console.log('User ID:', user?._id);
      const response = await fetch('/api/Gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: {
            ...formData,
            userId: user._id,
          },
        }),
      });

      const html = await response.text();
      setHtmlResult(html);
      toast.success('Plan generated!');
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error('Failed to generate plan.');
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHTMLDownload = () => {
    if (!htmlResult) {
      toast.error('Nothing to download.');
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
</head>
<body>
 
  ${htmlResult}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fitness_Plan_${formData.name.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Plan saved!');
  };

  return (
    <ProtectedRoute>
      <main className="relative bg-gradient-to-b mt-20 from-black via-[#0f3e3b] to-black min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LiquidChrome
            baseColor={[0.1, 0.2, 0.2]}
            speed={1}
            amplitude={0.7}
            interactive
          />
        </div>
        <div className="absolute w-full inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <div className="relative z-10 flex flex-col items-center w-full  px-6 mt-12 mb-12">
          {showForm && (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full md:w-[60%]"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-6">
                Personalized Fitness & Nutrition Plan
              </h2>

              {[
                { label: 'Name', field: 'name' },
                { label: 'Age', field: 'age', type: 'number' },
                { label: 'Height (cm)', field: 'height', type: 'number' },
                { label: 'Weight (kg)', field: 'weight', type: 'number' },
                {
                  label: 'Fitness Goal',
                  field: 'goal',
                  type: 'select',
                  options: [
                    'Weight Loss',
                    'Muscle Gain',
                    'Maintenance',
                    'Improve Endurance',
                    'Boost Immunity',
                    'Body Toning',
                  ],
                },
                {
                  label: 'Diet Preference',
                  field: 'dietPreference',
                  type: 'select',
                  options: [
                    'Vegetarian',
                    'Non-Vegetarian',
                    'Vegan',
                    'Eggetarian',
                  ],
                },
              ].map(({ label, field, type = 'text', options }) => (
                <div key={field} className="flex flex-col mb-4">
                  <label
                    htmlFor={field}
                    className="text-sm font-semibold mb-1 text-white"
                  >
                    {label}
                  </label>
                  {type === 'select' ? (
                    <select
                      id={field}
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      autoComplete="off"
                      disabled={loading}
                      className="input-style"
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {options.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-black"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field}
                      type={type}
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      placeholder={label}
                      autoComplete="off"
                      disabled={loading}
                      className="input-style"
                    />
                  )}
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => router.push('/MyPlan')}
                  className="flex-1 bg-emerald-900 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  View Previous Plans
                </button>

                <button
                  type="submit"
                  disabled={!isFormComplete || loading}
                  className="flex-1 bg-emerald-900 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  {loading ? 'Generating...' : 'Generate Plan'}
                </button>
              </div>
            </form>
          )}

          {loading && (
            <div className="animate-pulse mt-2 w-full max-w-5xl p-6 rounded-2xl bg-gray-800/30 space-y-4 shadow-lg">
              <div className="h-6 bg-gray-600 rounded w-1/2 mx-auto" />
              <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto mb-4" />
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-700 rounded" />
              ))}
            </div>
          )}

          {htmlResult && (
            <div
              id="diet-pdf-section"
              className=" mt-2 h-full   backdrop-blur-md text-black"
            >
              {/* <h3 className="text-4xl font-extrabold text-center text-white mb-2">
                Plan for {formData.name}
              </h3>

              <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
                Your Weekly Meal Planner
              </h2> */}

              <div
                className=" w-full rounded-xl overflow-hidden"
                dangerouslySetInnerHTML={{ __html: htmlResult }}
              />

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSaveHTMLDownload}
                  className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 shadow-md transition duration-300"
                >
                  Save Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .input-style {
          width: 100%;

          padding: 0.5rem 1rem;
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 0.5rem;
          font-size: 1rem;
          outline: none;
        }

        .input-style::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </ProtectedRoute>
  );
}
