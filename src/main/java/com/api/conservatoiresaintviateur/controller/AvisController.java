package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Avis;
import com.api.conservatoiresaintviateur.modele.DomaineCategorie;
import com.api.conservatoiresaintviateur.service.AvisService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avis")
@AllArgsConstructor
public class AvisController {
    private final AvisService avisService;

    @PutMapping("update/status/{id}")
    public Avis updateOne(@PathVariable Long id, @RequestBody Avis avis){
        return avisService.updateStatus(id, avis);
    }
    @PostMapping("/create")
    public Avis create(@RequestBody Avis avis){
        return avisService.creer(avis);
    }
    @GetMapping("/readAll")
    public List<Avis> readAllAvis(){
        return avisService.findAllByOrderByIdDesc();
    }

    @GetMapping("/read")
    public List<Avis> readAvis(@RequestParam Boolean status){
        return avisService.findAllByStatusOrderByIdDesc(status);
    }
    @GetMapping("/avis-confirme")
    public List<Avis> findAvisByStatus(@RequestParam Boolean status){
        return avisService.findAvisByStatus(status);
    }

    @GetMapping("/trois-derniers")
    public List<Avis> troisDerniers(@RequestParam Boolean status){
        return avisService.findTop3ByStatusOrderByIdDesc(status);
    }
    @GetMapping("/somme-note")
    public Integer sumNote(){
        return avisService.sumNote();
    }
    @GetMapping("/somme-note-status")
    public Integer sumNoteByStatus(@RequestParam Boolean status){
        Integer count = avisService.sumNoteByStatus(status);
        if(count == null){
            return 0;
        } else {
            return count;
        }
    }
}
