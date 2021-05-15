package vn.codegym.flightagency.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.flightagency.dto.FlightSearchDTO;
import vn.codegym.flightagency.model.FlightSchedule;

import java.time.LocalDate;
import vn.codegym.flightagency.model.FlightSchedule;

import java.util.List;

public interface FlightScheduleService {
    //D-Bach
    Page<FlightSchedule> findAllFlightSchedule(Pageable pageable);

    //ADuy
    List<FlightSchedule> searchFlights(FlightSearchDTO flights);

    //BHung hàm employee tìm chuyến bay
    Page<FlightSchedule> findAllFlightScheduleByEmployee(long deptPlaceId, long arrPlaceId, String deptDate,
                                                         int capacity, String status, Pageable pageable);

    //BHung hàm tìm kiếm chuyến bay theo id
    FlightSchedule findFlightById(Long id);
}
