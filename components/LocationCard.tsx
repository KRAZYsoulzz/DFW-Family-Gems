
import React from 'react';
import { Location } from '../types';
import { StarIcon } from './Icons';

interface LocationCardProps {
  location: Location;
  onSelect: (id: number) => void;
}

const priceColors: { [key: string]: string } = { "Free": "bg-green-100 text-green-800", "$": "bg-blue-100 text-blue-800", "$$": "bg-yellow-100 text-yellow-800", "$$$": "bg-red-100 text-red-800" };
const darkPriceColors: { [key: string]: string } = { "Free": "dark:bg-green-900/50 dark:text-green-300", "$": "dark:bg-blue-900/50 dark:text-blue-300", "$$": "dark:bg-yellow-900/50 dark:text-yellow-300", "$$$": "dark:bg-red-900/50 dark:text-red-300" };

const getPriceColor = (price: string) => `${priceColors[price]} ${darkPriceColors[price]}` || "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300";


const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect }) => {
  return (
    <div 
      className="p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700/50"
      onClick={() => onSelect(location.id)}
    >
      <div className="flex items-center space-x-4">
        <img src={location.image || '/images/fallback.png'} alt={location.name} className="w-20 h-20 rounded-md object-cover flex-shrink-0"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/fallback.png'; }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{location.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{location.category}</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <div className="flex items-center space-x-1">
              <StarIcon filled={true}/>
              <span>{location.rating}</span>
            </div>
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getPriceColor(location.price)}`}>
              {location.price}
            </span>
            {location.ageGroups.slice(0, 1).map(age => (
              <span key={age} className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                {age}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
