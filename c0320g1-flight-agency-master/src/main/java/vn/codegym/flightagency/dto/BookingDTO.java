package vn.codegym.flightagency.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookingDTO {

    private Long accountId;
    private Long depFlightId;
    private Long retFlightId;
    private Double depTotalPrice;
    private Double retTotalPrice;
    private String depBranch;
    private String retBranch;
    private List<PassengerInfoDTO> depPassengers;
    private List<PassengerInfoDTO> retPassengers;

}
