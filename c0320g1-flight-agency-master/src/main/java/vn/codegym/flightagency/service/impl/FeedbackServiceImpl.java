package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Feedback;
import vn.codegym.flightagency.repository.FeedbackRepository;
import vn.codegym.flightagency.service.FeedbackService;
import vn.codegym.flightagency.service.search.FeedbackSpecification;
import vn.codegym.flightagency.service.search.SearchCriteria;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;

//    @Override
//    public Page<Feedback> findAll(Pageable pageable) {
//        return feedbackRepository.findAll(pageable);
//    }

    @Override
    public Page<Feedback> findAll(int page) {
        Pageable pageable = PageRequest.of(page - 1, 4, Sort.by("id"));
        Page<Feedback> feedbacks = feedbackRepository.findAll(pageable);
        return feedbacks;
    }


    @Override
    public Feedback findById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Feedback feedback) {
        feedbackRepository.save(feedback);
    }

    @Override
    public Specification<Feedback> getFilter(String customerName, String createDate, String processStatus) {
        List<FeedbackSpecification> specs = new ArrayList<>();
        Specification<Feedback> spec;
        // search theo
        // customer of name
        if (!"".equals(customerName) && !"undefined".equals(customerName)) {
            specs.add(new FeedbackSpecification(new SearchCriteria("customerName", "like", customerName)));
        }
        // customer of created day
        if (!"".equals(createDate) && !"undefined".equals(createDate)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateTime = LocalDate.parse(createDate, formatter);
            System.out.println(dateTime instanceof LocalDate);
            specs.add(new FeedbackSpecification(new SearchCriteria("createDate", "equal", createDate)));
        }
        if (!"".equals(processStatus) && !"undefined".equals(processStatus)) {
            specs.add(new FeedbackSpecification(new SearchCriteria("processStatus", "equal", processStatus)));
        }
        if (specs.size() != 0) {
            spec = Specification.where(specs.get(0));
            for (int i = 1; i < specs.size(); i++) {
                assert spec != null;
                spec = spec.and(specs.get(i));
            }
            return spec;
        }
        return null;
    }

    @Override
    public Page<Feedback> findFeedbackByCriteria(Specification<Feedback> specs, int page) {
        Pageable pageable = PageRequest.of(page - 1, 4);
        Page<Feedback> feedbackPages = feedbackRepository.findAll(specs, pageable);
        return feedbackPages;
    }

    @Override
    public List<Feedback> findAllFeedback() {
        return feedbackRepository.findAll();
    }
}
