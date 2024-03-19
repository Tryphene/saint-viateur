package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.FraisInscriptionPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface FraisInscriptionPaiementRepository extends JpaRepository<FraisInscriptionPaiement, Long> {
    FraisInscriptionPaiement findFraisInscriptionPaiementByApprenantPaiementFraisId(Long id);
    @Query(value = "SELECT SUM(frais_inscription) FROM frais_inscription WHERE MONTH(date_paiement) = :month", nativeQuery = true)
    BigDecimal sumFraisInscriptionByDatePaiementMonth(@Param("month") int month);
    @Query(value = "SELECT SUM(frais_inscription) FROM frais_inscription WHERE YEAR(date_paiement) = YEAR(CURDATE())", nativeQuery = true)
    BigDecimal sumFraisInscriptionForCurrentYear();
    @Query(value = "SELECT SUM(frais_inscription) FROM frais_inscription WHERE date_paiement = :date", nativeQuery = true)
    BigDecimal sumFraisInscriptionByDatePaiementDay(@Param("date") Date date);
    @Query(value = "SELECT SUM(frais_inscription) FROM frais_inscription", nativeQuery = true)
    Integer sumFraisInscription();
    @Query("SELECT f.admin, f.datePaiement, f.fraisInscription, f.apprenantPaiementFrais.nom, f.apprenantPaiementFrais.prenom, f.apprenantPaiementFrais.telephoneMobile, f.id  FROM FraisInscriptionPaiement f ORDER BY f.id DESC")
    List<Object[]> readFraisInscription();
}
