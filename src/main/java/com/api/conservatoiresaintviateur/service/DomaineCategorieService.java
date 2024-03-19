package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.DomaineCategorie;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.DomaineCategorieRepository;

import java.util.List;

public interface DomaineCategorieService {
    DomaineCategorie creer(Long idParent, DomaineCategorie domaineCategorie);
    List<DomaineCategorie> findAllByOrderByIdDesc();
    List<DomaineCategorie> lire();
    List<DomaineCategorieRepository.DomaineCategorieProjection> findByParent();
    DomaineCategorie modifier(Long id, DomaineCategorie domaineCategorie);
    DomaineCategorie modifierAll(Long id, DomaineCategorie domaineCategorie);
    DomaineCategorie modifierNombrePlace(Long id, DomaineCategorie domaineCategorie);

    List<DomaineCategorie> findByLibelleContaining(String recherche);
    DomaineCategorie findDomaineCategorieById(Long id);

    //List<Professeur> findByLibelle(String libelleDomaineCategorie);

    DomaineCategorie findDomaineCategorieByCoursId(Long coursId);
    DomaineCategorie getById(Long id);

    List<DomaineCategorie> findByParent(CategorieCours categorieCours);

    String supprimer(Long id);

}
