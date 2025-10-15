import { Location } from '../types';

export async function generateSingleStopItinerary(location: Location): Promise<string> {
  const res = await fetch('/.netlify/functions/itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Itinerary API failed: ' + err);
  }
  const json = await res.json();
  return json.text as string;
}
