package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.DemandeInscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeInscriptionRepository extends JpaRepository<DemandeInscription, Long> {
    List<DemandeInscription> findByStatusOrderByIdDesc(String status);
    Page<DemandeInscription> findByStatus(String status, Pageable pageable);
}
