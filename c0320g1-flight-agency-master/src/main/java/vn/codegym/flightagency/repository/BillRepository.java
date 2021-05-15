package vn.codegym.flightagency.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.codegym.flightagency.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Long>, JpaSpecificationExecutor<Bill> {
    Page<Bill> findByTransaction_Account_Id(Long accountId, Pageable pageable);
    Page<Bill> findBillsByBillCode(Pageable pageable, String billCode);
    Page<Bill> findByBillCodeIsOrTaxCodeIsOrTransaction_Account_FullNameContaining(String billCode, String billTax, String name, Pageable pageable);
    Page<Bill> findByTransaction_Account_FullNameContaining(String name, Pageable pageable);
    Page<Bill> findByTaxCodeIs(String billTax,Pageable pageable);
    Page<Bill> findByBillCodeIs(String billCode,Pageable pageable);
    Page<Bill> findByBillCodeIsAndTaxCodeIsOrTransaction_Account_FullNameContaining(String billCode, String billTax, String name, Pageable pageable);
    Page<Bill> findByBillCodeIsAndTransaction_Account_FullNameContaining(String billCode, String name, Pageable pageable);

    Page<Bill> findByBillCodeIsAndTaxCodeIsAndTransaction_Account_FullNameContaining(String billCode,String billTax,String name,Pageable pageable);
}


