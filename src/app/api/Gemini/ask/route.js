import { GoogleGenerativeAI } from "@google/generative-ai";
import MealPlan from "@/lib/models/MealPlan";
import { connectDB } from "@/lib/config/db";

export async function POST(req) {
  try {
    await connectDB();

    const { userData } = await req.json();

    if (!userData) {
      return new Response(
        JSON.stringify({ error: "userData missing" }),
        { status: 400 }
      );
    }

    const { name, age, height, weight, goal, dietPreference } = userData;

    if (!name || !age || !height || !weight || !goal || !dietPreference) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
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
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const rawHTML = await result.response.text();

    const cleanHTML = rawHTML.replace(/```html|```/g, "").trim();

    const finalHTML = cleanHTML.startsWith("<!DOCTYPE")
      ? cleanHTML
      : cleanHTML;

    // Save to DB
    await MealPlan.create({
      name,
      age,
      height,
      weight,
      goal,
      dietPreference,
      htmlPlan: finalHTML,
      createdAt: new Date(),
    });

    return new Response(finalHTML, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });

  } catch (error) {
    console.error("Gemini error:", error);

    return new Response(
      JSON.stringify({
        error: "Server error generating meal plan",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}



// import { GoogleGenerativeAI } from "@google/generative-ai";
// import MealPlan from "@/lib/models/MealPlan";
// import { connectDB } from "@/lib/config/db";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { userData } = await req.json();

//     if (!userData) {
//       return new Response(
//         JSON.stringify({ error: "userData missing" }),
//         { status: 400 }
//       );
//     }

//     const { name, age, gender, height, weight, goal, dietPreference, health } =
//       userData;

//     // Validate required fields
//     if (!name || !age || !height || !weight || !goal) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         { status: 400 }
//       );
//     }

//     const prompt = `
// You are a professional nutrition coach.

// Generate a 7-day weekly plan in PURE HTML using ONLY:
// <div>, <h3>, <ul>, <li>.

// Wrap everything inside:
// <div class="weekly-plan"> ... </div>

// User details:
// Name: ${name}
// Age: ${age}
// Gender: ${gender}
// Height: ${height} cm
// Weight: ${weight} kg
// Goal: ${goal}
// Diet Preference: ${dietPreference}
// Health Conditions: ${health || "None"}

// Do NOT return any text outside HTML.
//     `;

//     // ⭐ NEW SDK MODEL CALL
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash-latest",
//     });

//     const result = await model.generateContent(prompt);

//     const text = await result.response.text();

//     // Save to DB
//     await MealPlan.create({
//       name,
//       age,
//       gender,
//       height,
//       weight,
//       goal,
//       dietPreference,
//       health: health || "None",
//       htmlPlan: text,
//     });

//     return new Response(text, {
//       status: 200,
//       headers: { "Content-Type": "text/html" },
//     });

//   } catch (error) {
//     console.error("Gemini error:", error);

//     return new Response(
//       JSON.stringify({
//         error: "Server error generating meal plan",
//         details: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }




// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const { age, weight, height, goal, diet, health } = await req.json();

//     if (!age || !weight || !height || !goal || !diet) {
//       return new Response(
//         JSON.stringify({ error: "All fields are required." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const prompt = `
// You are a professional fitness and nutrition expert.

// Create a personalized 7-day gym diet plan for the following user:

// - Age: ${age} years
// - Weight: ${weight} kg
// - Height: ${height} cm
// - Goal: ${goal}
// - Diet Preference: ${diet}
// - Health Issues: ${health}

// Provide the plan in a neat HTML format with:
// - A title and intro
// - 7 sections (one for each day)
// - Each day should include: Breakfast, Snack, Lunch, Snack, Dinner
// - Use clean styling (white background, readable fonts)

// Only return the complete HTML content with <!DOCTYPE html>, <html>, <head>, and <body>. No explanation or extra text.
// `;

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or your preferred version
//     const result = await model.generateContent(prompt);
//     const rawHTML = await result.response.text();

//     // Clean code blocks like ```html
//     const cleanHTML = rawHTML.replace(/```html|```/g, "").trim();

//     // Wrap in fallback HTML template in case Gemini doesn’t return <html>
//     const wrappedHTML = cleanHTML.startsWith("<!DOCTYPE")
//       ? cleanHTML
//       : `
//         <!DOCTYPE html>
//         <html lang="en">
//           <head>
//             <meta charset="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             <title>Diet Plan</title>
//             <style>
//               body {
//                 background-color: white;
//                 color: black;
//                 padding: 20px;
//                 font-family: Arial, sans-serif;
//               }
//               h1, h2 {
//                 color: #2e2e2e;
//               }
//               section {
//                 margin-bottom: 20px;
//                 border-bottom: 1px solid #ddd;
//                 padding-bottom: 10px;
//               }
//             </style>
//           </head>
//           <body>
//             <h1>Your 7-Day Diet Plan</h1>
//             ${cleanHTML}
//           </body>
//         </html>
//       `;

//     return new Response(wrappedHTML, {
//       status: 200,
//       headers: { "Content-Type": "text/html" },
//     });

//   } catch (error) {
//     console.error("Gemini error:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to generate diet plan." }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
