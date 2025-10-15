import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Location, FilterState } from './types';
import { locations as allLocations } from './constants';
import { prefetchAllLocationPhotos } from './services/googlePlacesService';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import LocationModal from './components/LocationModal';
import MultiStopPlannerModal from './components/MultiStopPlannerModal';
import SavedItinerariesModal from './components/SavedItinerariesModal';
import { PanelsLeftBottomIcon } from './components/Icons';

// Bookmark icon component
const BookmarkIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
);

function App() {
  const [locations] = useState<Location[]>(allLocations);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: new Set(),
    ageGroups: new Set(),
    prices: new Set(),
    openNow: false,
    driveTime: 'any',
    bounds: null,
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isMultiStopModalOpen, setMultiStopModalOpen] = useState(false);
  const [isSavedItinerariesOpen, setSavedItinerariesOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Prefetch Google Places photos on app load
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        await prefetchAllLocationPhotos(locations);
        // Force a re-render after photos are loaded
        window.location.reload();
      } catch (error) {
        console.error('Error prefetching photos:', error);
      }
    };
    
    // Only fetch if we don't have cached photos
    const hasCache = localStorage.getItem('googlePlacesPhotos');
    if (!hasCache) {
      fetchPhotos();
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const isLocationOpen = (location: Location) => {
    if (!location.hours) return false;
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'short' });
    const hoursToday = location.hours.all || location.hours[dayOfWeek];
    if (!hoursToday || hoursToday.toLowerCase() === 'closed' || hoursToday.toLowerCase() === 'varies') return false;
    
    try {
      const [openTime, closeTime] = hoursToday.split('-');
      const [openHour, openMinute] = openTime.split(':').map(Number);
      const [closeHour, closeMinute] = closeTime.split(':').map(Number);
      const openDate = new Date(); openDate.setHours(openHour, openMinute, 0, 0);
      const closeDate = new Date(); closeDate.setHours(closeHour, closeMinute, 0, 0);
      
      if (closeDate < openDate) {
          closeDate.setDate(closeDate.getDate() + 1);
      }
      
      return now >= openDate && now <= closeDate;
    } catch (e) {
      console.error(`Could not parse hours: ${hoursToday} for ${location.name}`);
      return false;
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Miles
    const rlat1 = lat1 * (Math.PI/180), rlat2 = lat2 * (Math.PI/180);
    const difflat = rlat2-rlat1, difflon = (lon2-lon1) * (Math.PI/180);
    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  };
  
  const estimateDriveTime = (distanceInMiles: number) => {
      const avgSpeedMph = 25;
      return Math.round((distanceInMiles / avgSpeedMph) * 60);
  };


  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const searchMatch = location.name.toLowerCase().includes(filters.search.toLowerCase());
      const categoryMatch = filters.categories.size === 0 || filters.categories.has(location.category);
      const ageMatch = filters.ageGroups.size === 0 || location.ageGroups.some(age => filters.ageGroups.has(age));
      const priceMatch = filters.prices.size === 0 || filters.prices.has(location.price);
      const openNowMatch = !filters.openNow || isLocationOpen(location);
      
      let driveTimeMatch = true;
      if (filters.userCoords && filters.driveTime !== 'any') {
          const distance = calculateDistance(filters.userCoords.lat, filters.userCoords.lng, location.lat, location.lng);
          const time = estimateDriveTime(distance);
          driveTimeMatch = time <= parseInt(filters.driveTime, 10);
      }

      let boundsMatch = true;
      if (filters.bounds) {
          boundsMatch = filters.bounds.contains([location.lat, location.lng]);
      }
      
      return searchMatch && categoryMatch && ageMatch && priceMatch && openNowMatch && driveTimeMatch && boundsMatch;
    });
  }, [locations, filters]);

  const handleLocationSelect = useCallback((locationId: number) => {
    const location = locations.find(l => l.id === locationId);
    if (location) {
      setSelectedLocation(location);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  }, [locations]);

  const handleCloseModal = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const handlePlanMyDayClick = () => {
    if (!filters.userCoords) {
      alert("Please set your location first for better itinerary suggestions! Click the crosshair icon to begin.");
    } else {
      setMultiStopModalOpen(true);
    }
  };
  
  return (
    <>
      <Map 
        locations={filteredLocations} 
        onMarkerClick={handleLocationSelect} 
        setMapBounds={(bounds) => setFilters(f => ({...f, bounds}))}
        theme={theme}
      />
      
      <Sidebar
        locations={filteredLocations}
        onLocationSelect={handleLocationSelect}
        filters={filters}
        setFilters={setFilters}
        onPlanMyDayClick={handlePlanMyDayClick}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden absolute top-4 left-4 z-20 p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <PanelsLeftBottomIcon />
        </button>
      )}

      {/* Saved Itineraries Button - Floating */}
      <button
        onClick={() => setSavedItinerariesOpen(true)}
        className="fixed bottom-6 right-6 z-20 p-4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-lg text-white hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110"
        title="View saved itineraries"
      >
        <BookmarkIcon />
      </button>

      {selectedLocation && (
        <LocationModal 
          location={selectedLocation} 
          onClose={handleCloseModal}
          userCoords={filters.userCoords}
        />
      )}

      {isMultiStopModalOpen && (
        <MultiStopPlannerModal 
          locations={locations}
          onClose={() => setMultiStopModalOpen(false)}
        />
      )}

      {isSavedItinerariesOpen && (
        <SavedItinerariesModal 
          onClose={() => setSavedItinerariesOpen(false)}
        />
      )}
    </>
  );
}

export default App;