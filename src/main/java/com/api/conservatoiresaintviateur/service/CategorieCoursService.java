package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.Cours;

import java.util.List;

public interface CategorieCoursService {
    CategorieCours creer(CategorieCours categorieCours);

    List<CategorieCours> lire();

    CategorieCours findCoursByChildrenId(Long id);
    CategorieCours getById(Long id);

    //List<CategorieCours> findByStatusOrderByIdDesc(String status);

    List<CategorieCours> findByStatus(String status);

    CategorieCours modifier(Long id, CategorieCours categorieCours);

    CategorieCours modifierOne(Long id, CategorieCours categorieCours);

    String supprimer(Long id);
}
