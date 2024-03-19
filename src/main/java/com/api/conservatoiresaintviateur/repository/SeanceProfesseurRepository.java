package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.modele.SeanceProfesseur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
@Repository
public interface SeanceProfesseurRepository extends JpaRepository<SeanceProfesseur, Long> {
    @Query(value = "SELECT SUM(heure_effectue) FROM seance_professeur m WHERE MONTH(date_marque_de_presence) = :month AND professeur_id = :id", nativeQuery = true)
    BigDecimal sumHeureEffectueByDateMarqueDePresence(@Param("month") int month, @Param("id") Long id);
    @Modifying
    @Transactional
    @Query("UPDATE SeanceProfesseur m SET m.presenceProfesseur = :presence WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id")
    void updatePresenceProfesseur(@Param("date") Date date, @Param("heure") String heure, @Param("presence") String presence, Long id);
    @Modifying
    @Transactional
    @Query("UPDATE SeanceProfesseur m SET m.heureDebut = :heureDebut WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id")
    void updateheureDebut(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, Long id);
    @Modifying
    @Transactional
    @Query("UPDATE SeanceProfesseur m SET m.heureFin = :heureFin WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id")
    void updateheureFin(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureDebut, Long id);

    @Modifying
    @Transactional
    @Query("UPDATE SeanceProfesseur m SET m.heureFin = :heureFin, m.heureEffectue = :heureEffectue  WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id")
    void updateHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureFin, @Param("heureEffectue") BigDecimal heureEffectue, @Param("id") Long id);
    @Modifying
    @Transactional
    @Query("UPDATE SeanceProfesseur m SET m.heureDebut = :heureDebut, m.heureFin = :heureFin, m.heureEffectue = :heureEffectue  WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id")
    void updateHeureDebutAndHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("heureFin") String heureFin, @Param("heureEffectue") BigDecimal heureEffectue, Long id);

    @Modifying
    @Transactional
    @Query("UPDATE SeanceProfesseur m SET m.heureEffectue = :heureEffectue  WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id")
    void updateHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureEffectue") BigDecimal heureEffectue, @Param("id") Long id);
    List<SeanceProfesseur> findByProffAndDateMarqueDePresenceAndHeure(Professeur professeur, Date date, String heure);
    List<SeanceProfesseur> findByProffAndDateMarqueDePresenceAndHeureAndCoursDomaineCategorieId(Professeur professeur, Date date, String heure, Long domaineId);
    @Query("SELECT m.dateMarqueDePresence, m.heure FROM SeanceProfesseur m JOIN m.proff p WHERE p.id = :id")
    List<Object[]> findAllDateMarqueDePresenceAndHeureByProffId(Long id);

    @Query("SELECT m.proff.nom, m.proff.prenom, m.proff.telephone, m.cours.domaineCategorie.libelle, m.dateMarqueDePresence, m.heure, m.id FROM SeanceProfesseur m  JOIN m.cours c WHERE c.status = :status AND m.cours.isActif = :isActif")
    List<Object[]> findAllCoursDuJour(String status, Boolean isActif);

    /*@Query("SELECT m.apprenant.nom, m.apprenant.prenom, m.apprenant.telephoneMobile, m.proff.nom, m.proff.prenom, m.proff.telephone, m.cours.domaineCategorie.libelle, m.dateMarqueDePresence, m.heure, m.id, m.apprenant.id FROM MarqueDePresence m  JOIN m.cours c WHERE c.status = :status AND m.cours.isActif = :isActif")
    List<Object[]> findByDomaine(String status, Boolean isActif);*/

    public interface SeanceProfesseurProjection {
        SeanceProfesseur getSeanceProfesseur();
        Long getCours();
    }
    @Query("SELECT s as seanceProfesseur, s.cours.domaineCategorie.id as cours FROM SeanceProfesseur s JOIN s.proff p WHERE p.id = :id AND s.heure = :heure AND s.cours.domaineCategorie.id = :domaineId")
    List<SeanceProfesseurProjection> findByDomaine(Long id, String heure, Long domaineId);

    @Query("SELECT s as seanceProfesseur, s.cours.domaineCategorie.id as cours FROM SeanceProfesseur s JOIN s.proff p WHERE p.id = :id")
    List<SeanceProfesseurProjection> findAllSeance(Long id);

    @Query("SELECT s.cours.domaineCategorie.id FROM SeanceProfesseur s JOIN s.proff p WHERE p.id = :id GROUP BY s.cours.domaineCategorie.id")
    List<Long> findAllDomaine(Long id);

    @Query("SELECT DISTINCT s.cours.domaineCategorie.id, s.heure FROM SeanceProfesseur s JOIN s.proff p WHERE p.id = :id")
    List<Object[]> findAllDomaineAndHeure(Long id);

    @Query("SELECT s.cours.domaineCategorie.id, s.cours.domaineCategorie.libelle, s.heure, s FROM SeanceProfesseur s WHERE s.proff.id = :id AND s.cours.isActif = :isActif ORDER BY DATE(date_marque_de_presence) ASC")
    List<Object[]> findAllDomaineAndHeureWithSeances(Long id, Boolean isActif);

    @Query("SELECT s.cours.domaineCategorie.id, s.cours.domaineCategorie.libelle, s.heure, s FROM SeanceProfesseur s WHERE s.proff.id = :id AND s.cours.isActif = :isActif AND s.cours.status = :status ORDER BY DATE(date_marque_de_presence) ASC")
    List<Object[]> findAllDomaineAndHeureWithSeancesCoursActif(Long id, Boolean isActif, String status);

    Page<SeanceProfesseur> findByPresenceProfesseurAndProffId(String presence, Long proffId, Pageable pageable);
}
