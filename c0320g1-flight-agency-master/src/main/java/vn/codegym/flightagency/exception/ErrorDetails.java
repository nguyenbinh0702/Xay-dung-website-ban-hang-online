package vn.codegym.flightagency.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.FieldError;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class ErrorDetails {

    private Date timestamp;
    private String message;
    private String details;
    private Map<String, String> errors;

    public ErrorDetails(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    public ErrorDetails(Date timestamp, String details) {
        this.timestamp = timestamp;
        this.details = details;
    }

    public void setErrors(List<FieldError> errorList) {
        HashMap<String,String> errorMap = new HashMap<>();
        errorList.forEach(fieldError -> {
            errorMap.put(fieldError.getField(),fieldError.getDefaultMessage());
        });
        this.errors = errorMap;
    }


}
