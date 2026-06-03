import { connectDB } from '@/lib/config/db';
import Progress from '@/lib/models/Progress';

export async function POST(req) {
  try {
    await connectDB();

    const { userId, weight, height } = await req.json();

    const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);

    const progress = await Progress.create({
      userId,
      weight,
      height,
      bmi,
      // goal,
    });

    return Response.json(progress);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
