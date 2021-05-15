package vn.codegym.flightagency.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "airports")
@Getter
@Setter
@NoArgsConstructor
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "airport_id")
    private Long id;

    @Column(name = "airport_code")
    private String code;

    @Column(name = "airport_name")
    private String name;

    @Column(name = "airport_city")
    private String city;
}
