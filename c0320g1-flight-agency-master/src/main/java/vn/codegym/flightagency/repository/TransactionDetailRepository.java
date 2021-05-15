package vn.codegym.flightagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.codegym.flightagency.model.TransactionDetail;

import java.util.List;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetail, Long> {

    // Created by Toàn
    List<TransactionDetail> findByTransaction_Id(Long id);
    List<TransactionDetail> findAllByTransactionIdAndPassenger_CheckinIsFalse(Long id);

}
