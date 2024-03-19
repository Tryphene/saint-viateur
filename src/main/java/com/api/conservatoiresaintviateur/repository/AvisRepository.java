package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Avis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> findAllByOrderByIdDesc();
    List<Avis> findAllByStatusOrderByIdDesc(Boolean status);
    List<Avis> findAvisByStatus(Boolean status);
    @Query(value = "SELECT SUM(note) FROM Avis", nativeQuery = true)
    Integer sumNote();
    @Query(value = "SELECT SUM(note) FROM Avis WHERE status = :status", nativeQuery = true)
    Integer sumNoteByStatus(Boolean status);
    List<Avis> findTop3ByStatusOrderByIdDesc(boolean status);
}
