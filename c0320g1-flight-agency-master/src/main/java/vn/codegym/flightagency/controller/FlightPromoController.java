package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.FlightSearchDTO;
import vn.codegym.flightagency.exception.ViolatedException;
import vn.codegym.flightagency.model.Airport;
import vn.codegym.flightagency.model.FlightSchedule;
import vn.codegym.flightagency.model.Promo;
import vn.codegym.flightagency.service.AirportService;
import vn.codegym.flightagency.service.PromoService;
import vn.codegym.flightagency.service.impl.FlightSchedulePromotionServiceImpl;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class FlightPromoController {

    @Autowired
    private FlightSchedulePromotionServiceImpl flightSchedulePromotionService;

    @Autowired
    private AirportService airportService;

    @Autowired
    private PromoService promoService;

    // Creator: An
    // Get all airport
    @PostMapping("/flight-promotion")
    public ResponseEntity<List<FlightSchedule>> ListSchedulePromotion(@RequestBody FlightSearchDTO flights)   throws ViolatedException {
        List<FlightSchedule>  flightSchedules = flightSchedulePromotionService.searchFlightsPromotion(flights);
        return ResponseEntity.ok(flightSchedules);
    }

    @GetMapping("/promotion")
    public ResponseEntity<List<FlightSchedule>> ListDateSchedulePromotion(@RequestParam String departureAirport)   throws ViolatedException {
        List<FlightSchedule>  dateFlightSchedules = flightSchedulePromotionService.listFlightsPromotion(LocalDate.parse(departureAirport));
        return ResponseEntity.ok(dateFlightSchedules);
    }

    
}
