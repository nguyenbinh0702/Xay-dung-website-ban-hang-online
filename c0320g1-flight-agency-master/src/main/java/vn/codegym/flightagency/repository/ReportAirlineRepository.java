package vn.codegym.flightagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.codegym.flightagency.dto.ReportAirline;

import java.time.LocalDateTime;
import java.util.List;

public interface ReportAirlineRepository  extends JpaRepository<ReportAirline, Long> {
    // Thành
    @Query(value = "CALL find_total_airline(?1, ?2);", nativeQuery = true)
    List<ReportAirline> findTotalAirlinePerDate(LocalDateTime date1, LocalDateTime date2);
}
