export interface Ticket {
  id: number;
  departure: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  bookingCode: string;
  airline: string;
  typeTicket: string;
  chair: string;
  price: number;
  taxesAndFees: number;
  typeCustomer: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  extraLuggage: string;
}
