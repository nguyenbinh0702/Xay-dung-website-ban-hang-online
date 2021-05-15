package vn.codegym.flightagency.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.flightagency.dto.PassengerDTO;
import vn.codegym.flightagency.dto.PassengerInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import vn.codegym.flightagency.model.Passenger;
import vn.codegym.flightagency.dto.PassengerCheckinDto;
import vn.codegym.flightagency.dto.PassengerInfoDTO;

import java.util.List;

import java.time.LocalDate;


public interface PassengerService {
    // Thành Long
    Page<PassengerCheckinDto> findPassengerByCriteria(Specification<Passenger> spec, int page);

    //Thành Long
    Specification<Passenger> getFilter(String fullName, String address);

    //Thành Long
    Page<PassengerCheckinDto> findAllPassengerCheckin(int page);

    // Creator: Duy
    Passenger saveAndUpdate(PassengerInfoDTO _passenger);

    // Creator: Duy
    List<Passenger> addAllPassengers(List<PassengerInfoDTO> passengerInfoDtoList);


    Page<Passenger> getAllCustomer(Pageable page);


    void checkinPassenger(Passenger passenger);

    Passenger findById(Long id);

    Page<Passenger> findByEmail(String email, Pageable pageable);

    Page<Passenger> findAllByFullName(String name, Pageable pageable);

    Page<Passenger> findAllByBirthday(LocalDate date, Pageable pageable);

    Page<Passenger> findByPhoneNumber(String phoneNumber, Pageable pageable);

    Page<Passenger> findAllByGender(String gender, Pageable pageable);


    void savePassenger(Passenger passenger);

    PassengerDTO findPassengerDtoByUserId(Long id);

    Passenger findPassengerById(Long id);

    void updatePassenger(PassengerDTO passengerDTO, Long id);

    Passenger create(PassengerDTO passengerDTO);
}


