package vn.codegym.flightagency.service;

import vn.codegym.flightagency.dto.ReportAirline;
import vn.codegym.flightagency.dto.ReportPrice;
import vn.codegym.flightagency.dto.ReportPriceDTO;
import vn.codegym.flightagency.model.Transaction;

import java.time.LocalDate;
import java.util.List;

public interface ReportPriceService {
    // Thành
    List<ReportPrice> findAllTransaction(ReportPriceDTO reportPriceDTO);

    List<ReportAirline> findAllTransactionByAirline(ReportPriceDTO reportPriceDTO);
}
