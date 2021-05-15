package vn.codegym.flightagency.service.search;


import org.springframework.data.jpa.domain.Specification;
import vn.codegym.flightagency.model.Feedback;

import javax.persistence.criteria.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class FeedbackSpecification implements Specification<Feedback> {

    private final SearchCriteria criteria;

    public FeedbackSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Feedback> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (criteria.getOperation().equalsIgnoreCase("like")) {
            // value like %chuỗi_tìm_kiếm%
            return criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValues().get(0) + "%");
        } else if (criteria.getOperation().equalsIgnoreCase("equal")) {
            Boolean _processStatus = Boolean.valueOf(criteria.getValues().get(0));
            return criteriaBuilder.equal(root.get(criteria.getKey()), _processStatus);
        } else if (criteria.getOperation().equalsIgnoreCase("equal")) {
            LocalDate _createDate = LocalDate.parse(criteria.getValues().get(0));
            System.out.println(_createDate instanceof LocalDate);
            return criteriaBuilder.equal(root.get(criteria.getKey()), _createDate);
        } else {
            return null;
        }




    }
}
