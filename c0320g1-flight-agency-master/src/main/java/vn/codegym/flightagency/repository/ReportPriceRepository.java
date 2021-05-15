package vn.codegym.flightagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import vn.codegym.flightagency.dto.ReportAirline;
import vn.codegym.flightagency.dto.ReportPrice;
import vn.codegym.flightagency.dto.ReportPriceDTO;
import vn.codegym.flightagency.model.Transaction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ReportPriceRepository extends JpaRepository<ReportPrice, Long> {
        //Thành
        @Query(value = "CALL find_total_price(?1, ?2, ?3, ?4);", nativeQuery = true)
        List<ReportPrice> findTotalPricePerDate(LocalDateTime date1, LocalDateTime date2,LocalDateTime date3, LocalDateTime date4);
}
