package vn.codegym.flightagency.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.codegym.flightagency.model.Promo;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PromoRepository extends JpaRepository<Promo, Long> {

    @Query(value = "select * from flight_agency.promo where (?1 between promo_date_start and promo_date_end) and is_delete is FALSE",
            nativeQuery = true)
    List<Promo> getPromoRunningNow(LocalDateTime time, Pageable pageable);

    @Query(value = "select * from flight_agency.promo where promo_date_end < ?1 and is_delete is FALSE",
            nativeQuery = true)
    List<Promo> getPromoExpired(LocalDateTime time, Pageable pageable);

    @Query(value = "select * from flight_agency.promo where promo_date_start > ?1 and is_delete is FALSE",
            nativeQuery = true)
    List<Promo> getPromoNotActive(LocalDateTime time, Pageable pageable);

    @Query(value = "select * from flight_agency.promo " +
            "where name_promo like %?1% " +
            "and airline like %?2% " +
            "and departure_place like %?3% " +
            "and arrival_place like %?4% " +
            "and ((?5 between promo_date_start and promo_date_end) " +
            "or (?6 between promo_date_start and promo_date_end)) " +
            "or ((?7 between flight_departure_date_start and flight_departure_date_end) " +
            "or (?8 between flight_departure_date_start and flight_departure_date_end)) and is_delete is FALSE",
            nativeQuery = true)
    List<Promo> search(String namePromo, String airline,
                       String departurePlace, String arrivalPlace,
                       LocalDateTime promoDateStart, LocalDateTime promoDateEnd,
                       LocalDateTime flightDepartureDateStart, LocalDateTime flightDepartureDateEnd,
                       Pageable pageable);

    @Query(value = "select * from flight_agency.promo " +
            "where name_promo like %?1% " +
            "and airline like %?2% " +
            "and departure_place like %?3% " +
            "and arrival_place like %?4% and is_delete is FALSE",
            nativeQuery = true)
    List<Promo> searchNotIncludedDate(String namePromo, String airline,
                                      String departurePlace, String arrivalPlace,
                                      Pageable pageable);
}
