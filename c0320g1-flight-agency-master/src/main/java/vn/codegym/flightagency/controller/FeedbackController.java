package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.model.Feedback;
import vn.codegym.flightagency.service.FeedbackService;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;
    @GetMapping("/admin/feedback-page")
    public ResponseEntity<Page<Feedback>> getAllFeedback(
            @RequestParam(name = "customerName", defaultValue = "") String customerName,
            @RequestParam(name = "createDate", defaultValue = "") String createDate,
            @RequestParam(name = "processStatus", defaultValue = "") String processStatus,
            @RequestParam("page") int page){

        Specification<Feedback> search = feedbackService.getFilter(customerName, createDate, processStatus);
        System.out.println(processStatus instanceof String);
        Page<Feedback> feedbackPages;
        if(search != null){
            feedbackPages = feedbackService.findFeedbackByCriteria(search, page);
        }
        else {
            feedbackPages = feedbackService.findAll(page);
        }
        if(feedbackPages.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(feedbackPages);
    }

    @GetMapping("/admin/feedback-list")
    public ResponseEntity<List<Feedback>> getFeedbackList(){
        List<Feedback> feedbackList;
        feedbackList = feedbackService.findAllFeedback();
        return ResponseEntity.ok(feedbackList);
    }

    @PutMapping("/admin/feedback/{id}")
    private ResponseEntity<Feedback> updateFeedback(@PathVariable("id") long id,@RequestBody Feedback feedback){
        feedback.setProcessStatus(true);
        feedbackService.save(feedback);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<Feedback>(headers, HttpStatus.CREATED);
    }

}
