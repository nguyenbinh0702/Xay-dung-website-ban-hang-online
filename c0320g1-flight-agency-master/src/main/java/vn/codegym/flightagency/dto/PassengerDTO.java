package vn.codegym.flightagency.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PassengerDTO {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate birthDate;
    private String identifierCard;
    private String gender;
    private String phoneNumber;
    private String address;
    private List<String> backendMessage;
}
