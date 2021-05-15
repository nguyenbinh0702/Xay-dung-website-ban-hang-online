package vn.codegym.flightagency.service;

public interface EmailService {
    // Creator: Duy
    void sendBookingCode(Long code, String branch, Long accountId);

    //CREATE BY ANH DUC
    void sendSimpleMessage(String to, String subject, String text);
}
