package vn.codegym.flightagency.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_schedule_id", nullable = false)
    private FlightSchedule flightSchedule;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(name = "price")
    private Double price;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "due_time")
    private LocalDateTime dueTime;

    @Column(name = "status")
    private String status;

    //BHung
    @OneToMany(mappedBy = "transaction")
    @JsonIgnoreProperties("transaction")
    private List<TransactionDetail> transactionDetails;

}
