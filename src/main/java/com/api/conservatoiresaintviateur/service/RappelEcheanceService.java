package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Echeancier;
import com.api.conservatoiresaintviateur.repository.EcheancierRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;

@Service
public class RappelEcheanceService {
    private final EmailService emailService;
    private final EcheancierService echeancierService;
    private final EcheancierRepository echeancierRepository;

    public RappelEcheanceService(EmailService emailService, EcheancierService echeancierService, EcheancierRepository echeancierRepository) {
        this.emailService = emailService;
        this.echeancierService = echeancierService;
        this.echeancierRepository = echeancierRepository;
    }

    @Scheduled(cron = "0 0 0 * * ?") // Exécution quotidienne à minuit
    //@Scheduled(fixedDelay = 50000)
    public void sendPaymentReminders() throws ParseException {
        List<Echeancier> echeanciers = echeancierService.getUsersWithUpcomingPayments();


        for (Echeancier echeancier : echeanciers) {
            System.out.println("echeancier");
            System.out.println(echeancier);
            LocalDate currentDate = LocalDate.now();
            Date sqlDate = Date.valueOf(echeancier.getDatePaiement().toString());
            LocalDate dueDate = sqlDate.toLocalDate();
            LocalDate reminderDate = dueDate.minusWeeks(2); // Deux semaines avant la date d'échéance

            /*if (currentDate.equals(reminderDate)) {
                String emailSubject = "Rappel de paiement scolaire";
                String emailText = "Cher utilisateur, votre paiement scolaire est dû dans deux semaines. Veuillez effectuer le paiement à temps.";
                emailService.sendEmail(user.getEmail(), emailSubject, emailText);
            }*/
        }
    }
}
