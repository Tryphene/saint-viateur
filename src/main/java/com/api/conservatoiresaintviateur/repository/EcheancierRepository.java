package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Echeancier;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface EcheancierRepository extends JpaRepository<Echeancier, Long> {
    List<Echeancier> findByApprenantEcheancierId(Long apprenantId);
    @Query(value = "SELECT SUM(montant) FROM Echeancier WHERE status = :status AND cours_id = :id", nativeQuery = true)
    Integer sumMontantByStatus(String status, Long id);

    @Query("SELECT e.dateEcheance, e.status, e.apprenantEcheancier.id, e.apprenantEcheancier.nom, e.apprenantEcheancier.prenom, e.apprenantEcheancier.mail, e.coursEcheancier.id, e.coursEcheancier.domaineCategorie.libelle, e.montant FROM Echeancier e JOIN e.apprenantEcheancier a WHERE a.id = :id AND e.status = :status")
    List<Object[]> findAllDatePaiementAndStatusByApprenantEcheancierId(Long id, String status);
    @Query("SELECT e.dateEcheance, e.status, e.apprenantEcheancier.id, e.apprenantEcheancier.nom, e.apprenantEcheancier.prenom, e.apprenantEcheancier.mail, e.coursEcheancier.id, e.coursEcheancier.domaineCategorie.libelle, e.montant FROM Echeancier e JOIN e.apprenantEcheancier a WHERE e.status = :status ORDER BY DATE(date_paiement) ASC")
    List<Object[]> findAllDatePaiementAndStatus(String status);

    @Query("SELECT e.dateEcheance, e.status, a.id, a.nom, a.prenom, a.mail, e.coursEcheancier.id, e.coursEcheancier.domaineCategorie.libelle, e.montant FROM Echeancier e JOIN e.apprenantEcheancier a WHERE e.dateEcheance >= :startDate AND e.dateEcheance <= :endDate AND e.status = :status")
    List<Object[]> findAllByDatePaiementBetweenAndStatus(Date startDate, Date endDate,  String status);
    @Query("SELECT e.dateEcheance FROM Echeancier e WHERE e.status = :status ORDER BY DATE(date_echeance) ASC")
    List<String> findAllDatePaiementByStatus(String status);

    List<Echeancier> findByDateEcheanceBetweenAndStatus(Date startDate, Date endDate, String status);
    List<Echeancier> findByCoursEcheancierId(Long coursId);
    List<Echeancier> findByApprenantEcheancierIdAndCoursEcheancierId(Long apprenantId, Long coursId);
    @Modifying
    @Transactional
    @Query("UPDATE Echeancier e SET e.status = :status, e.datePaiement = :datePaie WHERE e.dateEcheance = :date AND e.coursEcheancier.id = :id")
    void updatePaiement(@Param("date") Date date, @Param("status") String status, @Param("datePaie") Date datePaie, @Param("id") Long id);
}
