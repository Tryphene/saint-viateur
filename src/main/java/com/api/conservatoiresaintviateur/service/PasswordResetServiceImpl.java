package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.NotFoundException;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class PasswordResetServiceImpl {

    private final ApprenantRepository apprenantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final JavaMailSender javaMailSender;

    public PasswordResetServiceImpl(ApprenantRepository apprenantRepository, JavaMailSender mailSender, JavaMailSender javaMailSender) {
        this.apprenantRepository = apprenantRepository;
        this.mailSender = mailSender;
        this.javaMailSender = javaMailSender;
    }

    public void requestPasswordReset(String email) throws MessagingException {
        Optional<Apprenant> apprenantOptional = apprenantRepository.getByMail(email);

        if (apprenantOptional.isPresent()) {
            Apprenant apprenant = apprenantOptional.get();
            String resetToken = generateToken();
            apprenant.setPasswordResetToken(resetToken);
            apprenant.setTokenExpiryDateTime(LocalDateTime.now().plusHours(1));
            apprenantRepository.save(apprenant);

            //sendEmail(apprenant.getMail(), resetToken);
            sendHtmlEmail(apprenant.getMail(), "Réinitialisation de mot de passe", apprenant.getPrenom(), resetToken);
        } else {
            throw new NotFoundException("Apprenant introuvable");
        }
    }

    public void resetPassword(String token, String newPassword) {
        Optional<Apprenant> apprenantOptional = apprenantRepository.findByPasswordResetToken(token);

        if (apprenantOptional.isPresent() && apprenantOptional.get().getTokenExpiryDateTime().isAfter(LocalDateTime.now())) {
            Apprenant apprenant = apprenantOptional.get();
            apprenant.setMdp(this.passwordEncoder.encode(newPassword));
            apprenant.setPasswordResetToken(null);
            apprenant.setTokenExpiryDateTime(null);
            apprenantRepository.save(apprenant);
        } else {
            throw new NotFoundException("Apprenant introuvable ou jeton invalide");
        }
    }


    public void sendEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("konetryphene20@gmail.com");
        message.setTo(to);
        message.setSubject("Réinitialisation de mot de passe");
        message.setText("Bonjour,\n\n" +
                "Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour continuer :\n\n" +
                "Réinitialiser le mot de passe : " + "http://localhost:3000/conservatoire-saint-viateur/login/reset-mot-passe-oublie?token=" + token + "\n\n" +
                "Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.");
        javaMailSender.send(message);
        System.out.println("Message envoyé");
    }

    public void sendHtmlEmail(String to, String subject, String nom, String token) throws MessagingException {


                String emailContent = "<html>\n" +
                "    <head>\n" +
                "        <title>Réinitialisation de mot de passe</title>\n" +
                "        <style>\n" +
                "            /* Inclusion de la police personnalisée */\n" +
                "            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap');\n" +
                "        </style>\n" +
                "    </head>\n" +
                "    <body style=\"font-family: 'Roboto', Arial, sans-serif;\">\n" +
                        "<div tyle=\"background-color: #f3f3f3; padding: 100px 200px; text-align: center;\">" +
                "        <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px; margin: auto; border-collapse: collapse;\">\n" +
                "            <tr>\n" +
                "                <td style=\"background-color: #f3f3f3; padding: 20px; text-align: center;\">\n" +
                "                    <h2 style=\"color: #333;\">Réinitialisation de mot de passe</h2>\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                <td style=\"padding: 20px;\">\n" +
                "                    <p>Bonjour " + nom + ",</p>\n" +
                "                    <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous n'avez pas effectué cette demande, vous pouvez ignorer cet e-mail en toute sécurité.</p>\n" +
                "                    <p>Sinon, vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous :</p>\n" +
                "                    <p style=\"text-align: center;\">\n" +
                "                        <a href=\"http://localhost:3000/conservatoire-saint-viateur/login/reset-mot-passe-oublie?token=" + token + "\" style=\"display: inline-block; background-color: #B60520; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Réinitialiser le mot de passe</a>\n" +
                "                    </p>\n" +
                "                    <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur ou juste cliquer dessus :</p>\n" +
                "                    <p><a href=\"http://localhost:3000/conservatoire-saint-viateur/login/reset-mot-passe-oublie?token=" + token + "\">http://localhost:3000/conservatoire-saint-viateur/login/reset-mot-passe-oublie?token=" + token + "</a></p>\n" +
                "                    <p>Merci,</p>\n" +
                "                    <p>L'équipe de Conservatoire Saint Viateur</p>\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "        </table>\n" +
                        "</div>" +
                "    </body>\n" +
                "</html>";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("konetryphene20@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(emailContent, true); // Set the second parameter to true to indicate HTML content
        //helper.setText("<b>Hello " + nom + ", </b> <br /><p>Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation du mot de passe pour votre compte.</p><a href='http://localhost:3000/conservatoire-saint-viateur/login/reset-mot-passe-oublie?token=" + token + "'><button style=\"background-color: #B60520; padding: 10px; border-radius: 10px\">Réinitialisation le mot de passe</button></a><br /><p>Ce lien de réinitialisation de mot de passe expirera dans 60 minutes. Si vous n'avez pas demandé de réinitialisation du mot de passe, aucune autre action n'est requise.</p><br /><p>Merci pour votre confiance,</p><br /><p>Conservatoire Saint Viateur</p>", true); // Set the second parameter to true to indicate HTML content
        javaMailSender.send(message);
    }

    private String generateToken() {
        byte[] randomBytes = new byte[24];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
