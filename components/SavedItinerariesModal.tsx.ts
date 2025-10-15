import React, { useState, useEffect } from 'react';
import { XIcon, CheckIcon } from './Icons';

interface SavedItinerary {
  id: string;
  title: string;
  content: string;
  savedAt: string;
  checklist: { [key: string]: boolean };
}

interface SavedItinerariesModalProps {
  onClose: () => void;
}

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);

const SavedItinerariesModal: React.FC<SavedItinerariesModalProps> = ({ onClose }) => {
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<SavedItinerary | null>(null);

  useEffect(() => {
    loadSavedItineraries();
  }, []);

  const loadSavedItineraries = () => {
    const saved = localStorage.getItem('savedItineraries');
    if (saved) {
      setSavedItineraries(JSON.parse(saved));
    }
  };

  const deleteItinerary = (id: string) => {
    const updated = savedItineraries.filter(it => it.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('savedItineraries', JSON.stringify(updated));
    if (selectedItinerary?.id === id) {
      setSelectedItinerary(null);
    }
  };

  const toggleChecklistItem = (itemKey: string) => {
    if (!selectedItinerary) return;
    
    const updated = {
      ...selectedItinerary,
      checklist: {
        ...selectedItinerary.checklist,
        [itemKey]: !selectedItinerary.checklist[itemKey]
      }
    };
    
    setSelectedItinerary(updated);
    
    const allItineraries = savedItineraries.map(it => 
      it.id === updated.id ? updated : it
    );
    setSavedItineraries(allItineraries);
    localStorage.setItem('savedItineraries', JSON.stringify(allItineraries));
  };

  const extractChecklistItems = (content: string): string[] => {
    const items: string[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^\d+\./)) {
        const cleaned = trimmed.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '');
        if (cleaned && cleaned.length > 5) {
          items.push(cleaned);
        }
      }
    }
    
    return items;
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<h4 class="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-4 mb-2">$1</h4>')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .map(line => line.startsWith('<h4') ? line : `<p class="mb-2">${line}</p>`)
      .join('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar with saved itineraries list */}
        <div className="w-64 border-r dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">My Itineraries</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{savedItineraries.length} saved</p>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {savedItineraries.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                No saved itineraries yet. Create one from the planner!
              </div>
            ) : (
              savedItineraries.map(itinerary => (
                <div
                  key={itinerary.id}
                  className={`p-3 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 ${selectedItinerary?.id === itinerary.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                  onClick={() => setSelectedItinerary(itinerary)}
                >
                  <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
                    {itinerary.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(itinerary.savedAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-grow flex flex-col">
          <header className="p-4 border-b dark:border-gray-700 flex items-center justify-between shrink-0">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {selectedItinerary ? selectedItinerary.title : 'Saved Itineraries'}
            </h2>
            <button onClick={onClose} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <XIcon />
            </button>
          </header>

          <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
            {!selectedItinerary ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                Select an itinerary from the sidebar to view details
              </div>
            ) : (
              <>
                {/* Itinerary Content */}
                <div className="mb-6">
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatContent(selectedItinerary.content) }}
                  />
                </div>

                {/* Checklist */}
                <div className="mt-8 border-t dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Activity Checklist</h3>
                  <div className="space-y-2">
                    {extractChecklistItems(selectedItinerary.content).map((item, idx) => {
                      const itemKey = `item-${idx}`;
                      const isChecked = selectedItinerary.checklist[itemKey] || false;
                      
                      return (
                        <label
                          key={itemKey}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group"
                        >
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleChecklistItem(itemKey)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${isChecked ? 'bg-teal-500 border-teal-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-teal-400'}`}>
                              {isChecked && <CheckIcon className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          <span className={`flex-grow text-sm ${isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Delete button */}
                <div className="mt-6 pt-6 border-t dark:border-gray-700">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this itinerary?')) {
                        deleteItinerary(selectedItinerary.id);
                      }
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete Itinerary
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedItinerariesModal;