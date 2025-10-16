// Google Places API service for fetching real location photos

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';
const CACHE_KEY = 'googlePlacesPhotos';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

interface PhotoCache {
  [locationId: string]: {
    photos: string[];
    timestamp: number;
  };
}

interface PlacePhoto {
  name: string;
  widthPx: number;
  heightPx: number;
}

// Load cache from localStorage
function loadCache(): PhotoCache {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('[Google Places] Error loading photo cache:', e);
  }
  return {};
}

// Save cache to localStorage
function saveCache(cache: PhotoCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    console.log('[Google Places] Cache saved successfully');
  } catch (e) {
    console.error('[Google Places] Error saving photo cache:', e);
  }
}

// Check if cached photos are still valid
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

// Get photo URL from Google Places
function getPhotoUrl(photoName: string, maxWidth: number = 800): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${GOOGLE_PLACES_API_KEY}`;
}

// Fetch photos for a specific location
export async function fetchLocationPhotos(
  locationName: string,
  locationId: number,
  address: string
): Promise<string[]> {
  console.log(`[Google Places] Fetching photos for: ${locationName} (ID: ${locationId})`);
  
  // Check cache first
  const cache = loadCache();
  const cacheKey = `${locationId}`;
  
  if (cache[cacheKey] && isCacheValid(cache[cacheKey].timestamp)) {
    console.log(`[Google Places] ✓ Using cached photos for ${locationName}`);
    return cache[cacheKey].photos;
  }

  if (!GOOGLE_PLACES_API_KEY) {
    console.error('[Google Places] ✗ API key not set! Set VITE_GOOGLE_PLACES_API_KEY in environment variables.');
    return ['/images/fallback.png', '/images/fallback.png', '/images/fallback.png'];
  }

  console.log(`[Google Places] API Key present: ${GOOGLE_PLACES_API_KEY.substring(0, 10)}...`);

  try {
    // Step 1: Search for the place using Text Search
    const searchUrl = `https://places.googleapis.com/v1/places:searchText`;
    console.log(`[Google Places] Searching for: "${locationName} ${address}"`);
    
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.photos'
      },
      body: JSON.stringify({
        textQuery: `${locationName} ${address}`
      })
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error(`[Google Places] ✗ Search failed (${searchResponse.status}):`, errorText);
      throw new Error(`Search failed: ${searchResponse.status} - ${errorText}`);
    }

    const searchData = await searchResponse.json();
    console.log(`[Google Places] Search response:`, searchData);
    
    if (!searchData.places || searchData.places.length === 0) {
      console.warn(`[Google Places] ✗ No place found for ${locationName}`);
      return ['/images/fallback.png', '/images/fallback.png', '/images/fallback.png'];
    }

    // Get the first (best match) place
    const place = searchData.places[0];
    console.log(`[Google Places] Found place: ${place.displayName?.text || 'Unknown'}`);
    
    if (!place.photos || place.photos.length === 0) {
      console.warn(`[Google Places] ✗ No photos found for ${locationName}`);
      return ['/images/fallback.png', '/images/fallback.png', '/images/fallback.png'];
    }

    // Get up to 4 photos
    const photoUrls = place.photos.slice(0, 4).map((photo: PlacePhoto) => {
      return getPhotoUrl(photo.name, 800);
    });

    console.log(`[Google Places] ✓ Found ${photoUrls.length} photos for ${locationName}`);

    // Cache the results
    cache[cacheKey] = {
      photos: photoUrls,
      timestamp: Date.now()
    };
    saveCache(cache);

    return photoUrls;

  } catch (error) {
    console.error(`[Google Places] ✗ Error fetching photos for ${locationName}:`, error);
    return ['/images/fallback.png', '/images/fallback.png', '/images/fallback.png'];
  }
}

// Prefetch photos for all locations (call this on app startup)
export async function prefetchAllLocationPhotos(locations: any[]): Promise<void> {
  console.log('[Google Places] Starting to prefetch photos for all locations...');
  
  // Check if we already have a complete cache
  const cache = loadCache();
  const cachedCount = Object.keys(cache).length;
  console.log(`[Google Places] Current cache has ${cachedCount} locations`);
  
  if (cachedCount >= locations.length) {
    console.log('[Google Places] Cache is complete, skipping prefetch');
    return;
  }
  
  // Fetch photos one at a time to avoid rate limiting
  let successCount = 0;
  let failCount = 0;
  
  for (const location of locations) {
    try {
      const photos = await fetchLocationPhotos(location.name, location.id, location.address);
      if (photos[0] !== '/images/fallback.png') {
        successCount++;
      } else {
        failCount++;
      }
      // Small delay between requests to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`[Google Places] Failed to fetch photos for ${location.name}:`, error);
      failCount++;
    }
  }
  
  console.log(`[Google Places] ✓ Prefetch complete: ${successCount} successful, ${failCount} failed`);
}

// Get photos from cache (synchronous, for immediate display)
export function getCachedPhotos(locationId: number): string[] | null {
  const cache = loadCache();
  const cacheKey = `${locationId}`;
  
  if (cache[cacheKey] && isCacheValid(cache[cacheKey].timestamp)) {
    return cache[cacheKey].photos;
  }
  
  return null;
}