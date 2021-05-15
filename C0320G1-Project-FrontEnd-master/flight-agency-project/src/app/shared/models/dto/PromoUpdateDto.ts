import { Airport } from 'src/app/shared/models/airport';
import { Branch } from 'src/app/shared/models/branch';
import DateTimeFormat = Intl.DateTimeFormat;
export interface PromoUpdateDto {
    'id': number;
    'promoName': string;
    'discount': number;
    'airline': Branch;
    'departurePlace': Airport;
    'arrivalPlace': Airport;
    'flightDepartureDateStart': DateTimeFormat;
    'flightDepartureDateEnd': DateTimeFormat ;
    'promoDateStart': DateTimeFormat ;
    'promoDateEnd': DateTimeFormat ;
  }
  