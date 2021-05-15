package vn.codegym.flightagency.dto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import vn.codegym.flightagency.model.Transaction;

import javax.persistence.*;
import java.util.List;

//BHung
@Data
public class EmployeePassengerDTO {
    private Long id;
    private String fullName;
    private String identifierCard;
    private String email;
    private String phoneNumber;
    private String gender;
    private Boolean checkin;
    private int deptLuggagePrice;
    private int arvLuggagePrice;
}
