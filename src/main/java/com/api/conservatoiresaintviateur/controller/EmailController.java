package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.EmailRequest;
import com.api.conservatoiresaintviateur.service.EmailContactService;
import com.api.conservatoiresaintviateur.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
public class EmailController {
    private final EmailService emailService;
    private final EmailContactService emailContactService;

    @Autowired
    public EmailController(EmailService emailService, EmailContactService emailContactService) {
        this.emailService = emailService;
        this.emailContactService = emailContactService;
    }

    @PostMapping("/envoie-email")
    public String sendEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
        /*String to = emailRequest.getTo();
        String subject = emailRequest.getSubject();
        String text = emailRequest.getText();

        emailService.sendEmail(to, subject, text);*/

        try {
            emailService.sendEmail(emailRequest.getTo(),  emailRequest.getSubject(), emailRequest.getText());
            return "E-mail envoyé avec succès";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de l'envoi de l'e-mail : " + e.getMessage();
        }
    }
    @PostMapping("/envoie-email-contact")
    public String sendEmailContact(@RequestBody EmailRequest emailRequest) {
        try {
            emailContactService.sendEmailContact(emailRequest.getFrom(), "saintviateur23@gmail.com", emailRequest.getSubject(), emailRequest.getText());
            return "E-mail envoyé avec succès";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de l'envoi de l'e-mail : " + e.getMessage();
        }
    }

}
