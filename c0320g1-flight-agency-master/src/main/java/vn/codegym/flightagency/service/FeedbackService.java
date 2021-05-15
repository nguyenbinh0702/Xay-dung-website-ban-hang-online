package vn.codegym.flightagency.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.codegym.flightagency.model.Feedback;

import java.util.List;

public interface FeedbackService {
    Page<Feedback> findAll(int page);
    Feedback findById(Long id);
    void save(Feedback feedback);
    Specification<Feedback> getFilter(String customerName, String createDate, String processStatus);
    Page<Feedback> findFeedbackByCriteria(Specification<Feedback> spec, int page);

    List<Feedback> findAllFeedback();
}
