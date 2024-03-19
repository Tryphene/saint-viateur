package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.DemandeInscription;
import com.api.conservatoiresaintviateur.service.DemandeInscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demande-inscription")
@AllArgsConstructor
public class DemandeInscriptionController {
    private final DemandeInscriptionService demandeInscriptionService;

    @PostMapping("/create")
    public DemandeInscription create(@RequestBody DemandeInscription demandeInscription){
        return demandeInscriptionService.creer(demandeInscription);
    }

    /*@GetMapping("/read")
    public List<DemandeInscription> read() {
        return demandeInscriptionService.lire();
    }*/
    @GetMapping("/read")
    public List<DemandeInscription> demandeEnAttente(String status) {
        return demandeInscriptionService.findByStatusOrderByIdDesc("En attente");
    }
    @GetMapping("/count-demande-attente")
    public Page<DemandeInscription> countDemandeEnAttente(String status, Pageable pageable) {
        return demandeInscriptionService.findByStatus("En attente", pageable);
    }

    @PutMapping("update/{id}")
    public DemandeInscription update(@PathVariable Long id, @RequestBody DemandeInscription demandeInscription){
        return demandeInscriptionService.modifier(id, demandeInscription);
    }

    @PutMapping("update/status/{id}")
    public DemandeInscription updateOne(@PathVariable Long id, @RequestBody DemandeInscription demandeInscription){
        return demandeInscriptionService.modifierOne(id, demandeInscription);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return demandeInscriptionService.supprimer(id);
    }
}
