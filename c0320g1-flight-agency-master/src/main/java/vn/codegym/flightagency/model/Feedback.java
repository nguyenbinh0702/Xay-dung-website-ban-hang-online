package vn.codegym.flightagency.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="feedback_id")
    private Long id;

    @NotBlank(message = "Chủ đề không được để trống !")
    @Pattern(regexp = "^(cảm ơn|góp ý|khiếu nại|khác)$",message = "Không đúng tên chủ đề !")
    @Column(name="feedback_topic")
    private String topic;

    @NotBlank(message = "Tên người gửi không được để trống !")
    @Pattern(regexp = "^[ a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$",
    message = "Tên người gửi không hợp lệ !")
    @Column(name="feedback_customer_name")
    private String customerName;

    @NotBlank(message = "Số điện thoại không được để trống !")
    @Pattern(regexp = "^0[35789]\\d{8}$",message = "Số điện thoại không hợp lệ !")
    @Column(name="feedback_customer_phone")
    private String customerPhone;

    @NotBlank(message = "Email không được để trống !")
    @Pattern(regexp = "^[A-Za-z0-9]+@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)$",message = "Email không hợp lệ !")
    @Column(name ="feedback_customer_email")
    private String customerEmail;

    @NotBlank(message = "Nội dung không được để trống !")
    @Column(name ="feedback_content")
    private String content;

    @Column(name = "feedback_create_date")
    private LocalDate createDate = LocalDate.now();

    @Column(name = "feedback_process_status")
    private Boolean processStatus = Boolean.FALSE;

    @Column(name = "feedback_response_content")
    private String responseContent;

}

