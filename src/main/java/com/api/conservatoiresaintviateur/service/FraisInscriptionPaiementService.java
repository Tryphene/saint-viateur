package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.FraisInscriptionPaiement;
import com.api.conservatoiresaintviateur.modele.Paiement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface FraisInscriptionPaiementService {
    FraisInscriptionPaiement creer(Long apprenantId, FraisInscriptionPaiement fraisInscriptionPaiement);

    List<FraisInscriptionPaiement> lire();
    FraisInscriptionPaiement findFraisInscriptionPaiementByApprenantPaiementFraisId(Long id);

    FraisInscriptionPaiement getById(Long id);

    FraisInscriptionPaiement modifier(Long id, FraisInscriptionPaiement fraisInscriptionPaiement);
    List<Object[]> readFraisInscription();
    FraisInscriptionPaiement supprimer(Long id);

    BigDecimal sumFraisInscriptionByDatePaiementMonth(@Param("month") int month);
    BigDecimal sumFraisInscriptionByDatePaiementDay(@Param("date") Date date);
    BigDecimal sumFraisInscriptionForCurrentYear();
    Integer sumFraisInscription();
}
