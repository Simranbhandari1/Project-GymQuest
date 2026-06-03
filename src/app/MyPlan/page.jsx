// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@/app/api/auth/AuthContext';

// export default function MyPlans() {
//   const { user } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   useEffect(() => {
//     if (!user?._id) return;

//     fetch('/api/meal-plans/history', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userId: user._id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPlans(data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [user]);

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b mt-15  from-black via-[#0f3e3b] to-black text-white p-8">
//       <div className="w-full ">
//         <h1 className="text-5xl font-bold text-center mb-10">
//           My Nutrition History
//         </h1>

//         {plans.length === 0 ? (
//           <div className="text-center text-gray-400 text-xl">
//             No saved plans found.
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {plans.map((plan) => (
//               <div
//                 key={plan._id}
//                 className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl"
//               >
//                 <h2 className="text-2xl font-bold text-cyan-400">
//                   {plan.goal}
//                 </h2>

//                 <p className="mt-2 text-gray-300">
//                   Diet: {plan.dietPreference}
//                 </p>

//                 <p className="text-gray-400 mt-2">
//                   Created: {new Date(plan.createdAt).toLocaleDateString()}
//                 </p>

//                 <button
//                   onClick={() => setSelectedPlan(plan)}
//                   className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold transition"
//                 >
//                   View Plan
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedPlan && (
//           <div className="mt-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-3xl font-bold text-green-400">
//                 Selected Diet Plan
//               </h2>

//               <button
//                 onClick={() => setSelectedPlan(null)}
//                 className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
//               >
//                 Close
//               </button>
//             </div>

//             <div
//               className="prose prose-invert max-w-none"
//               dangerouslySetInnerHTML={{
//                 __html: selectedPlan.htmlPlan,
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/api/auth/AuthContext';
import ProtectedRoute from '../components/organisms/Access/ProtectedRoute';

export default function MyPlans() {
  const { user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    fetch('/api/meal-plans/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen mt-18 bg-gradient-to-b from-black via-[#0f3e3b] to-black text-white p-8">
        <div className="w-full max-w-[1800px] mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12">
            My Nutrition History
          </h1>

          {plans.length === 0 ? (
            <div className="text-center text-gray-400 text-xl">
              No saved plans found.
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:border-cyan-400/40 transition"
                >
                  <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                    {plan.goal}
                  </h2>

                  <p className="text-lg text-gray-300">
                    Diet: {plan.dietPreference}
                  </p>

                  <p className="text-gray-400 mt-3">
                    Created: {new Date(plan.createdAt).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
                  >
                    View Plan
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedPlan && (
            <div className="mt-14 w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-400">
                  Selected Diet Plan
                </h2>

                <button
                  onClick={() => setSelectedPlan(null)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>

              <iframe
                srcDoc={selectedPlan.htmlPlan}
                title="Diet Plan"
                className="w-full h-[1400px] rounded-2xl bg-white"
              />
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
