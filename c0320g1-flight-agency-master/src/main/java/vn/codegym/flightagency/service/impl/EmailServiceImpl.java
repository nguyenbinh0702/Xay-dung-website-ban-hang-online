package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.repository.AccountRepository;
import vn.codegym.flightagency.service.AccountService;
import vn.codegym.flightagency.service.EmailService;

import javax.print.DocFlavor;

@Service
public class EmailServiceImpl implements EmailService {

    // Creator: Duy
    @Autowired
    private JavaMailSender javaMailSender;

    // Creator: Duy
    @Autowired
    private AccountRepository accountRepository;
    // Creator: Duy
    @Override
    public void sendBookingCode(Long code, String branch, Long accountId) {
        String sendTo = accountRepository.findById(accountId).get().getEmail();
        StringBuilder text = new StringBuilder();

        // set text
        text.append("Your flight reservation has been successfully confirmed. Please find your e-ticket attached.");

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(sendTo);
        String subject = "[CBG Air] Your " +
                branch +
                " E-ticket - Booking ID " +
                code;
        msg.setSubject(subject);
        msg.setText(text.toString());
        javaMailSender.send(msg);
    }

    //CREATE BY ANH DUC
    @Override
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("CGB Airlines <CGBAirlines@gmail.com>");
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(text);
        javaMailSender.send(msg);
    }
}
