package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.repository.CategorieCoursRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategorieCoursServiceImpl implements CategorieCoursService {
    private CategorieCoursRepository categorieCoursRepository;

    @Override
    public CategorieCours creer(CategorieCours categorieCours) {
        return categorieCoursRepository.save(categorieCours);
    }

    @Override
    public List<CategorieCours> lire() {
        return categorieCoursRepository.findAll();
    }

    @Override
    public CategorieCours findCoursByChildrenId(Long id) {
        return categorieCoursRepository.findCoursByChildrenId(id);
    }

    @Override
    public CategorieCours getById(Long id) {
        return categorieCoursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable pour l'ID : " + id));
    }

    @Override
    public List<CategorieCours> findByStatus(String status) {
        return categorieCoursRepository.findByStatus(status);
    }

    @Override
    public CategorieCours modifier(Long id, CategorieCours categorieCours) {
        return categorieCoursRepository.findById(id)
                .map(p-> {
                    p.setLibelle(categorieCours.getLibelle());
                    p.setStatus(categorieCours.getStatus());
                    return categorieCoursRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Categorie non trouvé !"));
    }

    @Override
    public CategorieCours modifierOne(Long id, CategorieCours categorieCours) {
        return categorieCoursRepository.findById(id)
                .map(p-> {
                    p.setStatus(categorieCours.getStatus());
                    return categorieCoursRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Categorie non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        categorieCoursRepository.deleteById(id);
        return "Produit supprimé";
    }
}
