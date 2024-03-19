package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Avis;

import java.util.List;

public interface AvisService {
    Avis creer(Avis avis);
    List<Avis> lire();
    List<Avis> findAllByOrderByIdDesc();
    List<Avis> findAllByStatusOrderByIdDesc(Boolean status);
    List<Avis> findAvisByStatus(Boolean status);
    Integer sumNote();
    Integer sumNoteByStatus(Boolean status);
    Avis updateStatus(Long id, Avis avis);
    List<Avis> findTop3ByStatusOrderByIdDesc(boolean status);
}
