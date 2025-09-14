// import { connectDB } from "@/lib/config/db";
// import Contact from "@/lib/models/ContactModel";

// export async function GET() {
//   try {
//     await connectDB();

//     // Fetch only feedback entries
//     const feedbacks = await Contact.find({ type: "feedback" }).sort({ createdAt: -1 });

//     return new Response(
//       JSON.stringify({ success: true, feedbacks }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (err) {
//     console.error("Failed to fetch feedbacks:", err);
//     return new Response(
//       JSON.stringify({ success: false, error: "Failed to fetch feedbacks" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
