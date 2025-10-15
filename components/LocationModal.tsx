import React, { useState } from 'react';
import { Location } from '../types';
import { generateSingleStopItinerary } from '../services/geminiService';
import {
  XIcon, CarIcon, TicketIcon, MapPinIcon, UsersIcon, SparkleIcon,
  ThumbsUpIcon, StarIcon, LoadingSpinner, WandSparklesIcon,
  CrosshairIcon
} from './Icons';

interface LocationModalProps {
  location: Location;
  onClose: () => void;
  userCoords?: { lat: number, lng: number };
}

const priceColors: { [key: string]: string } = { "Free": "bg-green-100 text-green-800", "$": "bg-blue-100 text-blue-800", "$$": "bg-yellow-100 text-yellow-800", "$$$": "bg-red-100 text-red-800" };
const darkPriceColors: { [key: string]: string } = { "Free": "dark:bg-green-900/50 dark:text-green-300", "$": "dark:bg-blue-900/50 dark:text-blue-300", "$$": "dark:bg-yellow-900/50 dark:text-yellow-300", "$$$": "dark:bg-red-900/50 dark:text-red-300" };

const getPriceColor = (price: string) => `${priceColors[price]} ${darkPriceColors[price]}` || "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center star-rating">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < Math.round(rating)} />
    ))}
  </div>
);

const ItineraryContent: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
    const formattedHtml = htmlContent
        .replace(/\*\*(.*?)\*\*/g, '<h4 class="text-base font-bold text-teal-600 dark:text-teal-400 mt-4 mb-2">$1</h4>')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => line.startsWith('<h4') ? line : `<p class="mb-2">${line}</p>`)
        .join('');

    return <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};

const LocationModal: React.FC<LocationModalProps> = ({ location, onClose, userCoords }) => {
    const [itinerary, setItinerary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState(location.image);

    const handleGenerateItinerary = async () => {
        setIsLoading(true);
        setError(null);
        setItinerary(null);
        try {
            const result = await generateSingleStopItinerary(location);
            setItinerary(result);
        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
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

    const getDriveTimeHTML = () => {
      if (userCoords) {
          const distance = calculateDistance(userCoords.lat, userCoords.lng, location.lat, location.lng);
          const time = estimateDriveTime(distance);
          return <div className="flex items-start space-x-3"><CarIcon className="text-teal-500 mt-1 shrink-0" /><span>Approx. <b>{time} min drive</b> from your location.</span></div>;
      }
      return <div className="flex items-start space-x-3"><CrosshairIcon className="text-gray-400 mt-1 shrink-0" /><span className="text-gray-500 dark:text-gray-400">Enable location services to get drive times.</span></div>;
    }

    const getTicketInfoHTML = () => {
      if (!location.ticketInfo) return null;
      const pricingDetails = Object.entries(location.ticketInfo)
          .filter(([key]) => key !== 'note')
          .map(([key, value]) => `<b class="capitalize">${key}:</b> ${typeof value === 'number' ? '$' + value : value}`)
          .join(' &nbsp;•&nbsp; ');
      const note = location.ticketInfo.note ? ` <span class="text-gray-500 dark:text-gray-400 text-sm">(${location.ticketInfo.note})</span>` : '';
      return <div className="flex items-start space-x-3"><TicketIcon className="text-teal-500 mt-1 shrink-0" /><span dangerouslySetInnerHTML={{ __html: `${pricingDetails}${note}` }} /></div>
    }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
         <div className="relative">
            <img src={mainImage} alt={location.name} className="w-full h-56 object-cover rounded-t-2xl"
             onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/fallback.png"; }}
             />
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 dark:bg-gray-900/70 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-opacity-100 transition"><XIcon/></button>
         </div>
         {location.gallery && location.gallery.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b dark:border-gray-700">
              <div className="flex space-x-2">
                {location.gallery.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${location.name} gallery image ${index + 1}`}
                    className={`w-1/4 h-16 object-cover rounded-md border-2 cursor-pointer transition-all duration-150 ${mainImage === imgUrl ? 'border-teal-500' : 'border-transparent hover:border-teal-500/50'}`}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/fallback.png"; }}
                    onClick={() => setMainImage(imgUrl)}
                  />
                ))}
              </div>
            </div>
         )}
         <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{location.name}</h2>
            <div className="mt-2 flex items-center space-x-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriceColor(location.price)}`}>{location.price}</span>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">{location.category}</span>
            </div>
            
            {location.events && location.events.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-2 mb-3">Upcoming Events</h3>
                <div className="space-y-4">
                  {location.events.map((event, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="font-bold text-gray-800 dark:text-gray-100">{event.title}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                              </div>
                              <p className={`text-sm font-semibold ${event.cost.toLowerCase() === 'free' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>{event.cost}</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
                      </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-2 mb-3">Good to Know</h3>
               <div className="space-y-3 text-gray-700 dark:text-gray-300">
                   <div className="flex items-start space-x-3"><MapPinIcon className="text-teal-500 mt-1 shrink-0"/><span>{location.address}</span></div>
                   {getDriveTimeHTML()}
                   {getTicketInfoHTML()}
                   <div className="flex items-start space-x-3"><UsersIcon className="text-teal-500 mt-1 shrink-0" /><span>Best for: {location.ageGroups.join(', ')}</span></div>
               </div>
            </div>

            <div className="mt-6">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-2 mb-3">Your Adventure Plan</h3>
               <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    { !itinerary && !isLoading && !error && (
                        <button onClick={handleGenerateItinerary} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                            <WandSparklesIcon/>
                            <span>Plan My Adventure</span>
                        </button>
                    )}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center gap-4 p-4">
                          <LoadingSpinner />
                          <p className="text-gray-600 dark:text-gray-300 font-medium">✨ Crafting the perfect family adventure...</p>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {itinerary && <ItineraryContent htmlContent={itinerary} />}
               </div>
            </div>
         </div>
         <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl border-t dark:border-gray-700">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition duration-200">Get Directions</a>
         </div>
      </div>
    </div>
  );
};

export default LocationModal;