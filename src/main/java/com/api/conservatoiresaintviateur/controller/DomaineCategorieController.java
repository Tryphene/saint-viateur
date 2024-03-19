package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.DomaineCategorie;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.DomaineCategorieRepository;
import com.api.conservatoiresaintviateur.service.CategorieCoursService;
import com.api.conservatoiresaintviateur.service.DomaineCategorieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/domaine-categorie")
@AllArgsConstructor
public class DomaineCategorieController {
    private final DomaineCategorieService domaineCategorieService;
    private final CategorieCoursService categorieCoursService;
    @PostMapping("/create/{id}")
    public DomaineCategorie create(@PathVariable Long id, @RequestBody DomaineCategorie domaineCategorie){
        return domaineCategorieService.creer(id, domaineCategorie);
    }

    @GetMapping("/search")
    public List<DomaineCategorie> search(@RequestParam(required = false) String query) {
        return domaineCategorieService.findByLibelleContaining(query);
    }

    @GetMapping("/read")
    public List<DomaineCategorie> read() {
        return domaineCategorieService.findAllByOrderByIdDesc();
    }

    @GetMapping("/read-with-nom-domaine")
    public List<DomaineCategorieRepository.DomaineCategorieProjection> readWithNomDomaine() {
        return domaineCategorieService.findByParent();
    }

    @GetMapping("/read/{id}")
    public DomaineCategorie readOne(@PathVariable Long id) {
        return domaineCategorieService.findDomaineCategorieById(id);
    }

    @GetMapping("/domaine-categorie-for-cours/{coursId}")
    public ResponseEntity<DomaineCategorie> getDomaineCategorieForCours(@PathVariable Long coursId) {
        DomaineCategorie domaineCategorie = domaineCategorieService.findDomaineCategorieByCoursId(coursId);
        if (domaineCategorie != null) {
            return ResponseEntity.ok(domaineCategorie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/categorie/{id}")
    public List<DomaineCategorie> getDomainesByCategorie(@PathVariable Long id) {
        CategorieCours categorieCours = categorieCoursService.getById(id);

        return domaineCategorieService.findByParent(categorieCours);
    }

    @PutMapping("update/{id}")
    public DomaineCategorie update(@PathVariable Long id, @RequestBody DomaineCategorie domaineCategorie){
        return domaineCategorieService.modifier(id, domaineCategorie);
    }
    @PutMapping("update-all/{id}")
    public DomaineCategorie updateAL(@PathVariable Long id, @RequestBody DomaineCategorie domaineCategorie){
        return domaineCategorieService.modifierAll(id, domaineCategorie);
    }

    @PutMapping("update-nombre-place/{id}")
    public DomaineCategorie updateNombrePlace(@PathVariable Long id, @RequestBody DomaineCategorie domaineCategorie){
        return domaineCategorieService.modifierNombrePlace(id, domaineCategorie);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return domaineCategorieService.supprimer(id);
    }
}
