package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.PassengerDTO;
import vn.codegym.flightagency.exception.ResourceNotFoundException;
import vn.codegym.flightagency.model.Passenger;
import vn.codegym.flightagency.service.PassengerService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class PassengerController {
    @Autowired
    private PassengerService passengerService;


    @GetMapping("/customer/search")
    public ResponseEntity<Page<Passenger>> getAllCustomerList2(@PageableDefault(value = 5) Pageable pageable,
                                                               @RequestParam(name = "key",defaultValue = "") String key,
                                                               @RequestParam(name = "value",defaultValue = "") String value) {
        Page<Passenger> passengerPage;

        switch (key) {
            case "name":
                passengerPage = passengerService.findAllByFullName(value, pageable);
                break;
            case "birthday":
                LocalDate date1 = LocalDate.parse(value, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                passengerPage = passengerService.findAllByBirthday(date1, pageable);
                break;
            case "phone":
                passengerPage = passengerService.findByPhoneNumber(value, pageable);
                break;
            case "email":
                passengerPage = passengerService.findByEmail(value, pageable);
                break;
            case "gender":
                passengerPage = passengerService.findAllByGender(value, pageable);
                break;
            default:
                passengerPage = passengerService.getAllCustomer(pageable);

        }
        return new ResponseEntity<>(passengerPage, HttpStatus.OK);

    }

    //creator: Mậu
    @GetMapping("/customer/management")
    public ResponseEntity<Page<Passenger>> getAllCustomerList(@PageableDefault Pageable currentPage) {
        Page<Passenger> customers = passengerService.getAllCustomer(currentPage);
        return ResponseEntity.ok(customers);
    }

    // Thành Long
    @PutMapping("checkin/checkin-list")
    public Map<String, Boolean> checkinPassenger(@RequestBody Map<String, Long[]> requestBody) {
        Long[] ids = requestBody.get("ids").clone();
        Map<String, Boolean> response = new HashMap<>();

        for (Long id : ids) {
            Passenger passenger = passengerService.findById(id);
            passengerService.checkinPassenger(passenger);
            response.put("checkin " + id, Boolean.TRUE);
        }
        return response;
    }

    @PostMapping("/passenger/add")
    public ResponseEntity<Passenger> createPassenger(@Valid @RequestBody PassengerDTO passengerDTO) throws ResourceNotFoundException {
        Passenger passenger = passengerService.create(passengerDTO);
        if (passenger != null) {
            return ResponseEntity.ok().body(passenger);
        } else {
            throw new ResourceNotFoundException("Failed to create CartDetail");
        }
    }

    //Creator: Hậu
    @GetMapping("/passenger/{id}")
    public ResponseEntity<PassengerDTO> findUserById(@PathVariable Long id) {
        PassengerDTO passengerDTO = passengerService.findPassengerDtoByUserId(id);
        if (passengerDTO == null) {
            return new ResponseEntity<PassengerDTO>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(passengerDTO);
    }

    //Creator:  Hậu
    @PutMapping("passenger/update/{id}")
    public ResponseEntity<PassengerDTO> updatePassenger(@PathVariable Long id, @RequestBody PassengerDTO passengerDTO) {
        Passenger passenger = passengerService.findPassengerById(id);
        if (passenger == null) {
            return new ResponseEntity<PassengerDTO>(HttpStatus.NOT_FOUND);
        }
        passengerService.updatePassenger(passengerDTO, id);
        return new ResponseEntity<PassengerDTO>(passengerDTO, HttpStatus.OK);
    }


}
