package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ApprenantServiceImpl implements ApprenantService {

    private final ApprenantRepository apprenantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Apprenant creer(Apprenant apprenant) {
        apprenant.setMdp(this.passwordEncoder.encode(apprenant.getMdp()));
        return apprenantRepository.save(apprenant);
    }

    @Override
    public List<Apprenant> lire() {
        return apprenantRepository.findAll();
    }

    @Override
    public Boolean getIsValidatedRegistrationByMail(String mail) {
        return apprenantRepository.getIsValidatedRegistrationByMail(mail);
    }

    @Override
    public Boolean getIsUpToDateEcheancierByMail(String mail) {
        return apprenantRepository.getIsUpToDateEcheancierByMail(mail);
    }

    @Override
    public Integer getFraisInscriptionByMail(String mail) {
        return apprenantRepository.getFraisInscriptionByMail(mail);
    }

    @Override
    public List<Apprenant> findAllByOrderByIdDesc() {
        return apprenantRepository.findAllByOrderByIdDesc();
    }

    @Override
    public List<Apprenant> findByNomContainingOrPrenomContainingOrMailContaining(String query) {
        if (query == "" || query.isEmpty()) {
            return apprenantRepository.findAllByOrderByIdDesc();
        } else {
            return apprenantRepository.findByNomContainingOrPrenomContainingOrMailContaining(query, query, query);
        }
    }

    @Override
    public Optional<Apprenant> getByMail(String email) {
        return apprenantRepository.getByMail(email);
    }

    @Override
    public Optional<Apprenant> findByPasswordResetToken(String token) {
        return apprenantRepository.findByPasswordResetToken(token);
    }

    @Override
    public boolean existsByMail(String mail) {
        return apprenantRepository.existsByMail(mail);
    }

    @Override
    public boolean existsByMailAndMdp(String mail, String mdp) {
        String encodedMdp = apprenantRepository.getMdpByMail(mail);
        return passwordEncoder.matches(mdp, encodedMdp);
    }

    @Override
    public String getPasswordResetTokenByMail(String mail) {
        return apprenantRepository.getPasswordResetTokenByMail(mail);
    }

    @Override
    public Apprenant getById(Long id) {
        return apprenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Apprenant introuvable pour l'ID : " + id));
    }

    @Override
    public Apprenant findByMail(String mail) {
        return apprenantRepository.findByMail(mail);
    }

    @Override
    public Page<Apprenant> findAll(Pageable pageable) {
        return apprenantRepository.findAll(pageable);
    }

    @Override
    public Apprenant modifier(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setNom(apprenant.getNom());
                    p.setPrenom(apprenant.getPrenom());
                    p.setProfession(apprenant.getProfession());
                    p.setNvScolaire(apprenant.getNvScolaire());
                    p.setDteNaissance(apprenant.getDteNaissance());
                    p.setLieuNaissance(apprenant.getLieuNaissance());
                    p.setMail(apprenant.getMail());
                    //p.setMdp(this.passwordEncoder.encode(apprenant.getMdp()));
                    p.setTelephoneDomicile(apprenant.getTelephoneDomicile());
                    p.setTelephoneMobile(apprenant.getTelephoneMobile());
                    p.setStatus(apprenant.getStatus());
                    p.setScolarite(apprenant.getScolarite());
                    p.setScolaritePayé(apprenant.getScolaritePayé());
                    p.setTestIsChecked(apprenant.getTestIsChecked());
                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    p.setCoursList(apprenant.getCoursList());
                    p.setMarqueDePresenceList(apprenant.getMarqueDePresenceList());
                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }
    @Override
    public Apprenant modifierAll(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setNom(apprenant.getNom());
                    p.setPrenom(apprenant.getPrenom());
                    p.setProfession(apprenant.getProfession());
                    p.setNvScolaire(apprenant.getNvScolaire());
                    p.setDteNaissance(apprenant.getDteNaissance());
                    p.setLieuNaissance(apprenant.getLieuNaissance());
                    p.setMail(apprenant.getMail());
                    p.setMdp(this.passwordEncoder.encode(apprenant.getMdp()));
                    p.setTelephoneDomicile(apprenant.getTelephoneDomicile());
                    p.setTelephoneMobile(apprenant.getTelephoneMobile());
                    p.setStatus(apprenant.getStatus());
                    p.setScolarite(apprenant.getScolarite());
                    p.setScolaritePayé(apprenant.getScolaritePayé());
                    p.setTestIsChecked(apprenant.getTestIsChecked());
                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    p.setCoursList(apprenant.getCoursList());
                    p.setMarqueDePresenceList(apprenant.getMarqueDePresenceList());
                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierOne(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setStatus(apprenant.getStatus());
                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierChangeMdp(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setChangeMdp(apprenant.getChangeMdp());
                    p.setMdp(this.passwordEncoder.encode(apprenant.getMdp()));
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant findApprenantByApprenantEcheancierId(Long id) {
        return apprenantRepository.findApprenantByApprenantEcheancierId(id);
    }

    @Override
    public Apprenant findApprenantByParentId(Long id) {
        return apprenantRepository.findApprenantByParentId(id);
    }

    @Override
    public Apprenant findApprenantBymarqueDePresenceId(Long id) {
        return apprenantRepository.findApprenantBymarqueDePresenceId(id);
    }

    @Override
    public Apprenant modifierScolariteAndScolaritePaye(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setScolarite(apprenant.getScolarite());
                    p.setScolaritePayé(apprenant.getScolaritePayé());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierScolaritePaye(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setScolaritePayé(apprenant.getScolaritePayé());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierScolarite(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setScolarite(apprenant.getScolarite());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierIsUpToDateEcheancier(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setIsUpToDateEcheancier(apprenant.getIsUpToDateEcheancier());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierIsValidatedRegistration(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setIsValidatedRegistration(apprenant.getIsValidatedRegistration());
                    p.setAbonnementExpiryDate(apprenant.getAbonnementExpiryDate());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierFraisInscription(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setFraisInscription(apprenant.getFraisInscription());

                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Apprenant modifierAbonnementExpireTime(Long id, Apprenant apprenant) {
        return apprenantRepository.findById(id)
                .map(p -> {
                    p.setAbonnementExpiryDate(apprenant.getAbonnementExpiryDate());
                    p.setUpdated_at(apprenant.getUpdated_at());
                    p.setUpdated_by(apprenant.getUpdated_by());
                    return apprenantRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Long countApprenantByDteInscription(int month) {
        return apprenantRepository.countApprenantByDteInscription(month);
    }

    @Override
    public String getStatusByMail(String mail) {
        return apprenantRepository.getStatusByMail(mail);
    }

    @Override
    public String getMdpByMail(String mail) {
        return apprenantRepository.getMdpByMail(mail);
    }

    @Override
    public String supprimer(Long id) {
        apprenantRepository.deleteById(id);
        return "Apprenant supprimé";
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Apprenant user = apprenantRepository.findByMail(mail);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getMail(),
                user.getMdp(),
                new ArrayList<>()
        );
    }
}
