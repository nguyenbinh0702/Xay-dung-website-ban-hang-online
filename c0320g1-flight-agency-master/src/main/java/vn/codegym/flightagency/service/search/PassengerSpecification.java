package vn.codegym.flightagency.service.search;

import org.springframework.data.jpa.domain.Specification;
import vn.codegym.flightagency.model.Passenger;

import javax.persistence.criteria.*;

// Thành Long
public class PassengerSpecification implements Specification<Passenger> {
    private final SearchCriteria criteria;

    public PassengerSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }
    @Override
    public Predicate toPredicate(Root<Passenger> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if(criteria.getOperation().equalsIgnoreCase("like")) {
            // value like %chuỗi_tìm_kiếm%
            return criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValues().get(0) + "%");
        }else {
            return null;
        }
    }
}
