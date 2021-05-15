package vn.codegym.flightagency.service.impl;

import javassist.NotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.codegym.flightagency.dto.SelectDto;
import vn.codegym.flightagency.model.*;
import vn.codegym.flightagency.repository.AirportRepository;
import vn.codegym.flightagency.repository.BillRepository;
import vn.codegym.flightagency.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Bill;
import vn.codegym.flightagency.repository.BillRepository;
import vn.codegym.flightagency.service.BillService;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;



@Service
public class BillServiceImpl implements BillService {

    @Autowired
    BillRepository billRepository;
    @Autowired
    AirportRepository airportRepository;
    @Autowired
    BrandRepository brandRepository;
    Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
    Pageable pageable = PageRequest.of(0,2, sort);

    // C-Ngan
    @Override
    public Page<Bill> getBillsByAccountId(Long accountId, int currentPage) {
        if(currentPage > 0 ) {
            Pageable pageable = PageRequest.of(--currentPage, 4, sort);
            return billRepository.findByTransaction_Account_Id(accountId, pageable);
        }
        return billRepository.findByTransaction_Account_Id(accountId, pageable);
    }
    // C-Ngan
    @Override
    public Page<Bill> getSearchedBills(Long accountId, String billCode, String brand, String departure, String arrival, int page) {
        Specification<Bill> bills = new Specification<Bill>() {
            @Override
            public Predicate toPredicate(Root<Bill> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> list = new ArrayList<Predicate>();

                list.add(criteriaBuilder.equal(root.get("transaction").get("account").get("id"), accountId));
                if(StringUtils.isNotBlank(billCode)){
                    list.add(criteriaBuilder.equal(root.get("billCode").as(String.class), billCode));
                }
                if(StringUtils.isNotBlank(brand)){
                    list.add(criteriaBuilder.equal(root.get("transaction").get("flightSchedule").get("branch").get("name"), brand));
                }
                if(StringUtils.isNotBlank(departure)){
                    list.add(criteriaBuilder.equal(root.get("transaction").get("flightSchedule").get("departureAirport").get("name"), departure));
                }
                if(StringUtils.isNotBlank(arrival)){
                    list.add(criteriaBuilder.equal(root.get("transaction").get("flightSchedule").get("departureAirport").get("name"), arrival));
                }

                Predicate[] p = new Predicate[list.size()];
                return criteriaBuilder.and(list.toArray(p));
            }
        };
        if(page> 0){
            Pageable pageable = PageRequest.of(--page, 2, sort);
            return billRepository.findAll(bills, pageable);
        }
        return billRepository.findAll(bills, pageable);
    }
    // C-Ngan
    @Override
    public SelectDto getSelectDto() {
        List<Airport> airports = airportRepository.findAll();
        List<Branch> branchList = brandRepository.findAll();
        return new SelectDto(airports,branchList);

}

    @Override
    public Bill getBillById(Long id) {
        return billRepository.findById(id).orElseThrow(RuntimeException::new);
    }



    @Override
    public Page<Bill> findAllBills(Pageable pageable) {
        return billRepository.findAll(pageable);
    }

    @Override
    public Page<Bill> findBillByBillsCode(Pageable pageable, String billCode) {
        return billRepository.findBillsByBillCode(pageable,billCode);
    }

    @Override
    public Page<Bill> searchBills(String billCode, String billTax, String name, Pageable pageable) {
        if(billCode.equals("") && billTax.equals("")){
            return billRepository.findByTransaction_Account_FullNameContaining(name,pageable);
        } else if (billCode.equals("") && name.equals("")){
            return billRepository.findByTaxCodeIs(billTax,pageable);
        } else if (billTax.equals("") && name.equals("")) {
            return billRepository.findByBillCodeIs(billCode,pageable);
        } else if (!billCode.equals("") && !billTax.equals("")){
            return  billRepository.findByBillCodeIsAndTaxCodeIsOrTransaction_Account_FullNameContaining(billCode,billTax,name,pageable);
        } else if (!billCode.equals("")) {
            return billRepository.findByBillCodeIsAndTaxCodeIsAndTransaction_Account_FullNameContaining(billCode,billTax,name,pageable);
        }
        return billRepository.findByBillCodeIsOrTaxCodeIsOrTransaction_Account_FullNameContaining(billCode,billTax,name,pageable);
    }
}
