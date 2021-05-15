package vn.codegym.flightagency.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "transaction_details")
@Getter
@Setter
@NoArgsConstructor
public class TransactionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private Passenger passenger;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    @JsonIgnoreProperties("transactionDetails")
    private Transaction transaction;

    @Column(name = "transaction_detail_baggage")
    private byte baggage;
}
