package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Airport;
import vn.codegym.flightagency.repository.AirportRepository;
import vn.codegym.flightagency.service.AirportService;

import java.util.List;

@Service
public class AirportServiceImpl implements AirportService {

    @Autowired
    private AirportRepository airportRepository;

    @Override
    public List<Airport> getAirports() {
        return airportRepository.findAll();
    }

    //BHung
    @Override
    public List<Airport> findAllAirport() {
        return airportRepository.findAll();
    }
}
