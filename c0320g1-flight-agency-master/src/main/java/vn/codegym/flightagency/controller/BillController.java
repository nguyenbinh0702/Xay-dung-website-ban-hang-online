package vn.codegym.flightagency.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.SelectDto;
import vn.codegym.flightagency.model.Bill;
import vn.codegym.flightagency.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.model.Bill;
import vn.codegym.flightagency.service.BillService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class BillController {

    @Autowired
    BillService billService;
    // C-Ngan
    @GetMapping("customer/bills/{accountId}")
    public ResponseEntity<Page<Bill>> getBillsByAccountId(@PathVariable Long accountId,
                                                          @RequestParam( name = "page", defaultValue = "0", required = false) int page){
        Page<Bill> bills = billService.getBillsByAccountId(accountId,page);
        if(bills.isEmpty()) return new ResponseEntity<>(bills, HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(bills);


 }
    // C-Ngan
    @GetMapping("customer/bills/search/{accountId}")
    public ResponseEntity<Page<Bill>> getSearchedBillsByAccountId(@PathVariable Long accountId,
                                                                  @RequestParam( name = "page", defaultValue = "0", required = false) int page,
                                                                  @RequestParam( name = "billCode", defaultValue = "", required = false) String billCode,
                                                                  @RequestParam( name = "brand", defaultValue = "", required = false) String brand,
                                                                  @RequestParam( name = "departure", defaultValue = "", required = false) String departure,
                                                                  @RequestParam( name = "arrival", defaultValue = "", required = false) String arrival) {
        Page<Bill> bills = billService.getSearchedBills(accountId, billCode, brand, departure, arrival, page);
        if (bills.isEmpty()) return new ResponseEntity<>(bills, HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("customer/bills/select-info")
    public ResponseEntity<SelectDto> getSelects(){
        return ResponseEntity.ok(this.billService.getSelectDto());
    }

    @GetMapping("customer/bill/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id){
        return ResponseEntity.ok(this.billService.getBillById(id));
    }


    //son
    //Lay danh sach bills
    @GetMapping(path="bills-list")
    public ResponseEntity<Page<Bill>> getBillsListForEmployee(Pageable pageable){
        Page<Bill> billList = billService.findAllBills(pageable);
        if(billList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(billList,HttpStatus.OK);
        }
    };
    @GetMapping(path="bill-search")
    public ResponseEntity<Page<Bill>> searchBillList(@RequestParam(name="billCode",required = false,defaultValue = "") String billCode,
                                                     @RequestParam(name="billTax",required = false,defaultValue = "") String billTax,
                                                     @RequestParam(name="name",required = false,defaultValue = "") String name,
                                                     Pageable pageable) {
        String noParam = "";
        System.out.println(billCode);
        System.out.println(billTax);
        System.out.println(name);
        Page<Bill> resultBill = billService.searchBills(billCode, billTax, name, pageable);
        if(resultBill.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(resultBill,HttpStatus.OK);
        }
    }
}
