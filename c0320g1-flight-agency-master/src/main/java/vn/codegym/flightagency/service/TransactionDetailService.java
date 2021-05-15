package vn.codegym.flightagency.service;
import vn.codegym.flightagency.dto.BookingDTO;
import vn.codegym.flightagency.model.TransactionDetail;

import java.util.List;

public interface TransactionDetailService {
    void saveTransactionDetail(BookingDTO booking);

    // Thành Long
    List<TransactionDetail> findByTransactionDetail(Long id);
}
