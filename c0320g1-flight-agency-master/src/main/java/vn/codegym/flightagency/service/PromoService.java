package vn.codegym.flightagency.service;

import org.springframework.data.domain.Pageable;
import vn.codegym.flightagency.model.Promo;

import java.time.LocalDateTime;
import java.util.List;
import vn.codegym.flightagency.dto.PromoUpdateDTO;
import vn.codegym.flightagency.model.Promo;
public interface PromoService {

    public void createNewPromo(Promo promo);

    public List<Promo> getPromoRunningNow(Pageable pageable);

    public List<Promo> getPromoExpired(Pageable pageable);

    public List<Promo> getPromoNotActive(Pageable pageable);

    public LocalDateTime convertDate(String date);
    //Tùng
    Promo findById(Long id);

    void save(Promo promo);

    void delete(Promo promo);
}

