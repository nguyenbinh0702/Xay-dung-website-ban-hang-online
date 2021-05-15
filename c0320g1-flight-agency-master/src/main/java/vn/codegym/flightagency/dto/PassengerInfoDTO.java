package vn.codegym.flightagency.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class PassengerInfoDTO {

    private String fullName;

    private String identifierCard;

    private String email;

    private String phoneNumber;

    private String gender;

    private int baggagePrice;
}
