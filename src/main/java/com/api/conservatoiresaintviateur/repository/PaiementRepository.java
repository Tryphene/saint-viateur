package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    Paiement findPaiementByCoursId(Long id);

    @Query(value = "SELECT SUM(montant) FROM Paiement WHERE apprenant_id = :id", nativeQuery = true)
    Integer sumMontantByApprenantId(Long id);
    @Query(value = "SELECT SUM(montant) FROM paiement WHERE MONTH(date_paiement) = :month", nativeQuery = true)
    BigDecimal sumMontantByDatePaiementMonth(@Param("month") int month);
    @Query(value = "SELECT SUM(montant) FROM paiement WHERE YEAR(date_paiement) = YEAR(CURDATE())", nativeQuery = true)
    BigDecimal sumMontantForCurrentYear();
    @Query(value = "SELECT SUM(montant) FROM paiement WHERE jour = :date", nativeQuery = true)
    BigDecimal sumMontantByDatePaiementDay(@Param("date") Date date);
    @Query(value = "SELECT SUM(montant) FROM paiement", nativeQuery = true)
    Integer sumMontant();
    @Query("SELECT p.admin, p.datePaiement, p.montant, p.apprenant.nom, p.apprenant.prenom, p.apprenant.telephoneMobile, p.id, p.cours.domaineCategorie.libelle  FROM Paiement p ORDER BY p.id DESC")
    List<Object[]> readPaiement();
    @Query("SELECT p FROM Paiement p JOIN p.cours c WHERE c.id = :id")
    List<Paiement> readPaiementParCours(Long id);
    @Query(value = "SELECT SUM(montant) FROM Paiement WHERE apprenant_id = :id AND cours_id = :coursId", nativeQuery = true)
    Integer sumMontantByApprenantIdAndCoursId(Long id, Long coursId);
}
