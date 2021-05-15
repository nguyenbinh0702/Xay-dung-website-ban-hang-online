export interface PromoSearchDto {
  isRoundTrip: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  babies: number;
  children: number;
  adults: number;
}
