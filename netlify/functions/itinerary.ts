import type { Handler } from '@netlify/functions';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const handler: Handler = async (event) => {
  try {
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY not set on server' }) };
    }
    const { location } = JSON.parse(event.body || '{}');
    if (!location) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing location payload' }) };
    }
    const ageGroupsText = (location.ageGroups || []).join(', ');
    const system = "You are a creative and helpful DFW family day-planner.";
    const user = `Create a half-day adventure plan for a family with kids visiting ${location.name}.
Category: ${location.category}. Price: ${location.price}. Ages: ${ageGroupsText}.`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: system + "\n\n" + user }]}]
    };

    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      const errText = await resp.text();
      return { statusCode: resp.status, body: JSON.stringify({ error: errText }) };
    }
    const data = await resp.json();
    const text = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("") || "No content.";
    return { statusCode: 200, body: JSON.stringify({ text }) };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
