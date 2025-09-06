import { connectDB } from "@/lib/config/db";
import Exercise from "@/lib/models/Exercise";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    return new Response(JSON.stringify(exercise), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
