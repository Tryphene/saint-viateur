package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Echeancier;
import com.api.conservatoiresaintviateur.repository.EcheancierRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailSchedulerService {
    private final EmailService emailService;
    private final JavaMailSender javaMailSender;
    private final EcheancierService echeancierService;
    private final EcheancierRepository echeancierRepository;


    public EmailSchedulerService(EmailService emailService, JavaMailSender javaMailSender, EcheancierService echeancierService, EcheancierRepository echeancierRepository) {
        this.emailService = emailService;
        this.javaMailSender = javaMailSender;
        this.echeancierService = echeancierService;
        this.echeancierRepository = echeancierRepository;
    }

    @Scheduled(fixedDelay = 50000) // Planification toutes les 10 secondes (exemple)
    public void scheduleEmailSending() throws MessagingException, ParseException {
        // Vérifiez si la date actuelle correspond à la date d'envoi souhaitée
        LocalDateTime dateActuelle = LocalDateTime.now().withSecond(0).withNano(0);
        System.out.println(dateActuelle);

        //public void sendPaymentReminders() {
            List<Echeancier> echeanciers = echeancierService.getUsersWithUpcomingPayments();

            for (Echeancier echeancier : echeanciers) {
                System.out.println("echeancier");
                System.out.println(echeancier.getDateEcheance());
                LocalDate currentDate = LocalDate.now();
                java.sql.Date sqlDate = java.sql.Date.valueOf(echeancier.getDateEcheance().toString());
                LocalDate dueDate = sqlDate.toLocalDate();
                // Créez une LocalDateTime à partir de la dueDate à minuit (00:00:00)
                LocalDateTime reminderDateTime = dueDate.atStartOfDay();

                // Définissez l'heure et les minutes pour 12:20
                reminderDateTime = reminderDateTime.withHour(21).withMinute(58);

                // Ajoutez deux semaines (14 jours) à la date et l'heure du rappel
                reminderDateTime = reminderDateTime.minusWeeks(2);
                System.out.println("reminderDate");
                System.out.println(reminderDateTime);
                System.out.println(dateActuelle);

            if (dateActuelle.equals(reminderDateTime)) {
                System.out.println("yeah");
                String emailSubject = "Rappel de paiement scolaire";
                String emailText = "Cher " + echeancier.getApprenantEcheancier().getPrenom() + " utilisateur, votre paiement scolaire est dû dans deux semaines. Veuillez effectuer le paiement à temps.";
                //emailService.sendEmail(echeancier.getApprenantEcheancier().getMail(), emailSubject, emailText);

                String emailContent = "<html>\n" +
                        "            <head>\n" +
                        "                <title>Rappel : Date de paiement dans deux semaines</title>\n" +
                        "            </head>\n" +
                        "\n" +
                        "        <body>\n" +
                        "            <p>Cher(e) " + echeancier.getApprenantEcheancier().getPrenom() + " " + echeancier.getApprenantEcheancier().getNom() +",</p>\n" +
                        "            <p>Nous espérons que cette période de l'année universitaire se passe bien pour vous jusqu'à présent.</p>\n" +
                        "            <p>\n" +
                        "                Nous souhaitons vous rappeler que la date de paiement de votre échéance pour le 2ème trimestre approche rapidement. Vous avez maintenant\n" +
                        "                seulement deux semaines avant la date limite de paiement, qui est fixée au " + echeancier.getDateEcheance() + ". Nous vous encourageons à prendre \n" +
                        "                les dispositions nécessaires pour effectuer votre paiement à temps.\n" +
                        "            </p>\n" +
                        "            <p>Voici quelques informations importantes :</p>\n" +
                        "            <ul>\n" +
                        "                <li><strong>Montant dû :</strong> " + echeancier.getMontant() + "</li>\n" +
                        "                <li><strong>Date limite de paiement :</strong> " + echeancier.getDateEcheance() + "</li>\n" +
                        "                <li><strong>Mode de paiement :</strong> Espèce, Mobile money </li>\n" +
                        "            </ul>\n" +
                        "            <p>\n" +
                        "                Un paiement en temps voulu est essentiel pour maintenir votre statut d'apprenant en règle et éviter tout désagrément lié à votre inscription. \n" +
                        "            </p>\n" +
                        "            <p>\n" +
                        "                Si vous avez des questions concernant votre échéance, les modalités de paiement n'hésitez pas à nous contacter \n" +
                        "                à l'adresse suivante : <a href=\"mailto:[Adresse e-mail du service financier]\"> [Adresse e-mail du service financier]</a> ou par \n" +
                        "                téléphone au [Numéro de téléphone du service financier]. Notre équipe est là pour vous aider et répondre à toutes vos\n" +
                        "                préoccupations.\n" +
                        "            </p>\n" +
                        "            <p>\n" +
                        "                Nous vous remercions de votre attention à cette importante échéance. Votre engagement envers votre réussite académique et le respect des \n" +
                        "                délais de paiement sont grandement appréciés.\n" +
                        "            </p>\n" +
                        "            <p>\n" +
                        "                Cordialement,<br>\n" +
                        "                Conservatoire Saint Viaiteur d'Abidjan<br>\n" +
                        "                [Coordonnées de contact]\n" +
                        "            </p>\n" +
                        "        </body>\n" +
                        "        </html>";

                MimeMessage message = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setFrom("konetryphene20@gmail.com");
                helper.setTo(echeancier.getApprenantEcheancier().getMail());
                helper.setSubject("Rappel de paiement scolaire");
                helper.setText(emailContent, true); // Set the second parameter to true to indicate HTML content
                //helper.setText("<b>Hello " + nom + ", </b> <br /><p>Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation du mot de passe pour votre compte.</p><a href='http://localhost:3000/conservatoire-saint-viateur/login/reset-mot-passe-oublie?token=" + token + "'><button style=\"background-color: #B60520; padding: 10px; border-radius: 10px\">Réinitialisation le mot de passe</button></a><br /><p>Ce lien de réinitialisation de mot de passe expirera dans 60 minutes. Si vous n'avez pas demandé de réinitialisation du mot de passe, aucune autre action n'est requise.</p><br /><p>Merci pour votre confiance,</p><br /><p>Conservatoire Saint Viateur</p>", true); // Set the second parameter to true to indicate HTML content
                javaMailSender.send(message);
            }
            }
        //}
    }

    public void sendHtmlEmail(String to, String subject, String nom, String token) throws MessagingException {



    }
}
