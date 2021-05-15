package vn.codegym.flightagency.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "price_report")
public class ReportPrice {
    //Thành

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column
//    private Long id;
    @Id
    @Column(name = "created_date")
    private LocalDateTime date;

    @Column(name = "total")
    private Double total;
}
