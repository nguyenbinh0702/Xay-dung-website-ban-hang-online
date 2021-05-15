package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.exception.ViolatedException;
import vn.codegym.flightagency.model.Feedback;
import vn.codegym.flightagency.service.FeedbackService;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class HomeController {

    @Autowired
    private FeedbackService feedbackService;

    // Creator : Cường
    // Method save Feedback entity
    @PostMapping("/home/save-feedback")
    public ResponseEntity<Feedback> saveFeedback(@Valid @RequestBody Feedback feedback, BindingResult bindingResult)
            throws Exception  {
        if (bindingResult.hasFieldErrors()) {
            throw new ViolatedException(bindingResult);
        }
        try {
            feedbackService.save(feedback);
        } catch (Exception ex) {
            throw new Exception("Không thể lưu được đối tượng xuống db, vui lòng kiểm tra tên column trong model");
        }

        return ResponseEntity.ok(feedback);
    }

}
