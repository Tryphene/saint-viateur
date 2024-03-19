package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface MarqueDePresenceRepository extends JpaRepository<MarqueDePresence, Long> {
    //@Query("SELECT * FROM MarqueDePresence m WHERE m.apprenant = :apprenantId AND m.cours = :coursId")
    List<MarqueDePresence> findByApprenantIdAndCoursId(Long apprenantId, Long coursId);
    List<MarqueDePresence> findByApprenantIdAndDateMarqueDePresenceBetween(Long apprenantId, Date startDate, Date endDate);
    List<MarqueDePresence> findByApprenantId(Long apprenantId);
    MarqueDePresence findByDateMarqueDePresenceAndCoursId(Date date, Long id);

    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.presence = :presence WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.apprenant.id = :idApprenant")
    void updatePresence(@Param("date") Date date, @Param("heure") String heure, @Param("presence") String presence, Long idApprenant);
    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.presenceProfesseur = :presence WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.apprenant.id = :idApprenant")
    void updatePresenceProfesseur(@Param("date") Date date, @Param("heure") String heure, @Param("presence") String presence, Long idApprenant);
    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.heureDebut = :heureDebut WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id AND m.apprenant.id = :idApprenant")
    void updateheureDebut(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("id") Long id, Long idApprenant);
    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.heureFin = :heureFin WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id AND m.apprenant.id = :idApprenant")
    void updateheureFin(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureDebut, @Param("id") Long id, Long idApprenant);

    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.heureFin = :heureFin, m.heureEffectue = :heureEffectue  WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id AND m.apprenant.id = :idApprenant")
    void updateHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureFin") String heureFin, @Param("heureEffectue") Long heureEffectue, @Param("id") Long id, Long idApprenant);
    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.heureDebut = :heureDebut, m.heureFin = :heureFin, m.heureEffectue = :heureEffectue  WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id AND m.apprenant.id = :idApprenant")
    void updateHeureDebutAndHeureFinAndHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureDebut") String heureDebut, @Param("heureFin") String heureFin, @Param("heureEffectue") Long heureEffectue, @Param("id") Long id, Long idApprenant);

    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.heureEffectue = :heureEffectue  WHERE m.dateMarqueDePresence = :date AND m.heure = :heure AND m.proff.id = :id AND m.apprenant.id = :idApprenant")
    void updateHeureEffectue(@Param("date") Date date, @Param("heure") String heure, @Param("heureEffectue") Long heureEffectue, @Param("id") Long id, Long idApprenant);

    @Modifying
    @Transactional
    @Query("UPDATE MarqueDePresence m SET m.proff.id = :idProf WHERE m.cours.id = :idCours ")
    void updateProfesseur(@Param("idProf") Long idProf, @Param("idCours") Long idCours);

    @Query("SELECT m.dateMarqueDePresence, m.heure FROM MarqueDePresence m")
    List<Object[]> findAllDateMarqueDePresenceAndHeure();
    int countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieId(Date date, String heure, Long id, Long domaineId);
    int countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieIdAndCoursIsActif(Date date, String heure, Long id, Long domaineId, Boolean isActif);
    @Query("SELECT m.dateMarqueDePresence, m.heure FROM MarqueDePresence m JOIN m.proff p WHERE p.id = :id")
    List<Object[]> findAllDateMarqueDePresenceAndHeureByProffId(Long id);
    @Query("SELECT m.dateMarqueDePresence, m.heure, m.apprenant.id, m.proff.id, m.cours.domaineCategorie.id FROM MarqueDePresence m JOIN m.proff p WHERE p.id = :id AND m.cours.status = :status")
    List<Object[]> findAllDateMarqueDePresenceAndHeureAndApprenantIdByProffId(Long id, String status);
    @Query("SELECT m.dateMarqueDePresence, m.heure, m.apprenant.id, m.proff.id FROM MarqueDePresence m WHERE m.cours.status = :status AND m.proff.id IS NOT NULL")
    List<Object[]> findAllDateMarqueDePresenceAndHeureAndApprenantId(String status);
    @Query("SELECT m.apprenant.nom, m.apprenant.prenom, m.apprenant.telephoneMobile, m.proff.nom, m.proff.prenom, m.proff.telephone, m.cours.domaineCategorie.libelle, m.dateMarqueDePresence, m.heure, m.id, m.apprenant.id FROM MarqueDePresence m  JOIN m.cours c WHERE c.status = :status AND m.cours.isActif = :isActif")
    List<Object[]> findAllCoursDuJour(String status, Boolean isActif);
    @Query("SELECT COUNT(m) FROM MarqueDePresence m JOIN m.apprenant a WHERE a.id = :id AND MONTH(m.dateMarqueDePresence) = :month AND presence = :presence")
    Long countPresenceByDateMarqueDePresence(Long id, int month, String presence);
    Page<MarqueDePresence> findByPresenceAndApprenantId(String presence, Long apprenantId, Pageable pageable);
    Page<MarqueDePresence> findByPresenceProfesseurAndProffId(String presence, Long proffId, Pageable pageable);
    List<MarqueDePresence> findByDateMarqueDePresenceBetween(Date startDate, Date endDate);
    List<MarqueDePresence> findByProffIdAndDateMarqueDePresenceAndHeure(Long id, Date date, String heure);

    List<MarqueDePresence> findByProffAndDateMarqueDePresenceAndHeure(Professeur professeur, Date date, String heure);
    public List<MarqueDePresence> findByCoursId(Long coursId);
    @Query("SELECT m, a FROM MarqueDePresence m JOIN m.apprenant a WHERE m.presence = :presence AND a.id = :apprenant_id")
    Page<Object[]> findMarquesDePresenceAndApprenantByCriteria(
            @Param("presence") String presence,
            @Param("apprenant_id") Long apprenantId,
            Pageable pageable);

    @Query(value = "SELECT SUM(heure_effectue) FROM marque_de_presence m WHERE MONTH(date_marque_de_presence) = :month AND professeur_id = :id", nativeQuery = true)
    BigDecimal sumHeureEffectueByDateMarqueDePresence(@Param("month") int month, @Param("id") Long id);

}
