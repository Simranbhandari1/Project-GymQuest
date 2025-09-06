import { connectDB } from "@/lib/config/db";
import Exercise from "@/lib/models/Exercise";

// POST: add exercise (admin)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.youtubeId) {
      return new Response(
        JSON.stringify({ message: "Title and YouTube ID are required" }),
        { status: 400 }
      );
    }

    const newExercise = new Exercise(body);
    await newExercise.save();

    return new Response(
      JSON.stringify({ message: "Exercise added successfully", exercise: newExercise }),
      { status: 201 }
    );
  } catch (err) {
    console.error("[API /exercises POST] Error:", err);
    return new Response(
      JSON.stringify({ message: "Server error: " + err.message }),
      { status: 500 }
    );
  }
}

// GET: fetch exercises (user)
export async function GET() {
  try {
    await connectDB();
    const exercises = await Exercise.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(exercises), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[API /exercises GET] Error:", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
