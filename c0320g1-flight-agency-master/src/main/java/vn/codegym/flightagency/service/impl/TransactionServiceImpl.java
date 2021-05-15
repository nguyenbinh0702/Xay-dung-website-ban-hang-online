package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.model.FlightSchedule;
import vn.codegym.flightagency.model.Transaction;
import vn.codegym.flightagency.model.*;
import vn.codegym.flightagency.repository.BillRepository;
import vn.codegym.flightagency.repository.TransactionDetailRepository;
import vn.codegym.flightagency.repository.TransactionRepository;
import vn.codegym.flightagency.service.TransactionService;
import vn.codegym.flightagency.utility.BillCodeGenerator;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;


@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    // C-Ngan
    Sort sort = Sort.by(Sort.Direction.ASC, "createdTime");
    Pageable page = PageRequest.of(0, 2, sort);
    @Override
    public Page<Transaction> getTransactionsByAccountId(Long accountId, int currentPage) {
        if (currentPage > 0 ){
            Pageable page = PageRequest.of(--currentPage, 2, sort);
            return transactionRepository.findByAccount_IdIs(accountId, page);
        }
        return transactionRepository.findByAccount_IdIs(accountId, page);
    }




    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    @Autowired
    private BillRepository billRepository;

    // Created by Toàn
    @Override
    public Transaction findById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    // Created by Toàn
    @Override
    public List<Transaction> findUnpaidTransactionByAccount(Long accountId) {
        List<Transaction> transactions = transactionRepository.findUnpaidByAccountId(accountId);
        if (transactions.size() > 0) {
            return transactions;
        } else {
            return null;
        }
    }

    // Created by Toàn
    @Override
    public Transaction findByIdAndPhone(Long id, String phone) {
        Optional<Transaction> optional = transactionRepository.findById(id);
        if (optional.isPresent()) {
            Transaction transaction = optional.get();
            if (phone.equals(transaction.getAccount().getPhoneNumber())) {
                return transaction;
            } else {
                List<TransactionDetail> transactionDetails = transactionDetailRepository.findByTransaction_Id(id);
                if (transactionDetails.size() > 0) {
                    for (TransactionDetail detail : transactionDetails) {
                        if (phone.equals(detail.getPassenger().getPhoneNumber())) {
                            return transaction;
                        }
                    }
                }
            }
        }
        return null;
    }

    // Created by Toàn
    @Override
    public Transaction payTransaction(Long id, String taxCode) {
        Optional<Transaction> optional = transactionRepository.findById(id);
        if (!optional.isPresent()) {
            return null;
        }
        Transaction transaction = optional.get();
        transaction.setStatus(TransactionService.PAID);
        Bill bill = new Bill();
        bill.setDateCreated(LocalDateTime.now());
        bill.setTransaction(transaction);
        bill.setTaxCode(taxCode);
        bill = billRepository.save(bill);
        bill.setBillCode(BillCodeGenerator.generate(bill.getId()));
        billRepository.save(bill);
        return transactionRepository.save(transaction);
    }

    // Created by Toàn
    @Override
    public Transaction cancelTransaction(Long id) {
        Optional<Transaction> optional = transactionRepository.findById(id);
        if (!optional.isPresent()) {
            return null;
        }
        Transaction transaction = optional.get();
        transaction.setStatus(TransactionService.CANCELED);
        return transactionRepository.save(transaction);
    }

    // Created by Toàn
    @Override
    public List<Transaction> payTransactions(List<Long> ids, String taxCode) {
        List<Transaction> transactions = new LinkedList<>();
        for (Long id : ids) {
            Transaction transaction = payTransaction(id, taxCode);
            if (transaction != null) {
                transactions.add(transaction);
            } else {
                return null;
            }
        }
        return transactions.size() > 0 ? transactions : null;
    }

    // Created by Toàn
    @Override
    public List<TransactionDetail> findTransactionDetails(Long id) {
        List<TransactionDetail> details = transactionDetailRepository.findByTransaction_Id(id);
        return details.size() > 0 ? details : null;
    }

    // Creator: Duy
    @Override
    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Creator: Duy
    // create transaction
    @Override
    public Transaction createTransaction(Long flightScheduleId, Long accountId, Double totalPrice) {
        Transaction transaction = new Transaction();
        FlightSchedule flightSchedule = new FlightSchedule();
        LocalDateTime createdDateTime = LocalDateTime.now();
        LocalDateTime dueDateTime = createdDateTime.plusHours(2);
        Account account = new Account();
        account.setId(accountId);
        flightSchedule.setId(flightScheduleId);
        transaction.setFlightSchedule(flightSchedule);
        transaction.setAccount(account);
        transaction.setPrice(totalPrice);
        transaction.setStatus(TransactionService.WAITING);
        transaction.setCreatedTime(createdDateTime);
        transaction.setDueTime(dueDateTime);
        return transaction;
    }

    @Override
    public List<Transaction> findOverdueTransaction() {
        return transactionRepository.findOverdueTransaction(LocalDateTime.now());
    }

    @Override
    public List<Transaction> saveAll(List<Transaction> transactions) {
        return transactionRepository.saveAll(transactions);
    }
}
