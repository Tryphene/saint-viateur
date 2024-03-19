package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import com.api.conservatoiresaintviateur.service.ApprenantService;
import com.api.conservatoiresaintviateur.service.PasswordResetServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apprenant")
@AllArgsConstructor
public class ApprenantController {
    private final ApprenantService apprenantService;
    private final PasswordResetServiceImpl passwordResetService;
    private final ApprenantRepository apprenantRepository;

    @PostMapping("/create")
    public Apprenant create(@RequestBody Apprenant apprenant){
        return apprenantService.creer(apprenant);
    }

    @GetMapping("/read")
    public List<Apprenant> read() {
        return apprenantService.findAllByOrderByIdDesc();
    }

    @GetMapping("/by-mail")
    public Apprenant findByMail(@RequestParam String mail) {
        return apprenantService.findByMail(mail);
    }
    @GetMapping("/count")
    public Page<Apprenant> count(Pageable pageable) {
        return apprenantService.findAll(pageable);
    }
    @GetMapping("/exist-mail")
    public Boolean existEmail(@RequestParam String mail) {
        return apprenantService.existsByMail(mail);
    }

    @GetMapping("/exist-mail-mdp")
    public Boolean existsByMailAndMdp(@RequestParam String mail, @RequestParam String mdp) {
        return apprenantService.existsByMailAndMdp(mail, mdp);
    }

    @GetMapping("/get-passwordResetTokenByMail")
    public ResponseEntity<String> getPasswordResetTokenByEmail(@RequestParam String mail) {
        Apprenant apprenant = apprenantRepository.findByMail(mail);
        if(apprenant != null) {
            return ResponseEntity.ok(apprenantService.getPasswordResetTokenByMail(mail));
        } else {
            return ResponseEntity.badRequest().body("Apprenant Introuvable");

        }
        //return apprenantService.getPasswordResetTokenByMail(mail);
    }

    @GetMapping("/get-status")
    public String getStatusByMail(@RequestParam String mail) {
        return apprenantService.getStatusByMail(mail);
    }

    @GetMapping("/get-is-validated-registration")
    public Boolean getIsValidatedRegistrationByMail(@RequestParam String mail) {
        return apprenantService.getIsValidatedRegistrationByMail(mail);
    }
    @GetMapping("/get-frais-inscription")
    public Integer getFraisInscriptionByMail(@RequestParam String mail) {
        return apprenantService.getFraisInscriptionByMail(mail);
    }

    @GetMapping("/count-by-month")
    public ResponseEntity<?> countApprenantByMonth(@RequestParam int month) {
        Long count = apprenantService.countApprenantByDteInscription(month);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/read/{id}")
    public Apprenant findOne(@PathVariable Long id) {
        return apprenantService.getById(id);
    }

    @PutMapping("update/{id}")
    public Apprenant update(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifier(id, apprenant);
    }
    @PutMapping("update-all/{id}")
    public Apprenant updateAll(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierAll(id, apprenant);
    }
    @PutMapping("update/scolarite-acompte/{id}")
    public Apprenant  modifierScolariteAndScolaritePaye(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierScolariteAndScolaritePaye(id, apprenant);
    }

    @PutMapping("update/scolarite/{id}")
    public Apprenant  modifierScolarite(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierScolarite(id, apprenant);
    }
    @PutMapping("update/scolarite-paye/{id}")
    public Apprenant  modifierScolaritePaye(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierScolaritePaye(id, apprenant);
    }

    @PutMapping("update/is-uptodate-echeancier/{id}")
    public Apprenant  modifierIsUpToDateEcheancier(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierIsUpToDateEcheancier(id, apprenant);
    }

    @PutMapping("update/frais-inscription/{id}")
    public Apprenant  modifierFraisInscription(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierFraisInscription(id, apprenant);
    }
    @PutMapping("update/abonnement-expire-time/{id}")
    public Apprenant  AbonnementExpireTime(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierAbonnementExpireTime(id, apprenant);
    }
    @PutMapping("update/mdp/{id}")
    public Apprenant  updateMdp(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierChangeMdp(id, apprenant);
    }

    @PutMapping("update/is-validated-registration/{id}")
    public Apprenant  modifierIsValidatedRegistration(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierIsValidatedRegistration(id, apprenant);
    }

    @GetMapping("/apprenant-for-marque-presence/{id}")
    public ResponseEntity<Apprenant> getProfesseurFormarqueDePresence(@PathVariable Long id) {
        Apprenant apprenant = apprenantService.findApprenantBymarqueDePresenceId(id);
        if (apprenant != null) {
            return ResponseEntity.ok(apprenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/apprenant-for-echeancier/{id}")
    public ResponseEntity<Apprenant> getApprenantForEcheancier(@PathVariable Long id) {
        Apprenant apprenant = apprenantService.findApprenantByApprenantEcheancierId(id);
        if (apprenant != null) {
            return ResponseEntity.ok(apprenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Apprenant> search(@RequestParam(required = false) String query) {
        return apprenantService.findByNomContainingOrPrenomContainingOrMailContaining(query);
    }

    @GetMapping("/apprenant-for-cours/{id}")
    public ResponseEntity<Apprenant> getApprenantForCours(@PathVariable Long id) {
        Apprenant apprenant = apprenantService.findApprenantByParentId(id);
        if (apprenant != null) {
            return ResponseEntity.ok(apprenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("update/status/{id}")
    public Apprenant updateOne(@PathVariable Long id, @RequestBody Apprenant apprenant){
        return apprenantService.modifierOne(id, apprenant);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return apprenantService.supprimer(id);
    }

    @PostMapping("/request-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> requestBody) throws MessagingException {
        String email = requestBody.get("email");
        Apprenant apprenant = apprenantRepository.findByMail(email);
        if(apprenant != null) {
            passwordResetService.requestPasswordReset(email);
            return ResponseEntity.ok("Demande de réinitialisation envoyée.");
        } else {
            return ResponseEntity.badRequest().body("Apprenant Introuvable");

        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        String newPassword = requestBody.get("newPassword");
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Mot de passe réinitialisé avec succès.");
    }

}
