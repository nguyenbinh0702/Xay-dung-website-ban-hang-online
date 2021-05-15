package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.PromoUpdateDTO;
import vn.codegym.flightagency.exception.ViolatedException;
import vn.codegym.flightagency.model.Airport;
import vn.codegym.flightagency.model.Branch;
import vn.codegym.flightagency.model.Promo;
import vn.codegym.flightagency.repository.AirportRepository;
import vn.codegym.flightagency.repository.BranchRepository;
import vn.codegym.flightagency.repository.PromoRepository;
import vn.codegym.flightagency.service.PromoService;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/employee/promotion")
public class PromoController {

    public int NUMBER_OF_PAGE = 3;

    @Autowired
    private PromoService promoService;
    @Autowired
    private PromoRepository promoRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private AirportRepository airportRepository;

    @GetMapping(value = "")
    public ResponseEntity<List<Promo>> findAllAndSearchPromo(@RequestParam("status") String status,
                                                             @RequestParam("page") int currentPage) {
        Pageable pageable = PageRequest.of(currentPage - 1, this.NUMBER_OF_PAGE, Sort.by("id"));
        List<Promo> promotions = new ArrayList<>();
        switch (status) {
            case "active":
                promotions = promoService.getPromoRunningNow(pageable);
                break;
            case "not-active":
                promotions = promoService.getPromoNotActive(pageable);
                break;
            case "expired":
                promotions = promoService.getPromoExpired(pageable);
                break;
        }
        if (promotions.isEmpty()) {
            return new ResponseEntity<List<Promo>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Promo>>(promotions, HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Promo> createNewPromo(@Valid @RequestBody Promo promo, BindingResult bindingResult) throws ViolatedException {
        if (bindingResult.hasErrors()) {
            throw new ViolatedException(bindingResult);
        }
        promo.setDelete(Boolean.FALSE);
        promoService.createNewPromo(promo);
        return new ResponseEntity<Promo>(promo, HttpStatus.CREATED);
    }

    @PostMapping(value = "/search")
    public ResponseEntity<List<Promo>> searchPromo(@RequestParam("page") int currentPage,
                                                   @RequestBody Map<String, String> infoSearch) {
        Pageable pageable = PageRequest.of(currentPage - 1, this.NUMBER_OF_PAGE, Sort.by("id"));

        String namePromo = infoSearch.get("namePromo");
        String airline = infoSearch.get("airline");
        String departurePlace = infoSearch.get("departurePlace");
        String arrivalPlace = infoSearch.get("arrivalPlace");
        String promoDateStart_Str = infoSearch.get("promoDateStart");
        String promoDateEnd_Str = infoSearch.get("promoDateEnd");
        String flightDepartureDateStart_Str = infoSearch.get("flightDepartureDateStart");
        String flightDepartureDateEnd_Str = infoSearch.get("flightDepartureDateEnd");

        List<Promo> promotions = new ArrayList<>();

        if (promoDateStart_Str.equals("") && promoDateEnd_Str.equals("") && flightDepartureDateStart_Str.equals("") && flightDepartureDateEnd_Str.equals("")) {
            promotions = promoRepository.searchNotIncludedDate(namePromo, airline, departurePlace, arrivalPlace, pageable);
        } else {
            if (promoDateStart_Str.equals("")) {
                promoDateStart_Str = "1900-01-01";
            }
            if (promoDateEnd_Str.equals("")) {
                promoDateEnd_Str = "2900-01-01";
            }
            if (flightDepartureDateStart_Str.equals("")) {
                flightDepartureDateStart_Str = "1900-01-01";
            }
            if (flightDepartureDateEnd_Str.equals("")) {
                flightDepartureDateEnd_Str = "2900-01-01";
            }
            LocalDateTime promoDateStart = this.promoService.convertDate(promoDateStart_Str);
            LocalDateTime promoDateEnd = this.promoService.convertDate(promoDateEnd_Str);
            LocalDateTime flightDepartureDateStart = this.promoService.convertDate(flightDepartureDateStart_Str);
            LocalDateTime flightDepartureDateEnd = this.promoService.convertDate(flightDepartureDateEnd_Str);

            promotions = promoRepository.search(namePromo, airline, departurePlace, arrivalPlace,
                    promoDateStart, promoDateEnd,
                    flightDepartureDateStart, flightDepartureDateEnd,
                    pageable);
        }

        return new ResponseEntity<List<Promo>>(promotions, HttpStatus.OK);
    }

    @GetMapping("/promo-edit/{id}")
    public ResponseEntity<Promo> getPromo(@PathVariable Long id) {
        Promo promo = promoService.findById(id);
        if (promo == null) {
            return new ResponseEntity<Promo>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Promo>(promo, HttpStatus.OK);
    }


    @PutMapping("/update-edit/{id}")
    public ResponseEntity<Promo> updatePromo(@PathVariable Long id, @RequestBody PromoUpdateDTO promoUpdateDTO) {
        Promo promo = promoService.findById(id);
        promo.setNamePromo(promoUpdateDTO.getNamePromo());
        promo.setDiscount(promoUpdateDTO.getDiscount());
        promo.setAirline(promoUpdateDTO.getAirline());
        promo.setDeparturePlace(promoUpdateDTO.getDeparturePlace());
        promo.setArrivalPlace(promoUpdateDTO.getArrivalPlace());
        promo.setPromoDateStart(promoUpdateDTO.getPromoDateStart());
        promo.setPromoDateEnd(promoUpdateDTO.getPromoDateEnd());
        promo.setFlightDepartureDateStart(promoUpdateDTO.getFlightDepartureDateStart());
        promo.setFlightDepartureDateEnd(promoUpdateDTO.getFlightDepartureDateEnd());
        promoService.save(promo);
        return ResponseEntity.ok().body(promo);
    }

    @PutMapping("/promo-delete/{id}")
    public Map<String, Boolean> deletePromo(@PathVariable(value = "id") Long promoId) {
        Promo promo = promoService.findById(promoId);
        promo.setDelete(Boolean.TRUE);
        promoService.save(promo);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/airline")
    public ResponseEntity<List<Branch>> getApiOfAirline() {
        List<Branch> airLineList = branchRepository.findAll();
        return new ResponseEntity<List<Branch>>(airLineList, HttpStatus.OK);
    }

    @GetMapping("/airport")
    public ResponseEntity<List<Airport>> getApiOfAirport() {
        List<Airport> airportList = airportRepository.findAll();
        return new ResponseEntity<List<Airport>>(airportList, HttpStatus.OK);
    }
}
