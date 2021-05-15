package vn.codegym.flightagency.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Creator : Cường
    // Method is used when application throw a instance of ViolatedException
    @ExceptionHandler(ViolatedException.class)
    public ResponseEntity<?> handleViolatedException(ViolatedException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), request.getDescription(false));
        errorDetails.setErrors(ex.getBindingResult().getFieldErrors());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}
