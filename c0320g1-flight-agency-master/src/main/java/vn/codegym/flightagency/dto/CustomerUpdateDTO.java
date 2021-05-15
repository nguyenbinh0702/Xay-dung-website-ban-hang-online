package vn.codegym.flightagency.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CustomerUpdateDTO {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate birthday;
    private String rank;
    private String gender;
    private String phoneNumber;
    private String address;
    private String avatarImageUrl;
    private List<String> backendMessage;
}
