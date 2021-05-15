package vn.codegym.flightagency.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import vn.codegym.flightagency.model.Airport;
import vn.codegym.flightagency.model.Branch;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SelectDto {
    List<Airport> airports;
    List<Branch> brands;

}
