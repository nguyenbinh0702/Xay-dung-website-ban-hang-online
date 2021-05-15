package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.dto.BookingDTO;
import vn.codegym.flightagency.dto.PassengerInfoDTO;
import vn.codegym.flightagency.model.Passenger;
import vn.codegym.flightagency.model.Transaction;
import vn.codegym.flightagency.model.TransactionDetail;
import vn.codegym.flightagency.repository.TransactionDetailRepository;
import vn.codegym.flightagency.service.EmailService;
import vn.codegym.flightagency.service.PassengerService;
import vn.codegym.flightagency.service.TransactionDetailService;
import vn.codegym.flightagency.service.TransactionService;

import java.util.List;

@Service
public class TransactionDetailServiceImpl implements TransactionDetailService {

    // Creator: Duy
    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    // Creator: Duy
    @Autowired
    private TransactionService transactionService;

    // Creator: Duy
    @Autowired
    private PassengerService passengerService;

    // Creator: Duy
    @Autowired
    private EmailService emailService;

    // Creator: Duy
    @Override
    public void saveTransactionDetail(BookingDTO booking) {
        // transfer to passenger
        // add passenger
        List<Passenger> passengerList = passengerService.addAllPassengers(booking.getDepPassengers());
        Transaction depTransaction = transactionService.createTransaction(booking.getDepFlightId(), booking.getAccountId(), booking.getDepTotalPrice());
        Transaction finalDepTransaction =  transactionService.save(depTransaction);
        passengerList.forEach((val) -> {
            addDetail(finalDepTransaction, val, booking.getDepPassengers());
        });
        emailService.sendBookingCode(finalDepTransaction.getId(), booking.getDepBranch(), booking.getAccountId());
        // if round-trip
        if (booking.getRetFlightId() != 0) {
            passengerList = passengerService.addAllPassengers(booking.getRetPassengers());
            Transaction retTransaction = transactionService.createTransaction(booking.getRetFlightId(), booking.getAccountId(), booking.getRetTotalPrice());
            Transaction finalRetTransaction =  transactionService.save(retTransaction);
            passengerList.forEach((val) -> {
                addDetail(finalRetTransaction, val, booking.getRetPassengers());
            });
            emailService.sendBookingCode(finalRetTransaction.getId(), booking.getRetBranch(), booking.getAccountId());
        }
    }

    // Thành Long
    @Override
    public List<TransactionDetail> findByTransactionDetail(Long id) {
        return transactionDetailRepository.findAllByTransactionIdAndPassenger_CheckinIsFalse(id);
    }

    // Creator: Duy
    private void addDetail(Transaction transaction, Passenger passenger, List<PassengerInfoDTO> baggageInfo) {
        TransactionDetail transactionDetail = new TransactionDetail();
        transactionDetail.setTransaction(transaction);
        transactionDetail.setPassenger(passenger);
        baggageInfo.forEach((val) -> {
            if(val.getFullName().equals(passenger.getFullName())) {
                transactionDetail.setBaggage(getBaggage(val.getBaggagePrice()));
            }
        });
        transactionDetailRepository.save(transactionDetail);
    }

    // Creator: Duy
    private byte getBaggage(int money) {
        switch (money) {
            case 170000:
                return 15;
            case 225000:
                return 20;
            case 275000:
                return 25;
            default:
                return 7;
        }
    }
}
