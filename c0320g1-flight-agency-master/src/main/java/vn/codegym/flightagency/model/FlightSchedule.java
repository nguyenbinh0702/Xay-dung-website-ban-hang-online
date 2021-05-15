package vn.codegym.flightagency.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "flight_schedules")
@Getter
@Setter
@NoArgsConstructor
public class FlightSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "departure_airport_id")
    private Airport departureAirport;

    @Column(name = "departure_time")
    private LocalDateTime departureDateTime;

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id")
    private Airport arrivalAirport;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalDateTime;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(name = "flight_code")
    private String flightCode;

    @Column(name = "flight_capacity")
    private Integer flightCapacity;

    @Column(name = "price")
    private Double price;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "flightSchedule")
    @JsonIgnore
    private List<Transaction> transactions;

    @Column(name = "discount")
    @Min(0)
    @Max(1)
    private Double discount;
}
