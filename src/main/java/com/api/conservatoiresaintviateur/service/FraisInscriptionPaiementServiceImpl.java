package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.FraisInscriptionPaiement;
import com.api.conservatoiresaintviateur.repository.FraisInscriptionPaiementRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class FraisInscriptionPaiementServiceImpl implements FraisInscriptionPaiementService {
    private final FraisInscriptionPaiementRepository fraisInscriptionPaiementRepository;

    @Override
    public FraisInscriptionPaiement creer(Long apprenantId, FraisInscriptionPaiement fraisInscriptionPaiement) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        fraisInscriptionPaiement.setApprenantPaiementFrais(apprenant);
        return fraisInscriptionPaiementRepository.save(fraisInscriptionPaiement);
    }

    @Override
    public List<FraisInscriptionPaiement> lire() {
        //return fraisInscriptionPaiementRepository.findAll();
        Sort descendingSort = Sort.by(Sort.Direction.DESC, "id");
        return fraisInscriptionPaiementRepository.findAll(descendingSort);
    }

    @Override
    public FraisInscriptionPaiement findFraisInscriptionPaiementByApprenantPaiementFraisId(Long id) {
        return fraisInscriptionPaiementRepository.findFraisInscriptionPaiementByApprenantPaiementFraisId(id);
    }

    @Override
    public FraisInscriptionPaiement getById(Long id) {
        return fraisInscriptionPaiementRepository.getById(id);
    }

    @Override
    public FraisInscriptionPaiement modifier(Long id, FraisInscriptionPaiement fraisInscriptionPaiement) {
        return fraisInscriptionPaiementRepository.findById(id)
                .map(p -> {
                    p.setFraisInscription(fraisInscriptionPaiement.getFraisInscription());
                    p.setAdmin(fraisInscriptionPaiement.getAdmin());
                    p.setDatePaiement(fraisInscriptionPaiement.getDatePaiement());
                    return fraisInscriptionPaiementRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Paiement non trouvé !"));
    }

    @Override
    public List<Object[]> readFraisInscription() {
        return fraisInscriptionPaiementRepository.readFraisInscription();
    }

    @Override
    public FraisInscriptionPaiement supprimer(Long id) {
       /* fraisInscriptionPaiementRepository.deleteById(id);
        return "Frais Inscription supprimé";*/
        return null;
    }

    @Override
    public BigDecimal sumFraisInscriptionByDatePaiementMonth(int month) {
        return fraisInscriptionPaiementRepository.sumFraisInscriptionByDatePaiementMonth(month);
    }

    @Override
    public BigDecimal sumFraisInscriptionByDatePaiementDay(Date date) {
        return fraisInscriptionPaiementRepository.sumFraisInscriptionByDatePaiementDay(date);
    }

    @Override
    public BigDecimal sumFraisInscriptionForCurrentYear() {
        return fraisInscriptionPaiementRepository.sumFraisInscriptionForCurrentYear();
    }

    @Override
    public Integer sumFraisInscription() {
        return fraisInscriptionPaiementRepository.sumFraisInscription();
    }
}
