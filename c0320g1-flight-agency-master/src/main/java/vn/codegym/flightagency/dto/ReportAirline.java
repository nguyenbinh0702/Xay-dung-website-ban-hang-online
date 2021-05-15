package vn.codegym.flightagency.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "airline_report")
public class ReportAirline {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "branch_name")
    private String name;

    @Column(name = "created_date")
    private LocalDateTime date;

    @Column(name = "Total")
    private Double total;
}
