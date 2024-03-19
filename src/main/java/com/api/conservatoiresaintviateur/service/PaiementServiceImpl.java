package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.PaiementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PaiementServiceImpl implements PaiementService {
    private final PaiementRepository paiementRepository;

    @Override
    public Paiement creer(Long apprenantId,Long coursId, Paiement paiement) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        Cours cours = new Cours();
        cours.setId(coursId);
        paiement.setCours(cours);
        paiement.setApprenant(apprenant);
        return paiementRepository.save(paiement);
    }

    @Override
    public Integer sumMontantByApprenantId(Long id) {
        return paiementRepository.sumMontantByApprenantId(id);
    }

    @Override
    public Integer sumMontantByApprenantIdAndCoursId(Long id, Long coursId) {
        return paiementRepository.sumMontantByApprenantIdAndCoursId(id, coursId);
    }

    @Override
    public BigDecimal sumMontantForCurrentYear() {
        return paiementRepository.sumMontantForCurrentYear();
    }

    @Override
    public List<Paiement> readPaiementParCours(Long id) {
        return paiementRepository.readPaiementParCours(id);
    }

    @Override
    public List<Object[]> readPaiement() {
        return paiementRepository.readPaiement();
    }

    @Override
    public BigDecimal sumMontantByDatePaiementMonth(int month) {
        return paiementRepository.sumMontantByDatePaiementMonth(month);
    }

    @Override
    public BigDecimal sumMontantByDatePaiementDay(Date date) {
        return paiementRepository.sumMontantByDatePaiementDay(date);
    }

    @Override
    public Integer sumMontant() {
        return paiementRepository.sumMontant();
    }

    @Override
    public List<Paiement> lire() {
        return paiementRepository.findAll();
    }

    @Override
    public Paiement findPaiementByCoursId(Long id) {
        return paiementRepository.findPaiementByCoursId(id);
    }

    @Override
    public Paiement getById(Long id) {
        return paiementRepository.getById(id);
    }

    @Override
    public Paiement modifier(Long id, Paiement paiement) {
        return paiementRepository.findById(id)
                .map(p -> {
                    p.setMontant(paiement.getMontant());
                    return paiementRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Paiement non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        paiementRepository.deleteById(id);
        return "Paiement supprimé";
    }
}
