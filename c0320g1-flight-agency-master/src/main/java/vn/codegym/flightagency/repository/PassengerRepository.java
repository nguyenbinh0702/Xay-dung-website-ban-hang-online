package vn.codegym.flightagency.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.codegym.flightagency.model.Passenger;
import java.time.LocalDate;



@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long > , JpaSpecificationExecutor<Passenger> {

    // Creator: Duy
    Passenger findPassengerByIdentifierCard(String idCard);

    //BHung
    Passenger findByIdentifierCard(String identifyCard);
    @Query(value = "select * from passengers", nativeQuery = true)
    Page<Passenger> findAllCustomer(Pageable pageable);

    // Thành Long
    Page<Passenger> findAllByCheckinIsTrue(Pageable pageable);

    // creator: Mậu
    Page<Passenger> findAllByEmailContaining(String email,Pageable pageable);

    // creator: Mậu
    Page<Passenger> findAllByFullNameContaining(String name, Pageable pageable);

    // creator: Mậu
    Page<Passenger> findAllByBirthDate(LocalDate birthDate, Pageable pageable);

    // creator: Mậu
    Page<Passenger> findAllByPhoneNumberContaining(String phone, Pageable pageable);

    // creator: Mậu
    Page<Passenger> findAllByGenderContaining(String gender, Pageable pageable);
}
