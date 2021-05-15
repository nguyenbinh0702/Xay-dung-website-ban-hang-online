package vn.codegym.flightagency.dto;

import lombok.Data;
import vn.codegym.flightagency.model.Airport;

import java.time.LocalDateTime;

//Creator: BHung search flight schedule trong employee
@Data
public class EmployeeFlightSearchDTO {
    private Airport departurePlace;
    private Airport arrivalPlace;
    private String departureDate;
    private String arrivalDate;
    private int adult;
    private int child;
    private int baby;
}
