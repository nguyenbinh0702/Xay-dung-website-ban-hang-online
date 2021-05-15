import { Branch } from './branch';
import { Airport } from './airport';

export interface Promo {
  [prop: string]: any;

  id: number;
  namePromo: string;
  discount: number;
  airline: Branch;
  departurePlace: Airport;
  arrivalPlace: Airport;
  promoDateStart: string;
  promoDateEnd: string;
  flightDepartureDateStart: string;
  flightDepartureDateEnd: string;
  delete: boolean;
}
