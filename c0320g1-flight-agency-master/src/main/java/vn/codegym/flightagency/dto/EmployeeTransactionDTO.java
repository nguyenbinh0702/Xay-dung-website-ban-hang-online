package vn.codegym.flightagency.dto;

import lombok.Data;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.model.FlightSchedule;

import java.time.LocalDateTime;


//BHung
@Data
public class EmployeeTransactionDTO {
    private Long id;
    private FlightSchedule flightSchedule;
    private Account account;
    private Double price;
    private LocalDateTime createdTime;
    private LocalDateTime dueTime;
    private String status;
}
