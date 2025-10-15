
export interface Hours {
  all?: string;
  Mon?: string;
  Tue?: string;
  Wed?: string;
  Thu?: string;
  Fri?: string;
  Sat?: string;
  Sun?: string;
}

export interface TicketInfo {
  [key: string]: string | number;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  cost: string;
}

export interface Location {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  ageGroups: string[];
  price: string;
  hours: Hours;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  reviewHighlights: string[];
  tips: string[];
  events?: Event[];
  ticketInfo?: TicketInfo;
  description?: string;
}

export interface FilterState {
  search: string;
  categories: Set<string>;
  ageGroups: Set<string>;
  prices: Set<string>;
  openNow: boolean;
  driveTime: string;
  bounds: any | null; // L.LatLngBounds is not easily available here
  userCoords?: { lat: number, lng: number };
}
