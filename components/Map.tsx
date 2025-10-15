
import React, { useEffect, useRef, useState } from 'react';
import { Location } from '../types';

declare const L: any; // Use Leaflet from CDN

interface MapProps {
  locations: Location[];
  onMarkerClick: (id: number) => void;
  setMapBounds: (bounds: any) => void;
  theme: 'light' | 'dark';
}

const categoryMapColors: { [key: string]: string } = {
  "Park": "#34D399", "Museum": "#818CF8", "Outdoors": "#FBBF24",
  "Playground": "#F87171", "Indoor": "#60A5FA", "Attraction": "#A78BFA",
  "Waterpark": "#38BDF8"
};
const getCategoryColor = (category: string) => categoryMapColors[category] || "#6B7280";

const lightTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

const Map: React.FC<MapProps> = ({ locations, onMarkerClick, setMapBounds, theme }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [showSearchAreaBtn, setShowSearchAreaBtn] = useState(false);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([32.8209, -96.8715], 9);
      
      tileLayerRef.current = L.tileLayer(lightTileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
      }).addTo(map);
      
      mapRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);

      map.on('moveend', () => {
        setShowSearchAreaBtn(true);
      });
    }
  }, []);

  useEffect(() => {
    if (tileLayerRef.current) {
        tileLayerRef.current.setUrl(theme === 'dark' ? darkTileUrl : lightTileUrl);
    }
  }, [theme]);

  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.clearLayers();
      locations.forEach(location => {
        const icon = L.divIcon({
          html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${getCategoryColor(location.category)}" class="w-8 h-8 drop-shadow-lg"><path d="M12 2c-4.418 0-8 3.582-8 8 0 4.418 8 12 8 12s8-7.582 8-12c0-4.418-3.582-8-8-8zm0 11.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" fill-rule="evenodd" clip-rule="evenodd"/></svg>`,
          className: 'border-none bg-transparent',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
        const marker = L.marker([location.lat, location.lng], { icon })
          .addTo(markersRef.current)
          .on('click', () => {
              mapRef.current.setView([location.lat, location.lng], 15);
              onMarkerClick(location.id)
            });
        marker.bindPopup(`<b class="font-semibold">${location.name}</b><br>${location.address}`);
      });
    }
  }, [locations, onMarkerClick]);

  const handleSearchArea = () => {
    if (mapRef.current) {
        setMapBounds(mapRef.current.getBounds());
        setShowSearchAreaBtn(false);
    }
  }

  return (
    <div className="h-full w-full relative">
      <div id="map" ref={mapContainerRef} className="h-full w-full z-0"></div>
      {showSearchAreaBtn && (
        <button 
          onClick={handleSearchArea}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white rounded-full shadow-lg text-gray-700 font-semibold hover:bg-gray-50 transition-transform hover:scale-105 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
            Search this area
        </button>
      )}
    </div>
  );
};

export default Map;
