package vn.codegym.flightagency.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity
@Table(name = "promo")
@Getter
@Setter
@NoArgsConstructor
public class Promo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name_promo", nullable = false)
    @NotNull(message = "Vui lòng không bỏ trống mục chủ đề của KM")
    @Pattern(regexp = "^[ 0-9A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ,]{3,}$", message = "Vui lòng chỉ nhập chữ cái và số")
    private String namePromo;

    @ManyToOne
    @JoinColumn(name = "airline", nullable = false) //hãng hàng không
    @NotNull(message = "Vui lòng không bỏ trống mục hãng bay")
    private Branch airline;

    @ManyToOne
    @JoinColumn(name = "departure_place", nullable = false)
    @NotNull(message = "Vui lòng không bỏ trống mục điểm đi")
    private Airport departurePlace;

    @ManyToOne
    @JoinColumn(name = "arrival_place", nullable = false)
    @NotNull(message = "Vui lòng không bỏ trống mục điểm đến")
    private Airport arrivalPlace;

    @Column(name = "discount", nullable = false)
    @Min(value = 0, message = "Vui lòng nhập số từ 0-1")
    @Max(value = 1, message = "Vui lòng nhập số từ 0-1")
    @NotNull(message = "Vui lòng không bỏ trống mục giảm giá")
    private Double discount;

    @Column(name = "promo_date_start", nullable = false) //ngày bắt đầu chạy khuyến mãi
    @NotNull(message = "Vui lòng không bỏ trống mục ngày hiển thị của KM")
    private LocalDateTime promoDateStart;

    @Column(name = "promo_date_end", nullable = false) //ngày cuối cùng chạy khuyến mãi
    @NotNull(message = "Vui lòng không bỏ trống mục ngày hiển thị của KM")
    private LocalDateTime promoDateEnd;

    @Column(name = "flight_departure_date_start", nullable = false) //ngày bay bắt đầu được giảm giá
    @NotNull(message = "Vui lòng không bỏ trống mục ngày bay bắt đầu được áp dụng KM")
    private LocalDateTime flightDepartureDateStart;

    @Column(name = "flight_departure_date_end", nullable = false) //ngày bay cuối cùng được giảm giá
    @NotNull(message = "Vui lòng không bỏ trống mục ngày bay bắt đầu được áp dụng KM")
    private LocalDateTime flightDepartureDateEnd;

    @Column(name = "is_delete", nullable = false)
    @NotNull(message = "Vui lòng không bỏ trống mục delete")
    private boolean isDelete;
}
