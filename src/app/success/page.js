// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function SuccessPage() {
//   const searchParams = useSearchParams();
//   const plan = searchParams.get("plan");

//   useEffect(() => {
//     if (!plan) return;

//     // ✅ Call your backend to save the purchased plan for this user
//     const savePlan = async () => {
//       try {
//         const res = await fetch("/api/savePlan", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ plan }),
//         });

//         if (!res.ok) {
//           console.error("Failed to save plan:", await res.text());
//         }
//       } catch (err) {
//         console.error("Network error:", err);
//       }
//     };

//     savePlan();
//   }, [plan]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
//       <h1 className="text-3xl font-bold text-green-400">✅ Payment Successful!</h1>
//       {plan ? (
//         <p className="mt-2">
//           You purchased the <span className="font-bold">{plan}</span>.
//         </p>
//       ) : (
//         <p className="mt-2">No plan information found.</p>
//       )}
//       <p className="mt-4">You now have access to the workout section 🚀</p>
//     </div>
//   );
// }
