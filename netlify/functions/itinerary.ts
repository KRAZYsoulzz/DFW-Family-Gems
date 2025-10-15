import type { Handler } from '@netlify/functions';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const handler: Handler = async (event) => {
  try {
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY not set on server' }) };
    }
    
    const body = JSON.parse(event.body || '{}');
    const { location, locations, multiStopOptions } = body;

    const gen = async (sys: string, usr: string) => {
      const payload = { contents: [{ role: "user", parts: [{ text: sys + "\n\n" + usr }]}] };
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
      const resp = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      const text = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("") || "No content.";
      return text;
    };

    // Single location itinerary
    if (location) {
      const ageGroupsText = (location.ageGroups || []).join(', ');
      const system = "You are a creative and helpful DFW family day-planner.";
      const user = `Create a half-day adventure plan for a family with kids visiting ${location.name}.
Category: ${location.category}. Price: ${location.price}. Ages: ${ageGroupsText}.

Provide a detailed itinerary with:
- Best time to arrive
- What to do first
- Key attractions or activities
- Tips for families
- Approximate time to spend

Keep it practical and fun!`;
      
      const text = await gen(system, user);
      return { statusCode: 200, body: JSON.stringify({ text }) };
    }

    // Multi-stop itinerary with options
    if (multiStopOptions && Array.isArray(locations) && locations.length > 0) {
      const { numAdults, numKids, timeAvailable, budget, mealPreference } = multiStopOptions;
      
      // Build location summary
      const locationSummary = locations.slice(0, 10).map((loc: any) => {
        return `- ${loc.name} (${loc.category}, ${loc.price}, Best for: ${loc.ageGroups.join(', ')})`;
      }).join('\n');

      const system = "You are an expert DFW family trip planner who creates detailed, personalized itineraries.";
      const user = `Create 2-3 different day itinerary options for a family visiting the Dallas-Fort Worth area.

**Family Details:**
- ${numAdults} adult(s) and ${numKids} kid(s)
- Time available: ${timeAvailable}
- Activity budget: $${budget}
- Meal preference: ${mealPreference}

**Available Locations:**
${locationSummary}

For each itinerary option, use the format:
### Itinerary [Number]: [Catchy Name]

Then provide:
**Morning (9:00 AM - 12:00 PM)**
- Detailed activities and timing

**Afternoon (12:00 PM - 5:00 PM)**
- Detailed activities and timing

**Evening (if applicable)**
- Optional activities

Include specific locations from the list above, realistic travel times, and stay within the budget. Make each itinerary unique with a different theme or focus.`;

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