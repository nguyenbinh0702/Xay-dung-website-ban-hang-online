package vn.codegym.flightagency.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.flightagency.model.Transaction;
import vn.codegym.flightagency.model.TransactionDetail;

import java.time.LocalDateTime;
import java.util.List;

import java.util.List;

public interface TransactionService {
    String WAITING = "Chờ thanh toán";
    String CANCELED = "Đã hủy";
    String PAID = "Đã thanh toán";
    // C-Ngan
    Page<Transaction> getTransactionsByAccountId(Long accountId, int currentPage);

    // Creator: Duy
    Transaction save(Transaction transaction);

    //Creator: Duy
    Transaction createTransaction(Long flightScheduleId, Long accountId, Double totalPrice);

    // Created by Toàn
    Transaction findById(Long id);

    // Created by Toàn
    List<Transaction> findUnpaidTransactionByAccount(Long accountId);

    // Created by Toàn
    Transaction findByIdAndPhone(Long id, String phone);

    // Created by Toàn
    Transaction payTransaction(Long id, String taxCode);

    // Created by Toàn
    List<Transaction> payTransactions(List<Long> ids, String taxCode);

    // Created by Toàn
    Transaction cancelTransaction(Long id);

    // Created by Toàn
    List<TransactionDetail> findTransactionDetails(Long id);

    // Created by Toàn
    List<Transaction> findOverdueTransaction();

    List<Transaction> saveAll(List<Transaction> transactions);

}
