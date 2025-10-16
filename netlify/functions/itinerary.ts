import type { Handler } from '@netlify/functions';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const handler: Handler = async (event) => {
  try {
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY not set on server' }) };
    }
    
    const body = JSON.parse(event.body || '{}');
    const { location, locations, multiStopOptions } = body;

    const gen = async (sys: string, usr: string): Promise<string> => {
      const payload = { contents: [{ role: "user", parts: [{ text: sys + "\n\n" + usr }]}] };
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
      const resp = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!resp.ok) {
        throw new Error(await resp.text());
      }
      const data = await resp.json();
      const text = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("") || "No content.";
      return text;
    };

    // Single location itinerary
    if (location) {
      const ageGroupsText = (location.ageGroups || []).join(', ');
      const system = "You are a creative and helpful DFW family day-planner with extensive knowledge of the Dallas-Fort Worth metroplex area in Texas.";
      const user = `Create a half-day adventure plan for a family with kids visiting this SPECIFIC location in the Dallas-Fort Worth area:

**LOCATION DETAILS (VERIFY THIS IS THE CORRECT PLACE):**
- Name: ${location.name}
- Full Address: ${location.address}
- Category: ${location.category}
- Price Range: ${location.price}
- Best for Ages: ${ageGroupsText}

IMPORTANT: This location is in the Dallas-Fort Worth metroplex in TEXAS. Make sure ALL information you provide is specifically about THIS location at THIS address, not a similarly named location in another city or state.

Provide a detailed itinerary with:
- Best time to arrive
- What to do first
- Key attractions or activities AT THIS SPECIFIC LOCATION
- Tips for families visiting THIS LOCATION
- Approximate time to spend

Keep it practical, fun, and make sure all details are accurate for this specific DFW location!`;
      
      const text = await gen(system, user);
      return { statusCode: 200, body: JSON.stringify({ text }) };
    }

    // Multi-stop itinerary with options
    if (multiStopOptions && Array.isArray(locations) && locations.length > 0) {
      const { numAdults, numKids, timeAvailable, budget, mealPreference, date, preferences } = multiStopOptions;
      
      // Build location summary
      const locationSummary = locations.slice(0, 10).map((loc: any) => {
        return `- ${loc.name} (${loc.category}, ${loc.price}, Best for: ${loc.ageGroups.join(', ')})`;
      }).join('\n');

      // Format date for better prompt
      const visitDate = new Date(date);
      const dateString = visitDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      const system = "You are an expert DFW family trip planner who creates detailed, personalized itineraries. You have access to real-time weather information and seasonal considerations.";
      const user = `Create 2-3 different day itinerary options for a family visiting the Dallas-Fort Worth area.

**Visit Date:**
${dateString}

**IMPORTANT: Check the weather forecast for this specific date in Dallas-Fort Worth, Texas and plan accordingly:**
- If rain or storms are expected, prioritize indoor activities and covered attractions
- If temperatures are above 90°F, include water activities and indoor AC breaks
- If temperatures are below 50°F, focus on indoor venues and shorter outdoor stops
- Consider seasonal factors (summer heat, winter cold, spring weather)

**Family Details:**
- ${numAdults} adult(s) and ${numKids} kid(s)
- Time available: ${timeAvailable}
- Activity budget: $${budget}
- Meal preference: ${mealPreference}${preferences ? `\n- Special preferences: ${preferences}` : ''}

**Available Locations:**
${locationSummary}

For each itinerary option, use the format:
### Itinerary [Number]: [Catchy Name]

Then provide:
**Morning (9:00 AM - 12:00 PM)**
- Detailed activities and timing
- Weather considerations for this time of day

**Afternoon (12:00 PM - 5:00 PM)**
- Detailed activities and timing
- Weather considerations for this time of day

**Evening (if applicable)**
- Optional activities

Include specific locations from the list above, realistic travel times, and stay within the budget. Make each itinerary unique with a different theme or focus. Consider the weather forecast when ordering activities (e.g., outdoor activities during coolest part of day in summer, indoor activities during rain).`;

      const text = await gen(system, user);
      return { statusCode: 200, body: JSON.stringify({ text }) };
    }

    // Legacy: Simple multi-location (backward compatibility)
    if (Array.isArray(locations) && locations.length > 0) {
      const sections = [];
      for (const loc of locations.slice(0, 5)) {
        const ageGroupsText = (loc.ageGroups || []).join(', ');
        const system = "You are a creative and helpful DFW family day-planner.";
        const user = `Create a brief adventure plan for ${loc.name}. Category: ${loc.category}. Price: ${loc.price}. Ages: ${ageGroupsText}.`;
        const text = await gen(system, user);
        sections.push(`### ${loc.name}\n\n${text}`);
      }
      const merged = sections.join("\n\n---\n\n");
      return { statusCode: 200, body: JSON.stringify({ text: merged }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Missing location(s) payload' }) };
  } catch (e: any) {
    console.error('Itinerary generation error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message || String(e) }) };
  }
};