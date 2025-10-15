
import React from 'react';
import { FilterState } from '../types';
import { SearchIcon, RotateCcwIcon, ChevronDownIcon } from './Icons';
import { locations } from '../constants';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const categories = [...new Set(locations.map(l => l.category))].sort();
const ageGroups = [...new Set(locations.flatMap(l => l.ageGroups))];
const prices = ["Free", "$", "$$", "$$$"];
const driveTimes = [{value: 'any', label: 'Any'}, {value: '15', label: '< 15'}, {value: '30', label: '< 30'}, {value: '60', label: '< 60'}];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {

  const handleCheckboxChange = (filterType: 'categories' | 'ageGroups' | 'prices', value: string) => {
    setFilters(prevFilters => {
      const newSet = new Set(prevFilters[filterType]);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prevFilters, [filterType]: newSet, bounds: null };
    });
  };

  const handleReset = () => {
    setFilters({
      search: '',
      categories: new Set(),
      ageGroups: new Set(),
      prices: new Set(),
      openNow: false,
      driveTime: 'any',
      bounds: null,
      userCoords: filters.userCoords // Keep user location
    });
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={filters.search}
            onChange={(e) => setFilters(f => ({...f, search: e.target.value, bounds: null}))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
        </div>
        <button onClick={handleReset} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-colors" title="Reset all filters">
          <RotateCcwIcon />
        </button>
      </div>

      <details className="group mt-2">
        <summary className="list-none flex items-center justify-between cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
          <span>Show Filters</span>
          <div className="transition-transform duration-200 group-open:rotate-180">
            <ChevronDownIcon />
          </div>
        </summary>
        <div className="mt-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Category</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={filters.categories.has(cat)} onChange={() => handleCheckboxChange('categories', cat)} className="h-4 w-4 rounded border-gray-300 dark:border-gray-500 text-teal-600 focus:ring-teal-500 bg-gray-100 dark:bg-gray-600"/>
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Age Filter */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Age Group</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {ageGroups.map(age => (
                <label key={age} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={filters.ageGroups.has(age)} onChange={() => handleCheckboxChange('ageGroups', age)} className="h-4 w-4 rounded border-gray-300 dark:border-gray-500 text-teal-600 focus:ring-teal-500 bg-gray-100 dark:bg-gray-600"/>
                  <span>{age}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price Filter */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Price</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {prices.map(price => (
                <label key={price} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={filters.prices.has(price)} onChange={() => handleCheckboxChange('prices', price)} className="h-4 w-4 rounded border-gray-300 dark:border-gray-500 text-teal-600 focus:ring-teal-500 bg-gray-100 dark:bg-gray-600"/>
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Drive Time Filter */}
          <div className={!filters.userCoords ? 'filter-disabled' : ''}>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Drive Time</label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {driveTimes.map(time => (
                <label key={time.value} className={`flex items-center justify-center text-sm cursor-pointer border rounded-md p-2 transition-colors ${filters.driveTime === time.value ? 'bg-teal-500 text-white border-teal-500' : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>
                  <input type="radio" name="drive-time" value={time.value} checked={filters.driveTime === time.value} onChange={(e) => setFilters(f => ({...f, driveTime: e.target.value}))} className="sr-only"/>
                  <span>{time.label}</span>
                </label>
              ))}
            </div>
            {!filters.userCoords && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enable location to use this filter.</p>}
          </div>
          {/* Open Now Toggle */}
          <div className="flex items-center justify-between pt-2">
            <label htmlFor="open-now-toggle" className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Open Now</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="open-now-toggle" checked={filters.openNow} onChange={(e) => setFilters(f => ({...f, openNow: e.target.checked, bounds: null}))} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>
      </details>
    </div>
  );
};

export default FilterPanel;
