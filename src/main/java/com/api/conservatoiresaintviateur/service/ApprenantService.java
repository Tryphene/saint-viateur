package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;


public interface ApprenantService extends UserDetailsService {
    Apprenant creer(Apprenant apprenant);

    List<Apprenant> lire();

    Boolean getIsValidatedRegistrationByMail(@Param("mail") String mail);
    Boolean getIsUpToDateEcheancierByMail(@Param("mail") String mail);
    Integer getFraisInscriptionByMail(@Param("mail") String mail);
    public Apprenant modifierAll(Long id, Apprenant apprenant);
    List<Apprenant> findAllByOrderByIdDesc();
    List<Apprenant> findByNomContainingOrPrenomContainingOrMailContaining(String recherche);
    Optional<Apprenant> getByMail(String email);

    Optional<Apprenant> findByPasswordResetToken(String token);
    boolean existsByMail(String mail);

    boolean existsByMailAndMdp(String mail, String mdp);

    String getPasswordResetTokenByMail(@Param("mail") String mail);

    Apprenant getById(Long id);
    Apprenant findByMail(String mail);
    Page<Apprenant> findAll(Pageable pageable);
    Apprenant modifier(Long id, Apprenant apprenant);
    Apprenant modifierOne(Long id, Apprenant apprenant);
    Apprenant modifierChangeMdp(Long id, Apprenant apprenant);
    Apprenant findApprenantByApprenantEcheancierId(Long id);

    Apprenant findApprenantByParentId(Long id);
    Apprenant findApprenantBymarqueDePresenceId(Long id);
    Apprenant modifierScolariteAndScolaritePaye(Long id, Apprenant apprenant);
    Apprenant modifierScolaritePaye(Long id, Apprenant apprenant);
    Apprenant modifierScolarite(Long id, Apprenant apprenant);
    Apprenant modifierIsUpToDateEcheancier(Long id, Apprenant apprenant);
    Apprenant modifierIsValidatedRegistration(Long id, Apprenant apprenant);
    Apprenant modifierFraisInscription(Long id, Apprenant apprenant);
    Apprenant modifierAbonnementExpireTime(Long id, Apprenant apprenant);
    Long countApprenantByDteInscription(@Param("month") int month);
    String getStatusByMail(@Param("mail") String mail);
    String getMdpByMail(@Param("mail") String mail);
    String supprimer(Long id);
}
