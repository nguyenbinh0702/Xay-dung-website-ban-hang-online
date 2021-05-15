package vn.codegym.flightagency.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.model.TransactionDetail;
import vn.codegym.flightagency.service.TransactionDetailService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class TransactionDetailController {
    @Autowired
    TransactionDetailService transactionDetailService;

    // Thành Long
    @GetMapping("/checkin")
    public ResponseEntity<List<TransactionDetail>> searchTransactionDetail(@RequestParam(name = "id", defaultValue ="") Long id){
        List<TransactionDetail> transactionDetails = transactionDetailService.findByTransactionDetail(id);
        if (transactionDetails.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(transactionDetails);
    }


}
