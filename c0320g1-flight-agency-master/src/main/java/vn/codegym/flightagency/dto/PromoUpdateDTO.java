package vn.codegym.flightagency.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.codegym.flightagency.model.Airport;
import vn.codegym.flightagency.model.Branch;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
public class PromoUpdateDTO {
    private Long id;
    private String namePromo;
    private Double discount;
    private Branch airline;
    private Airport departurePlace;
    private Airport arrivalPlace;
    private LocalDateTime flightDepartureDateStart;
    private LocalDateTime flightDepartureDateEnd;
    private LocalDateTime promoDateStart;
    private LocalDateTime promoDateEnd;

}
