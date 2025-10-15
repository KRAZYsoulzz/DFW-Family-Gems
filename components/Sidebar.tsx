import React from 'react';
import { Location, FilterState } from '../types';
import LocationList from './LocationList';
import FilterPanel from './FilterPanel';
import ThemeToggle from './ThemeToggle';
import { GemIcon, CrosshairIcon, XIcon, SparkleIcon, MapPinFilledIcon } from './Icons';

interface SidebarProps {
  locations: Location[];
  onLocationSelect: (id: number) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onPlanMyDayClick: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ locations, onLocationSelect, filters, setFilters, onPlanMyDayClick, isOpen, setIsOpen, theme, toggleTheme }) => {

  const handleLocateMe = () => {
    if (!navigator.geolocation) { 
        alert("Geolocation is not supported by your browser."); 
        return; 
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
            setFilters(f => ({...f, userCoords}));
        },
        () => {
            alert("Unable to retrieve your location. Please enable location services.");
        }
    );
  };
    
  return (
    <div className={`absolute top-0 left-0 h-full w-full md:w-[420px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl z-10 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-500 rounded-lg">
              <GemIcon />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">DFW Family Gems</h1>
          </div>
          <div className="flex items-center space-x-1">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={handleLocateMe} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hover:text-gray-800 dark:hover:text-gray-200 transition-colors" title="Find my location for drive times">
              {filters.userCoords ? <MapPinFilledIcon className="w-6 h-6 text-teal-500" /> : <CrosshairIcon />}
            </button>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <XIcon />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Curated adventures for DFW families.</p>
      </header>

      <FilterPanel filters={filters} setFilters={setFilters} />

      <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0 sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-20">
        <button onClick={onPlanMyDayClick} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md">
          <SparkleIcon className="w-5 h-5" />
          <span>Plan My Day with AI</span>
        </button>
      </div>

      <LocationList locations={locations} onLocationSelect={onLocationSelect} />
    </div>
  );
};

export default Sidebar;