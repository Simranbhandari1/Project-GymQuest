import { connectDB } from '@/lib/config/db';
import Progress from '@/lib/models/Progress';

export async function POST(req) {
  try {
    await connectDB();

    const { userId } = await req.json();

    const history = await Progress.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return Response.json(history);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
