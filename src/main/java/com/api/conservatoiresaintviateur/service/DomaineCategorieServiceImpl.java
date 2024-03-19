package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.DomaineCategorie;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.DomaineCategorieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DomaineCategorieServiceImpl implements DomaineCategorieService {
    private final DomaineCategorieRepository domaineCategorieRepository;

    @Override
    public DomaineCategorie creer(Long idParent, DomaineCategorie domaineCategorie) {
        CategorieCours categorieCours = new CategorieCours();
        categorieCours.setId(idParent);
        domaineCategorie.setParent(categorieCours);
        return domaineCategorieRepository.save(domaineCategorie);
    }

    @Override
    public List<DomaineCategorie> findAllByOrderByIdDesc() {
        return domaineCategorieRepository.findAllByOrderByIdDesc();
    }

    @Override
    public List<DomaineCategorie> lire() {
        return domaineCategorieRepository.findAll();
    }

    @Override
    public List<DomaineCategorieRepository.DomaineCategorieProjection> findByParent() {
        return domaineCategorieRepository.findByParent();
    }

    @Override
    public DomaineCategorie modifier(Long id, DomaineCategorie domaineCategorie) {
        return domaineCategorieRepository.findById(id)
                .map(p-> {
                    p.setLibelle(domaineCategorie.getLibelle());
                    p.setPlaceDisponible(domaineCategorie.getPlaceDisponible());
                    p.setStatus(domaineCategorie.getStatus());
                    return domaineCategorieRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Domaine non trouvé !"));
    }

    @Override
    public DomaineCategorie modifierAll(Long id, DomaineCategorie domaineCategorie) {
        return domaineCategorieRepository.findById(id)
                .map(p-> {
                    p.setLibelle(domaineCategorie.getLibelle());
                    p.setPlaceDisponible(domaineCategorie.getPlaceDisponible());
                    p.setStatus(domaineCategorie.getStatus());
                    p.setParent(domaineCategorie.getParent());
                    return domaineCategorieRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Domaine non trouvé !"));
    }

    @Override
    public DomaineCategorie modifierNombrePlace(Long id, DomaineCategorie domaineCategorie) {
        return domaineCategorieRepository.findById(id)
                .map(p-> {
                    p.setPlaceDisponible(domaineCategorie.getPlaceDisponible());
                    return domaineCategorieRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Domaine non trouvé !"));
    }

    @Override
    public List<DomaineCategorie> findByLibelleContaining(String query) {
        if (query == "" || query.isEmpty()) {
            return domaineCategorieRepository.findAll();
        } else {
            return domaineCategorieRepository.findByLibelleContaining(query);
        }
    }

    @Override
    public DomaineCategorie findDomaineCategorieById(Long id) {
        return domaineCategorieRepository.findDomaineCategorieById(id);
    }

    @Override
    public DomaineCategorie findDomaineCategorieByCoursId(Long coursId) {
        return domaineCategorieRepository.findDomaineCategorieByCoursId(coursId);
    }

    @Override
    public DomaineCategorie getById(Long id) {
        return domaineCategorieRepository.getById(id);
    }

    /*@Override
    public List<Professeur> findByLibelle(String libelleDomaineCategorie) {
        return domaineCategorieRepository.findByLibelle(libelleDomaineCategorie);
    }*/

    @Override
    public List<DomaineCategorie> findByParent(CategorieCours categorieCours) {
        return domaineCategorieRepository.findByParent(categorieCours);
    }

    @Override
    public String supprimer(Long id) {
        domaineCategorieRepository.deleteById(id);
        return "Domaine categorie supprimé";
    }

}
