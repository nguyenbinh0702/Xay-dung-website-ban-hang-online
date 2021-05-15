package vn.codegym.flightagency.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
//CRATE BY ANH DUC
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO {
    private HttpStatus status;
    private String message;
    private Object body;

    public ResponseDTO(HttpStatus notFound, String message) {
    }
}
