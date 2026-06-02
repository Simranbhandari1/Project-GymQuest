import { GoogleGenerativeAI } from '@google/generative-ai';
import MealPlan from '@/lib/models/MealPlan';
import { connectDB } from '@/lib/config/db';

export async function POST(req) {
  try {
    await connectDB();

    const { userData } = await req.json();

    console.log('Received userData:', userData);

    if (!userData) {
      return new Response(JSON.stringify({ error: 'userData missing' }), {
        status: 400,
      });
    }

    const { userId, name, age, height, weight, goal, dietPreference } =
      userData;

    if (!name || !age || !height || !weight || !goal || !dietPreference) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 },
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ⭐ NEW BEAUTIFIED PROMPT (clean UI + no outer border + neon theme)
    const prompt = `
You are a professional certified fitness & diet expert.

Generate a BEAUTIFUL, CLEAN **Weekly Meal + Fitness Plan** with a 
structured **7-day table-grid layout** exactly like the sample image the user provided.

BUT IMPORTANT:
❌ Do NOT create any thick outer border or big box.
❌ Do NOT wrap everything inside a huge container.

✔ The design must be modern, glowing, neon-style — like the "Workout" page screenshot the user shared.
✔ Background must be a dark teal / black-gradient glow theme.
✔ Title must be:  **WEEKLY PLAN: GYMQUEST**
✔ Subtitle: *Your Weekly Meal Planner*

────────────────────────────────────────────
TABLE STRUCTURE (must match exactly)
Columns: Sunday → Monday → Tuesday → Wednesday → Thursday → Friday → Saturday
Rows:
  Breakfast
  Snack 1
  Lunch
  Snack 2
  Dinner
────────────────────────────────────────────

Inside each cell:
- Give one clean meal item
- Optional: a 1–2 word note

────────────────────────────────────────────
STYLE REQUIREMENTS (must follow exactly)
────────────────────────────────────────────

✔ MUST return pure HTML only  
✔ Include: <!DOCTYPE html>, <html>, <head>, <style>, <body>
✔ NO markdown  
✔ NO external CSS  
✔ Use ONLY <style> tag for styling  

🌈 STYLE:
- Dark teal → black radial gradient background  
- Soft neon cyan text glow  
- Rounded table cells  
- Thin neon borders  
- Color-coded left meal labels  
- No big rounded rectangle around everything  
- Clean, breathable spacing  

────────────────────────────────────────────
GENERATE:
Return the full HTML with:
- A glowing neon header
- Subtitle
- The weekly meal table (7 columns × 5 rows)
- Responsive layout
────────────────────────────────────────────
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const result = await model.generateContent(prompt);
    const rawHTML = await result.response.text();

    const cleanHTML = rawHTML.replace(/```html|```/g, '').trim();

    const finalHTML = cleanHTML.startsWith('<!DOCTYPE') ? cleanHTML : cleanHTML;

    // Save to DB
    console.log('Saving userId:', userId);

    await MealPlan.create({
      userId,
      name,
      age,
      height,
      weight,
      goal,
      dietPreference,
      htmlPlan: finalHTML,
    });
    return new Response(finalHTML, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Gemini error:', error);

    return new Response(
      JSON.stringify({
        error: 'Server error generating meal plan',
        details: error.message,
      }),
      { status: 500 },
    );
  }
}
