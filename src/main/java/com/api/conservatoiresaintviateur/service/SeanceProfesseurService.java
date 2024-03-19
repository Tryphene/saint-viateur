package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.modele.SeanceProfesseur;
import com.api.conservatoiresaintviateur.repository.SeanceProfesseurRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface SeanceProfesseurService {
    SeanceProfesseur creer(Long ProfesseurId, Long CoursId, SeanceProfesseur seanceProfesseur);
    List<SeanceProfesseur> creerSeances(Long professeurId, Long coursId, List<SeanceProfesseur> seances);
    List<SeanceProfesseur> findByProffAndDateMarqueDePresenceAndHeure(Professeur professeur, Date date, String heure);
    List<SeanceProfesseur> findByProffAndDateMarqueDePresenceAndHeureAndCoursDomaineCategorieId(Professeur professeur, Date date, String heure, Long domaineId);
    BigDecimal sumHeureEffectueByDateMarqueDePresence(@Param("month") int month, @Param("id") Long id);
    List<Long> findAllDomaine(Long id);
    List<Object[]> findAllDomaineAndHeureWithSeances(Long id, Boolean isActif);
    List<Object[]> findAllDomaineAndHeure(Long id);
    List<SeanceProfesseurRepository.SeanceProfesseurProjection> findByDomaine(Long id, String heure, Long domaineId);
    List<SeanceProfesseurRepository.SeanceProfesseurProjection> findAllSeance(Long id);
    Page<SeanceProfesseur> findByPresenceProfesseurAndProffId(String presence, Long proffId, Pageable pageable);
    List<Object[]> findAllDomaineAndHeureWithSeancesCoursActif(Long id, Boolean isActif, String status);
   void updatePresenceProfesseur(@Param("date") Date date, @Param("heure") String heure, @Param("presence") String presence, Long id);
    void updateheureDebut(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("id") Long id);
    void updateheureFin(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureDebut, @Param("id") Long id);

    void updateHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureFin, @Param("heureEffectue") BigDecimal heureEffectue, @Param("id") Long id);
    void updateHeureDebutAndHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("heureFin") String heureFin, @Param("heureEffectue") BigDecimal heureEffectue, @Param("id") Long id);

    void updateHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureEffectue") BigDecimal heureEffectue, @Param("id") Long id);

    List<Object[]> findAllDateMarqueDePresenceAndHeureByProffId(Long id);

    List<Object[]> findAllCoursDuJour(String status, Boolean isActif);
}
