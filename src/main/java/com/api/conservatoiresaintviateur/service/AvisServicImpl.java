package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Avis;
import com.api.conservatoiresaintviateur.repository.AvisRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AvisServicImpl implements AvisService{
    private final AvisRepository avisRepository;

    @Override
    public Avis creer(Avis avis) {
        return avisRepository.save(avis);
    }

    @Override
    public List<Avis> lire() {
        return avisRepository.findAll();
    }

    @Override
    public List<Avis> findAllByOrderByIdDesc() {
        return avisRepository.findAllByOrderByIdDesc();
    }

    @Override
    public List<Avis> findAllByStatusOrderByIdDesc(Boolean status) {
        return avisRepository.findAllByStatusOrderByIdDesc(status);
    }

    @Override
    public List<Avis> findAvisByStatus(Boolean status) {
        return avisRepository.findAvisByStatus(status);
    }

    @Override
    public Integer sumNote() {
        return avisRepository.sumNote();
    }

    @Override
    public Integer sumNoteByStatus(Boolean status) {
        return avisRepository.sumNoteByStatus(status);
    }

    @Override
    public Avis updateStatus(Long id, Avis avis) {
        return avisRepository.findById(id)
                .map(p-> {
                    p.setStatus(avis.getStatus());
                    return avisRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Avis non trouvé !"));
    }

    @Override
    public List<Avis> findTop3ByStatusOrderByIdDesc(boolean status) {
        return avisRepository.findTop3ByStatusOrderByIdDesc(status);
    }
}
