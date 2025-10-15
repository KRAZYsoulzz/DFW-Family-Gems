import { Location } from '../types';

export async function generateSingleStopItinerary(location: Location): Promise<string> {
  const res = await fetch('/.netlify/functions/itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.text as string;
}

export async function generateMultiStopItinerary(locations: Location[]): Promise<string> {
  const res = await fetch('/.netlify/functions/itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locations }),
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.text as string;
}
