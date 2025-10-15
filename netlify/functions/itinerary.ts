import type { Handler } from '@netlify/functions';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const handler: Handler = async (event) => {
  try {
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY not set on server' }) };
    }
    const { location, locations } = JSON.parse(event.body || '{}');

    const buildPrompt = (loc: any) => {
      const ageGroupsText = (loc.ageGroups || []).join(', ');
      const system = "You are a creative and helpful DFW family day-planner.";
      const user = `Create a half-day adventure plan for a family with kids visiting ${loc.name}.
Category: ${loc.category}. Price: ${loc.price}. Ages: ${ageGroupsText}.`;
      return { system, user };
    };

    const gen = async (sys: string, usr: string) => {
      const payload = { contents: [{ role: "user", parts: [{ text: sys + "\n\n" + usr }]}] };
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      const text = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("") || "No content.";
      return text;
    };

    if (location) {
      const { system, user } = buildPrompt(location);
      const text = await gen(system, user);
      return { statusCode: 200, body: JSON.stringify({ text }) };
    }

    if (Array.isArray(locations) && locations.length > 0) {
      const sections = [];
      for (const loc of locations) {
        const { system, user } = buildPrompt(loc);
        const text = await gen(system, user);
        sections.push(`### ${loc.name}\n\n${text}`);
      }
      const merged = sections.join("\n\n---\n\n");
      return { statusCode: 200, body: JSON.stringify({ text: merged }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Missing location(s) payload' }) };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
