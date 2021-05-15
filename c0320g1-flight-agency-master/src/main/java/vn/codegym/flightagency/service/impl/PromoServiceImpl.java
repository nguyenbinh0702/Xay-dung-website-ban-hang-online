package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Promo;
import vn.codegym.flightagency.dto.PromoUpdateDTO;
import vn.codegym.flightagency.model.Promo;
import vn.codegym.flightagency.repository.PromoRepository;
import vn.codegym.flightagency.service.PromoService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PromoServiceImpl implements PromoService {
    LocalDateTime timeNow = LocalDateTime.now();

    @Autowired
    private PromoRepository promoRepository;

    @Override
    public void createNewPromo(Promo promo) {
        promoRepository.save(promo);
    }

    @Override
    public List<Promo> getPromoRunningNow(Pageable pageable) {
        return promoRepository.getPromoRunningNow(this.timeNow, pageable);
    }

    @Override
    public List<Promo> getPromoExpired(Pageable pageable) {
        return promoRepository.getPromoExpired(this.timeNow, pageable);
    }

    @Override
    public List<Promo> getPromoNotActive(Pageable pageable) {
        return promoRepository.getPromoNotActive(this.timeNow, pageable);
    }

    @Override
    public LocalDateTime convertDate(String date) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, dateFormatter);
        LocalDateTime localDateTime = localDate.atStartOfDay();
        return localDateTime;
    }

    //Tùng
    @Override
    public Promo findById(Long id) {
        return promoRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Promo promo) {
        promoRepository.save(promo);
    }

    @Override
    public void delete(Promo promo) {
        promo.setDelete(false);
        promoRepository.save(promo);
    }

}
