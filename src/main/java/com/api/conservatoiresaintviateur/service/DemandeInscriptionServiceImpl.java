package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.DemandeInscription;
import com.api.conservatoiresaintviateur.repository.DemandeInscriptionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DemandeInscriptionServiceImpl implements DemandeInscriptionService {

    private final DemandeInscriptionRepository demandeInscriptionRepository;

    @Override
    public DemandeInscription creer(DemandeInscription demandeInscription) {
        return demandeInscriptionRepository.save(demandeInscription);
    }

    @Override
    public List<DemandeInscription> lire() {
        return demandeInscriptionRepository.findAll();
    }

    @Override
    public List<DemandeInscription> findByStatusOrderByIdDesc(String status) {
        return demandeInscriptionRepository.findByStatusOrderByIdDesc(status);
    }

    @Override
    public Page<DemandeInscription> findByStatus(String status, Pageable pageable) {
        return demandeInscriptionRepository.findByStatus(status, pageable);
    }

    @Override
    public DemandeInscription modifier(Long id, DemandeInscription demandeInscription) {
        return demandeInscriptionRepository.findById(id)
                .map(p -> {
                    p.setNom(demandeInscription.getNom());
                    p.setPrenom(demandeInscription.getPrenom());
                    p.setDteNaissance(demandeInscription.getDteNaissance());
                    p.setMail(demandeInscription.getMail());
                    p.setMdp(demandeInscription.getMdp());
                    p.setTelephone(demandeInscription.getTelephone());
                    p.setDomaine(demandeInscription.getDomaine());
                    p.setStatus(demandeInscription.getStatus());
                    return demandeInscriptionRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Demande Inscription non trouvé !"));

    }

    @Override
    public DemandeInscription modifierOne(Long id, DemandeInscription demandeInscription) {
        return demandeInscriptionRepository.findById(id)
                .map(p -> {
                    p.setStatus(demandeInscription.getStatus());
                    return demandeInscriptionRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Demande Inscription non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        demandeInscriptionRepository.deleteById(id);
        return "Demande Inscription supprimé";
    }
}
