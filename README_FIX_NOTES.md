# Netlify & Image Fixes
- Move Gemini API call to Netlify Function at `/.netlify/functions/itinerary` (server-side uses GEMINI_API_KEY).
- Client calls the function; no API key in bundle.
- Added `netlify.toml` and `@netlify/functions` dependency.
- Replaced broken Base64 images with `/images/fallback.png` and added onError fallbacks.
