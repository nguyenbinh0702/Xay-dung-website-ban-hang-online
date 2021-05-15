package vn.codegym.flightagency.dto;


import lombok.Data;

import java.util.List;

@Data
public class CustomerChangePasswordDTO {
    private Long id;
    private String password;
    private String newPassword;
    private String confirmPassword;
    private List<String> backendMessage;
}
