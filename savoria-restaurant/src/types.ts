export interface CategoryItem {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  rating?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationBooking {
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main-dining' | 'romantic-window' | 'chefs-table' | 'outdoor-patio' | 'private-lounge';
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  bookingRef?: string;
}
