package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.DemandeInscription;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DemandeInscriptionService {
    DemandeInscription creer(DemandeInscription demandeInscription);

    List<DemandeInscription> lire();

    List<DemandeInscription> findByStatusOrderByIdDesc(String status);


    Page<DemandeInscription> findByStatus(String status, Pageable pageable);

    DemandeInscription modifier(Long id, DemandeInscription demandeInscription);

    DemandeInscription modifierOne(Long id, DemandeInscription demandeInscription);

    String supprimer(Long id);
}
