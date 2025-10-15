
import React from 'react';
import { Location } from '../types';
import LocationCard from './LocationCard';

interface LocationListProps {
  locations: Location[];
  onLocationSelect: (id: number) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, onLocationSelect }) => {
  return (
    <div className="flex-grow overflow-y-auto p-2 custom-scrollbar">
      {locations.length > 0 ? (
        locations.map(location => (
          <LocationCard key={location.id} location={location} onSelect={onLocationSelect} />
        ))
      ) : (
        <div className="text-center p-8 text-gray-500">
          <h3 className="text-lg font-semibold">No Gems Found</h3>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default LocationList;
