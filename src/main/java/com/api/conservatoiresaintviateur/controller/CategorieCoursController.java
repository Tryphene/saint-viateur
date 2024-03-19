package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.service.CategorieCoursService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorie-cours")
@AllArgsConstructor
public class CategorieCoursController {
    private final CategorieCoursService categorieCoursService;

    @PostMapping("/create")
    public CategorieCours create(@RequestBody CategorieCours categorieCours){
        return categorieCoursService.creer(categorieCours);
    }

    @GetMapping("/categorie-cours-for-domaine-categorie/{id}")
    public ResponseEntity<CategorieCours> getCategorieCoursCoursForDomaineCategorie(@PathVariable Long id) {
        CategorieCours categorieCours = categorieCoursService.findCoursByChildrenId(id);
        if (categorieCours != null) {
            return ResponseEntity.ok(categorieCours);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/read")
    public List<CategorieCours> read() {
        return categorieCoursService.lire();
    }

    @GetMapping("/cours-active")
    public List<CategorieCours> coursActive(String status) {
        return categorieCoursService.findByStatus("Activé");
    }

    @GetMapping("/read/{id}")
    public CategorieCours readOne(@PathVariable Long id) {
        return categorieCoursService.getById(id);
    }

    @PutMapping("update/{id}")
    public CategorieCours update(@PathVariable Long id, @RequestBody CategorieCours categorieCours){
        return categorieCoursService.modifier(id, categorieCours);
    }

    @PutMapping("update/status/{id}")
    public CategorieCours updateOne(@PathVariable Long id, @RequestBody CategorieCours categorieCours){
        return categorieCoursService.modifierOne(id, categorieCours);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return categorieCoursService.supprimer(id);
    }

}
