package vn.codegym.flightagency.service;

import vn.codegym.flightagency.model.Airport;

import java.util.List;

public interface AirportService {

    List<Airport> getAirports();
    //BHung
    List<Airport> findAllAirport();
}
