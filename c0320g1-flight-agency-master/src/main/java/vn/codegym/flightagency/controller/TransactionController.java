package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.BookingDTO;
import vn.codegym.flightagency.exception.ViolatedException;
import vn.codegym.flightagency.model.Transaction;
import vn.codegym.flightagency.model.TransactionDetail;
import vn.codegym.flightagency.repository.TransactionRepository;
import vn.codegym.flightagency.service.TransactionDetailService;
import vn.codegym.flightagency.service.TransactionService;

import java.util.List;

@RestController
@RequestMapping ("/api/v1")
@CrossOrigin(origins = "http://localhost:4200" , allowedHeaders = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    private TransactionDetailService transactionDetailService;

    // C-Ngan
    @GetMapping("customer/transactions/{accountId}")
    public ResponseEntity<Page<Transaction>> getTransactionsByAccountId(@PathVariable Long accountId,
                                                                        @RequestParam(name = "page", defaultValue = "0", required = false) int page) {
        System.out.println(page);
        Page<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId, page);
        if (transactions.isEmpty()) return new ResponseEntity<Page<Transaction>>(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(transactions);
    }

    // Creator: Duy
    // Find flight schedule
    @PostMapping("/transaction/booking")
    public ResponseEntity<?> makeBooking(@RequestBody BookingDTO booking)
            throws ViolatedException {
        transactionDetailService.saveTransactionDetail(booking);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Created by Toàn
    @GetMapping(path = "/transaction/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionService.findById(id);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // Created by Toàn
    @GetMapping(path = "/transaction/{id}/details")
    public ResponseEntity<List<TransactionDetail>> getTransactionDetails(@PathVariable Long id) {
        List<TransactionDetail> details = transactionService.findTransactionDetails(id);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // Created by Toàn
    @GetMapping(path = "/transaction/unpaid/{accountId}")
    public ResponseEntity<List<Transaction>> getUnpaidTransaction(@PathVariable Long accountId) {
        List<Transaction> transactions = transactionService.findUnpaidTransactionByAccount(accountId);
        if (transactions != null) {
            return ResponseEntity.ok(transactions);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // Created by Toàn
    @PatchMapping(path = "/transaction/{id}/pay")
    public ResponseEntity<Transaction> payTransaction(
            @PathVariable Long id, @RequestParam(defaultValue = "") String taxCode) {
        Transaction transaction = transactionService.payTransaction(id, taxCode);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Created by Toàn
    @PatchMapping(path = "/transaction/pay-list")
    public ResponseEntity<List<Transaction>> payTransactions(@RequestBody List<Long> ids,
                                                             @RequestParam(defaultValue = "") String taxCode) {
        List<Transaction> transactions = transactionService.payTransactions(ids, taxCode);
        if (transactions != null) {
            return ResponseEntity.ok(transactions);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Created by Toàn
    @GetMapping(path = "/transaction/find-reservation")
    public ResponseEntity<Transaction> findByIdAndPhone(@RequestParam Long id, @RequestParam String phone) {
        Transaction transaction = transactionService.findByIdAndPhone(id, phone);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // Created by Toàn
    @PatchMapping(path = "/transaction/{id}/cancel")
    public ResponseEntity<Transaction> cancelTransaction(@PathVariable Long id) {
        Transaction transaction = transactionService.cancelTransaction(id);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
