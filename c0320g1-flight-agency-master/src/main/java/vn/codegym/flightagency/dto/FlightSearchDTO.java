package vn.codegym.flightagency.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FlightSearchDTO {

    private String sortBy;
    private Long departure;
    private Long arrival;
    private LocalDate depDate;
    private byte babies;
    private byte children;
    private byte adults;

}
