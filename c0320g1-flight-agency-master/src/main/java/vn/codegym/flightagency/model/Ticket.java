package vn.codegym.flightagency.model;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "departure")
    @NotNull(message = "khong duoc de trong")
    private String departure;

    @Column(name = "destination")
    @NotNull(message = "khong duoc de trong")
    private String destination;

    @Column(name = "departure_time")
    @NotNull(message = "khong duoc de trong")
    private LocalDateTime departureTime;


    @Column(name = "arrival_time")
    @NotNull(message = "khong duoc de trong")
    private LocalDateTime arrivalTime;

    @Column(name = "booking_code")
    @NotNull(message = "khong duoc de trong")
    private String bookingCode;

    @Column(name = "airline")
    @NotNull(message = "khong duoc de trong")
    private String airline;

    @Column(name = "type_ticket")
    @NotNull(message = "khong duoc de trong")
    private String typeTicket;

    @Column(name = "chair")
    @NotNull(message = "khong duoc de trong")
    private String chair;

    @Column(name = "price")
    @NotNull(message = "khong duoc de trong")
    @Min(value = 0)
    private Double price;

    @Column(name = "taxes_and_fees")
    @Min(value = 0)
    private Double taxesAndFees;

    @Column(name = "type_customer")
    @NotNull(message = "khong duoc de trong")
    private String typeCustomer;

    @Column(name = "name_customer")
    @Pattern(regexp = "(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)|(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)|(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)|(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)")
    private String name;

    @Column(name = "email")
    @Pattern(regexp = "^[\\w]+[\\@][a-z]+[\\.][a-z]+$")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    @Length(min = 9)
    private String phone;

    @Column(name = "extra_luggage")
    @Min(value = 0)
    private String extraLuggage;


    public Ticket() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDepature(String deprature) {
        this.departure = departure;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepatureTtime(LocalDateTime departureTtime) {
        this.departureTime = departureTtime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getTypeTicket() {
        return typeTicket;
    }

    public void setTypeTicket(String typeTicket) {
        this.typeTicket = typeTicket;
    }

    public String getChair() {
        return chair;
    }

    public void setChair(String chair) {
        this.chair = chair;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getTaxesAndFees() {
        return taxesAndFees;
    }

    public void setTaxesAndFees(Double taxesAndFees) {
        this.taxesAndFees = taxesAndFees;
    }

    public String getTypeCustomer() {
        return typeCustomer;
    }

    public void setTypeCustomer(String typeCustomer) {
        this.typeCustomer = typeCustomer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getExtraLuggage() {
        return extraLuggage;
    }

    public void setExtraLuggage(String extraLuggage) {
        this.extraLuggage = extraLuggage;
    }
}
