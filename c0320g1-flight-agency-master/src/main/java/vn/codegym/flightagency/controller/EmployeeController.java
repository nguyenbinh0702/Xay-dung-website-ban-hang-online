package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.EmployeeFlightSearchDTO;
import vn.codegym.flightagency.dto.PassengerCheckinDto;
import vn.codegym.flightagency.dto.TransactionPassengerDTO;
import vn.codegym.flightagency.model.*;
import vn.codegym.flightagency.service.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    AirportService airportService;
    @Autowired
    FlightScheduleService flightScheduleService;
    @Autowired
    AccountService accountService;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    private PassengerService passengerService;

    //BHung lay danh sach san bay
    @GetMapping("/employee/airport")
    public ResponseEntity<List<Airport>> findAllAirport(){
        List<Airport> airports = airportService.findAllAirport();
        if(airports==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(airports);
    }

    //BHung lay danh sach chuyến bay
    @PostMapping("/employee/flightSchedule")
    public ResponseEntity<Page<FlightSchedule>> findAllFlightSchedules(@RequestBody EmployeeFlightSearchDTO employeeFlightSearchDTO,
                                                                       @PageableDefault Pageable currentPage){
        Page<FlightSchedule> flightSchedules = flightScheduleService.findAllFlightScheduleByEmployee(employeeFlightSearchDTO.getDeparturePlace().getId(),
                employeeFlightSearchDTO.getArrivalPlace().getId(), employeeFlightSearchDTO.getDepartureDate(),
                employeeFlightSearchDTO.getAdult()+ employeeFlightSearchDTO.getChild(),"active",currentPage);
        if (flightSchedules==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(flightSchedules);
    }

    //BHung tim kiem chuyen bay theo id
    @GetMapping("/employee/flightSchedule/{id}")
    public ResponseEntity<FlightSchedule> findFlightById(@PathVariable Long id){
        FlightSchedule flightSchedule = flightScheduleService.findFlightById(id);
        if (flightSchedule==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(flightSchedule);
    }

    //BHung check email
    @GetMapping("/employee/checkEmail")
    public ResponseEntity<?> checkEmailExisted(@RequestParam String email){
        Account account =  accountService.findAccountByEmail(email);
        if(account==null){
            return new ResponseEntity<>("not found",HttpStatus.NOT_FOUND);
        }else {
            return ResponseEntity.ok(account);
        }
    }

    //BHung lưu trans và pass
    @PostMapping("employee/transPass/save")
    public ResponseEntity<List<Transaction>> saveTransactionsAndPassengers(@RequestBody TransactionPassengerDTO transactionPassengerDTO){
        List<Transaction> transactionList = employeeService.saveTransactionsAndTickets(transactionPassengerDTO.getTransactions(),transactionPassengerDTO.getPassengers());
        if(transactionList==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return ResponseEntity.ok(transactionList);
        }
    }

    //BHung tim kiem transaction
    @GetMapping("/employee/transaction/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id){
        Transaction transaction = employeeService.findTransactionById(id);
        if (transaction==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(transaction);
    }

    // Thành Long
    @GetMapping("/employee/customer-checkin-list")
    public ResponseEntity<Page<PassengerCheckinDto>> getAllPassengerCheckin(@RequestParam(name = "fullName", defaultValue = "") String fullName,
                                                                            @RequestParam(name = "address", defaultValue = "") String address,
                                                                            @RequestParam(name = "page") int page) {
        Specification<Passenger> specs = passengerService.getFilter(fullName, address);
        Page<PassengerCheckinDto> passengers;
        if (specs != null) {
            passengers = passengerService.findPassengerByCriteria(specs, page);
        } else {
            passengers = passengerService.findAllPassengerCheckin(page);
        }

        if (passengers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(passengers);
    }

}
