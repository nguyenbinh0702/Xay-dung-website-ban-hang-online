package vn.codegym.flightagency.dto;
import lombok.Data;
import java.util.List;

//BHung
@Data
public class TransactionPassengerDTO {
    private List<EmployeeTransactionDTO> transactions;
    private List<EmployeePassengerDTO> passengers;
}
