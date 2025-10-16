import React, { useState } from 'react';
import { Location } from '../types';
import { XIcon, SparkleIcon, ArrowRightIcon, LoadingSpinner } from './Icons';

interface MultiStopPlannerModalProps {
  locations: Location[];
  onClose: () => void;
}

const SaveIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const MultiStopItineraryResult: React.FC<{ htmlContent: string, options: any, locations: Location[] }> = ({ htmlContent, options, locations }) => {
    const itineraries = htmlContent.split('###').slice(1);

    const saveItinerary = (title: string, content: string) => {
        const saved = localStorage.getItem('savedItineraries');
        const existing = saved ? JSON.parse(saved) : [];
        
        const newItinerary = {
            id: Date.now().toString(),
            title: title,
            content: content,
            savedAt: new Date().toISOString(),
            checklist: {}
        };
        
        existing.push(newItinerary);
        localStorage.setItem('savedItineraries', JSON.stringify(existing));
        alert('Itinerary saved! View it in "My Itineraries"');
    };

    return (
        <div>
            {itineraries.map((itinerary, index) => {
                const lines = itinerary.trim().split('\n');
                const title = lines.shift()?.trim() || 'Suggested Itinerary';
                const bodyContent = lines.join('\n');

                const mentionedLocationNames: string[] = [];
                locations.forEach(loc => {
                    if (itinerary.includes(loc.name)) {
                        mentionedLocationNames.push(loc.name);
                    }
                });

                let totalPrice = 0;
                mentionedLocationNames.forEach(name => {
                    const location = locations.find(l => l.name === name);
                    if (location && location.ticketInfo) {
                        let cost = 0;
                        const numAdults = options.numAdults;
                        const numKids = options.numKids;
                        if (location.ticketInfo.Adult) cost += (location.ticketInfo.Adult as number) * numAdults;
                        if ((location.ticketInfo.Child || location.ticketInfo.Youth)) cost += ((location.ticketInfo.Child || location.ticketInfo.Youth) as number) * numKids;
                        if (location.ticketInfo.General) cost += (location.ticketInfo.General as number) * (numAdults + numKids);
                        if (location.ticketInfo.Admission) cost += (location.ticketInfo.Admission as number) * (numAdults + numKids);
                        if (location.ticketInfo['Park Entry']) cost += (location.ticketInfo['Park Entry'] as number);
                        if (location.ticketInfo['Maze']) cost += (location.ticketInfo['Maze'] as number) * (numAdults + numKids);
                        totalPrice += cost;
                    }
                });
                
                const formattedBody = bodyContent
                    .replace(/\*\*(.*?)\*\*/g, '<h4 class="text-lg font-bold text-indigo-600 dark:text-indigo-400 my-3">$1</h4>')
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line)
                    .map(line => line.startsWith('<h4') ? line : `<p class="mb-2">${line}</p>`)
                    .join('');

                return (
                    <div key={index} className="multi-itinerary-result border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 bg-white dark:bg-gray-800">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 flex-grow">{title}</h3>
                            <button
                                onClick={() => saveItinerary(title, bodyContent)}
                                className="ml-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
                            >
                                <SaveIcon />
                                <span>Save</span>
                            </button>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: formattedBody }} className="text-gray-600 dark:text-gray-300 space-y-2" />
                        {totalPrice > 0 ? (
                           <div className="price-estimate mt-3 inline-block bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-sm font-medium px-3 py-1 rounded-full">Est. Activity Cost: ~${totalPrice.toFixed(2)}</div>
                        ) : (
                           <div className="price-estimate mt-3 inline-block bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-sm font-medium px-3 py-1 rounded-full">Est. Activity Cost: Free!</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


const MultiStopPlannerModal: React.FC<MultiStopPlannerModalProps> = ({ locations, onClose }) => {
  const [options, setOptions] = useState({
    numAdults: 2,
    numKids: 1,
    timeAvailable: 'Half-day',
    budget: 50,
    mealType: 'none',
    mealPrice: '$',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    preferences: '',
  });
  const [results, setResults] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const numValue = e.target.type === 'number' ? parseFloat(value) : value;
    setOptions(prev => ({...prev, [id]: numValue}));
  }

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
        // Build a detailed prompt with all the user's preferences
        let mealPreference = 'No specific meal stop is needed.';
        if (options.mealType !== 'none') {
            mealPreference = `Please include a stop for a ${options.mealType} meal with a price range of ${options.mealPrice}.`;
        }

        const promptData = {
            numAdults: options.numAdults,
            numKids: options.numKids,
            date: options.date,
            timeAvailable: options.timeAvailable,
            budget: options.budget,
            mealPreference: mealPreference,
            preferences: options.preferences
        };

        // Call the netlify function with the enhanced prompt
        const res = await fetch('/.netlify/functions/itinerary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                multiStopOptions: promptData,
                locations: locations 
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const json = await res.json();
        setResults(json.text);
    } catch (e: any) {
        console.error('Error generating itinerary:', e);
        setError(e.message || "An unknown error occurred.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 border-b dark:border-gray-700 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <SparkleIcon className="text-indigo-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Plan Your Perfect DFW Day</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <XIcon />
          </button>
        </header>
        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
          {!results && !isLoading && !error && (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Tell us a bit about your crew and your vibe for the day, and our AI planner will suggest a couple of custom itineraries for you.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="numAdults" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adults</label>
                        <input type="number" id="numAdults" value={options.numAdults} onChange={handleChange} min="1" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200"/>
                    </div>
                    <div>
                        <label htmlFor="numKids" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kids</label>
                        <input type="number" id="numKids" value={options.numKids} onChange={handleChange} min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200"/>
                    </div>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">When are you planning to visit?</label>
                  <input type="date" id="date" value={options.date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200"/>
                </div>
                <div>
                  <label htmlFor="timeAvailable" className="block text-sm font-medium text-gray-700 dark:text-gray-300">How much time do you have?</label>
                  <select id="timeAvailable" value={options.timeAvailable} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200">
                      <option value="2-3 hours">Quick Trip (2-3 hours)</option>
                      <option value="Half-day">Half-Day (4-5 hours)</option>
                      <option value="Full-day">Full-Day Adventure (6+ hours)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activity Budget</label>
                  <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span></div>
                      <input type="number" id="budget" value={options.budget} onChange={handleChange} min="0" className="block w-full rounded-md border-gray-300 dark:border-gray-600 pl-7 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200" placeholder="e.g., 100"/>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-gray-500 dark:text-gray-400 sm:text-sm">USD</span></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meal Stop</label>
                  <div className="mt-2 space-y-2">
                      <select id="mealType" value={options.mealType} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200">
                          <option value="none">No meal needed</option>
                          <option value="Fast Food">Fast Food</option>
                          <option value="Sit-down">Sit-down Restaurant</option>
                      </select>
                      {options.mealType !== 'none' && (
                        <select id="mealPrice" value={options.mealPrice} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200">
                            <option value="$">$ (under $15/person)</option>
                            <option value="$$">$$ ($15-$30/person)</option>
                            <option value="$$$">$$$ ($30+/person)</option>
                        </select>
                      )}
                  </div>
                </div>
                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Any preferences?</label>
                  <textarea 
                    id="preferences" 
                    value={options.preferences} 
                    onChange={handleChange} 
                    rows={3}
                    placeholder="e.g., 'avoid crowds', 'loves dinosaurs', 'need wheelchair access', 'prefers shaded areas'"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
                <LoadingSpinner />
                <p className="text-gray-600 dark:text-gray-300 font-medium">✨ Finding the best day ever for your family...</p>
            </div>
          )}

          {error && (
            <div className="text-center p-4">
                <p className="text-red-500 mb-2">Error: {error}</p>
                <button 
                    onClick={() => setError(null)} 
                    className="text-indigo-600 hover:text-indigo-700 text-sm underline"
                >
                    Try Again
                </button>
            </div>
          )}
          
          {results && <MultiStopItineraryResult htmlContent={results} options={options} locations={locations} />}
        </div>
        <footer className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700 shrink-0">
          <button onClick={handleGenerate} disabled={isLoading} className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
            <span>{isLoading ? 'Generating...' : 'Generate Itineraries'}</span>
            {!isLoading && <ArrowRightIcon />}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MultiStopPlannerModal;