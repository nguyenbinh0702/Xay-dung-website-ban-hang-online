package vn.codegym.flightagency.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class employeeInfoDto {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate birthday;
    private String gender;
    private String password;
    private String newPassword;
    private String confirmPassword;
    private String phoneNumber;
    private String address;
    private String avatarUrl;
    private List<String> backendMessage;
}
