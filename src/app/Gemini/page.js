'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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

  const isFormComplete = Object.values(formData).every(
    (val) => val.trim() !== '',
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete) {
      toast.error('Please fill out all required fields!');
      return;
    }

    setLoading(true);
    setHtmlResult('');
    setShowForm(false);

    try {
      const response = await fetch('/api/Gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData: formData }),
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
  <title>Plan for ${formData.name}</title>
</head>
<body>
  <h1>Plan for ${formData.name}</h1>
  <h2>Your Weekly Meal Planner</h2>
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
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 mt-12 mb-12">
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

              <button
                type="submit"
                disabled={!isFormComplete || loading}
                className="bg-purple-600 w-full py-2 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 font-semibold mt-4"
              >
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </form>
          )}

          {loading && (
            <div className="animate-pulse mt-10 w-full max-w-5xl p-6 rounded-2xl bg-gray-800/30 space-y-4 shadow-lg">
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
              className="relative mt-10 w-full max-w-7xl rounded-2xl shadow-xl p-10 bg-gray-900/40 backdrop-blur-md text-white"
            >
              <div className="absolute top-2 right-2 w-40 h-40">
                <DotLottieReact
                  src="https://lottie.host/2088a459-1486-4c30-a924-6b331fd9b930/xQJd444q7C.lottie"
                  loop
                  autoplay
                />
              </div>

              <h3 className="text-4xl font-extrabold text-center text-white mb-2">
                Plan for {formData.name}
              </h3>

              <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
                Your Weekly Meal Planner
              </h2>

              <div
                className="prose prose-invert max-w-none rounded-xl overflow-hidden"
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

// 'use client';

// import { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// export default function DietPlanner() {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     goal: '',
//     dietPreference: '',
//     health: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [htmlResult, setHtmlResult] = useState('');

//   const isFormComplete = Object.entries(formData).every(([key, val]) => {
//     if (key === 'health') return true; // Optional
//     return val.trim() !== '';
//   });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormComplete) {
//       toast.error('Please fill out all required fields!');
//       return;
//     }

//     setLoading(true);
//     setHtmlResult('');

//     try {
//       const response = await fetch('/api/Gemini/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userData: formData }),
//       });

//       const html = await response.text();
//       setHtmlResult(html);
//       toast.success('Diet plan generated!');
//     } catch (error) {
//       console.error('Error generating plan:', error);
//       toast.error('Failed to generate diet plan.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     const blob = new Blob([htmlResult], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'weekly_diet_plan.html';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     toast.success('Diet plan saved!');
//   };

//   return (
//     <main className="min-h-screen py-12 px-4 md:px-12 bg-gradient-to-br from-blue-100 to-purple-200 overflow-x-hidden">
//       <Toaster />
//       <div className="flex flex-col md:flex-row justify-center gap-10">
//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-xl p-8 mt-20 rounded-2xl w-full md:w-[40%]"
//         >
//           <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
//             Personalized Diet Plan
//           </h2>

//           {[
//             { label: 'Name', field: 'name' },
//             { label: 'Age', field: 'age', type: 'number' },
//             {
//               label: 'Gender',
//               field: 'gender',
//               type: 'select',
//               options: ['Male', 'Female', 'Other']
//             },
//             { label: 'Height (cm)', field: 'height', type: 'number' },
//             { label: 'Weight (kg)', field: 'weight', type: 'number' },
//             {
//               label: 'Fitness Goal',
//               field: 'goal',
//               type: 'select',
//               options: [
//                 'Weight Loss',
//                 'Muscle Gain',
//                 'Maintenance',
//                 'Improve Endurance',
//                 'Boost Immunity',
//                 'Body Toning'
//               ]
//             },
//             {
//               label: 'Diet Preference',
//               field: 'dietPreference',
//               type: 'select',
//               options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian']
//             },
//             { label: 'Any health problems? (optional)', field: 'health' },
//           ].map(({ label, field, type = 'text', options }) => (
//             <div key={field} className="flex flex-col mb-4">
//               <label htmlFor={field} className="text-sm font-semibold text-gray-700 mb-1">
//                 {label}
//               </label>
//               {type === 'select' ? (
//                 <select
//                   id={field}
//                   value={formData[field]}
//                   onChange={(e) => handleChange(field, e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   disabled={loading}
//                 >
//                   <option value="">Select</option>
//                   {options.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   id={field}
//                   type={type}
//                   value={formData[field]}
//                   onChange={(e) => handleChange(field, e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   disabled={loading}
//                 />
//               )}
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={!isFormComplete || loading}
//             className="bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300 font-semibold mt-4"
//           >
//             {loading ? 'Generating...' : 'Generate Plan'}
//           </button>
//         </form>

//         {/* Diet Plan Display */}
//        {/* Diet Plan Display */}
// {htmlResult && (
//   <div className="bg-white shadow-2xl mt-20 rounded-3xl p-6 w-full md:w-[60%]">
//     <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
//       Your Weekly Diet Plan
//     </h2>
//     <div className="rounded-xl overflow-hidden border-4 border-purple-300 shadow-lg">
//       <iframe
//         title="Weekly Diet Plan"
//         srcDoc={htmlResult}
//         sandbox="allow-scripts allow-same-origin"
//         className="w-full h-[75vh] bg-white rounded-xl border-none"
//         style={{
//           // scrollbarWidth: 'thin',
//           // scrollbarColor: '#a78bfa #f3f4f6',
//         }}
//       />
//     </div>

//     {/* Save Button Centered */}
//     <div className="flex justify-center mt-6">
//       <button
//         onClick={handleSave}
//         className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 shadow-md transition duration-300"
//       >
//         Save Diet Plan
//       </button>
//     </div>
//   </div>
// )}

//       </div>
//     </main>
//   );
// }
