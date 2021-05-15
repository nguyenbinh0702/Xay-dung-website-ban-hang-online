package vn.codegym.flightagency.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "full_name", nullable = false)
    @Size(min = 6)
    private String fullName;

    @Column(name = "password", nullable = false)
    @Size(min = 6)
    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Email
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "gender")
    private String gender;

    @Column(name = "avatar_image_url")
    private String avatarImageUrl;

    @Column(name = "customer_rank", columnDefinition = "varchar(255) default 'Thành viên'")
    private String customerRank;

    @Column(name = "role")
    @Pattern(regexp = "^(ROLE_USER|ROLE_EMPLOYEE|ROLE_ADMIN)$")
    private String role;

    @Column(name = "status")
    private boolean status;

    public Account(String email, String password, String role, boolean status,
                   String fullName,LocalDate birthDate,String avatarImageUrl,String gender ) {
        this.email = email;
        this.password =  password;
        this.role = role;
        this.status = status;
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.avatarImageUrl = avatarImageUrl;
        this.gender = gender;
    }
}
