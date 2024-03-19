package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface MarqueDePresenceService {
    MarqueDePresence creer(Long apprenantId, Long ProfesseurId, Long CoursId, MarqueDePresence marqueDePresence);
    int countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieId(Date date, String heure, Long id, Long domaineId);
    int countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieIdAndCoursIsActif(Date date, String heure, Long id, Long domaineId, Boolean isActif);
    List<MarqueDePresence> lire();
    List<MarqueDePresence> findByApprenantId(Long apprenantId);
    List<MarqueDePresence> findByCoursId(Long CoursId);
    List<Object[]> findAllDateMarqueDePresenceAndHeure();
    List<Object[]> findAllDateMarqueDePresenceAndHeureByProffId(Long id);
    List<Object[]> findAllDateMarqueDePresenceAndHeureAndApprenantIdByProffId(Long id, String status);
    List<Object[]> findAllDateMarqueDePresenceAndHeureAndApprenantId(String status);
    List<MarqueDePresence> findByApprenantIdAndCoursId(Long apprenantId, Long coursId);
    List<Object[]> findAllCoursDuJour(String status, Boolean isActif);
    List<MarqueDePresence> findByProffIdAndDateMarqueDePresenceAndHeure(Long id, Date date, String heure);
    Long countPresenceByDateMarqueDePresence(Long id, int month, String presence);
    List<MarqueDePresence> findByProffAndDateMarqueDePresenceAndHeure(Professeur professeur, Date date, String heure);
    void updatePresence(@Param("date") Date date, @Param("heure") String heure, @Param("presence") String presence, Long idApprenant);
    void updateHeureDebutAndHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("heureFin") String heureFin, @Param("heureEffectue") Long heureEffectue, @Param("id") Long id, Long idApprenant);

    void updatePresenceProfesseur(@Param("date") Date date, @Param("heure") String heure, @Param("presence") String presence, Long idApprenant);
    void updateheureDebut(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("id") Long id, Long idApprenant);
    void updateheureFin(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureDebut, @Param("id") Long id, Long idApprenant);
    void updateHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureFin, @Param("heureEffectue") Long heureEffectue, @Param("id") Long id, Long idApprenant);
    void updateHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureEffectue") Long heureEffectue, @Param("id") Long id, Long idApprenant);
    void updateProfesseur(@Param("idProf") Long idProf, @Param("idCours") Long idCours);
    MarqueDePresence modifierPresenceApprenant(Long id, MarqueDePresence marqueDePresence);
    MarqueDePresence modifierPresenceProfesseur(Long id, MarqueDePresence marqueDePresence);
    BigDecimal sumHeureEffectueByDateMarqueDePresence(@Param("month")int month, @Param("id") Long id);
    Page<Object[]> findMarquesDePresenceAndApprenantByCriteria(
            @Param("presence") String presence,
            @Param("apprenantId") Long apprenantId,
            Pageable pageable);

    Page<MarqueDePresence> findByPresenceAndApprenantId(String presence, Long id, Pageable pageable);
    Page<MarqueDePresence> findByPresenceProfesseurAndProffId(String presence, Long proffId, Pageable pageable);
    MarqueDePresence findByDateMarqueDePresenceAndCoursId(Date date, Long id);
    List<MarqueDePresence> findByDateMarqueDePresenceBetween(Date startDate, Date endDate);
}
