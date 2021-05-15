package vn.codegym.flightagency.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AccountDTO {
    private Long id;
    private String fullName;
    private LocalDate birthday;
    private String address;
    private String email;
    private String phoneNumber;
    private String avatarImageUrl;
}
