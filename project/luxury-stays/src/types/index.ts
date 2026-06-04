export interface Villa {
  id: number;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
}

export interface Booking {
  villaId: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guestName: string;
  guestPhone: string;
  totalPrice: number;
  nights: number;
}
