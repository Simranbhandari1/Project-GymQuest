import { connectDB } from '@/lib/config/db';
import MealPlan from '@/lib/models/MealPlan';

export async function POST(req) {
  try {
    await connectDB();

    const { userId } = await req.json();

    const plans = await MealPlan.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return Response.json(plans);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: 'Failed to fetch plans',
      },
      {
        status: 500,
      },
    );
  }
}
