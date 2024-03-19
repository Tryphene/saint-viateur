package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.CoursRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface CoursService {
    Integer sumMontant();
    Integer sumMontantByParentId(Long id);
    void updateStatusCours(String status, Long id);
    List<CoursRepository.CoursProjection> findByParentAndStatusAndIsActifW(Long id, String status, Boolean isActif);
    Integer sumMontantByParentIdAndCoursIdAndIsActif(Long id, Long coursId, Boolean isActif);
    Integer sumMontantByParentIdAndIsActif(Long id, Boolean isActif);
    Cours creer(Long idParent, Long idProfesseur, Long idDomaine, Cours cours);
    Cours creerAvecEmploiDuTemps(Long idParent, Cours cours, Long idProfesseur, Long idDomaine, List<MarqueDePresence> marqueDePresences,  List<Echeancier> echeanciers, List<SeanceProfesseur> seanceProfesseurs);
    Cours findCoursByCoursEcheancierId(Long id);
    List<Cours> lire();
    void updateProfesseeur(@Param("idProf") Long idProf, Long id);
    Cours findCoursBymarqueDePresenceId(Long id);
    boolean existsByDteDteDebutCours(Date dteDteDebutCours);

    List<Object[]> findAllDteDteDebutCoursAndHeureCours();
    // List<Object[]> findAllDteDteDebutCoursAndDteDteFinCoursAndHeureCours();

    List<Object[]> findAllCoursApprenantNonAcif(Long id, Boolean isActif);
    List<Object[]> findAllCoursApprenantNonActifSansProf(Long id, Boolean isActif);
    List<Object[]> findAllCoursApprenantIsActifByStatus(Long id, Boolean isActif, String status);

    List<Object[]> findAllDteDteDebutCoursAndHeureCoursByProfesseurId(Long id);

    List<Cours> findCoursByDayOfWeekAndStatus(String dayOfWeek, String status);

    //List<Cours> findCoursByDayOfWeekAndStatus(int dayOfWeek, String status);
    List<Cours> findByParentAndStatus(Apprenant apprenant, String status);

    List<Cours> findByParentAndStatusAndIsActif(Long id, String status, Boolean isActif);
    List<Cours> findByProfesseurAndStatusAndIsActif(Long id, String status, Boolean isActif);
    List<Cours> findByParentAndIsActif(Long id, Boolean isActif);
    List<Cours> findByProfesseurAndStatus(Professeur professeur, String status);
    List<Cours> findByParent(Apprenant apprenant);

    List<Cours> findByProfesseur(Professeur professeur);

    Page<Cours> findByStatusAndIsActif(String status, Boolean isActif, Pageable pageable);

    Page<Cours> findByStatusAndParentIdAndIsActif(String status, Long parentId, Pageable pageable, Boolean isActif);

    Cours modifier(Long id, Cours cours);
    Cours modifierIsActive(Long id, Cours cours);

    String supprimer(Long id);
}
