package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Paiement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface PaiementService {
    Paiement creer(Long apprenantId, Long coursId, Paiement paiement);
    Integer sumMontantByApprenantId(Long id);
    Integer sumMontantByApprenantIdAndCoursId(Long id, Long coursId);
    BigDecimal sumMontantForCurrentYear();
    List<Paiement> readPaiementParCours(Long id);
    List<Object[]> readPaiement();
    BigDecimal sumMontantByDatePaiementMonth(@Param("month") int month);
    BigDecimal sumMontantByDatePaiementDay(@Param("date") Date date);
    Integer sumMontant();
    List<Paiement> lire();
    Paiement findPaiementByCoursId(Long id);

    Paiement getById(Long id);

    Paiement modifier(Long id, Paiement paiement);

    String supprimer(Long id);
}
