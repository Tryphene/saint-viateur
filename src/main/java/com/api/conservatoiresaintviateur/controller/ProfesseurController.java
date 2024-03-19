package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import com.api.conservatoiresaintviateur.service.ProfesseurService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/professeur")
@AllArgsConstructor
public class ProfesseurController {
    private final ProfesseurService professeurService;

    @PostMapping("/create")
    public Professeur create(@RequestBody Professeur professeur){
        return professeurService.creer(professeur);
    }

    @PostMapping("/inscription")
    public ResponseEntity<String> inscrireEtudiantACours(@RequestParam Long professeurId, @RequestParam Long domaineCategorieId) {
        professeurService.enregistrerProfesseurADomaineCategorie(professeurId, domaineCategorieId);
        return ResponseEntity.ok("Inscription réussie !");
    }

    @GetMapping("/exist-mail-mdp")
    public Boolean existsByMailAndMdp(@RequestParam String mail, @RequestParam String mdp) {
        return professeurService.existsByEmailAndMdp(mail, mdp);
    }
    @GetMapping("/by-mail")
    public Professeur existsByMail(@RequestParam String email) {
        return professeurService.findByEmail(email);
    }

    @GetMapping("/exists-by-id-domaine-categories-id")
    public Boolean existsByIdAndDomaineCategories_Id(@RequestParam Long professeurId, @RequestParam Long domaineCategorieId) {
        return professeurService.existsByIdAndDomaineCategories_Id(professeurId, domaineCategorieId);
    }
    @GetMapping("/find-prof")
    public List<Professeur> findByStatusAndDisponibilite(String status, String Disponibilite) {
        return professeurService.findByStatusAndDisponibilite("Actif", "Disponible");
    }
    /*@GetMapping("/rechercherProfesseur")
    public List<Professeur> rechercherProfesseurs(@RequestParam String nom, @RequestParam String prenom) {
        return professeurService.rechercherProfesseurs(nom, prenom);
    }*/
    @GetMapping("/rechercherProfesseurs")
    public List<Professeur> rechercherProfesseurs(@RequestParam("recherche") String recherche) {
        // Appelez votre service pour effectuer la recherche en utilisant la chaîne de recherche
        List<Professeur> resultatRecherche = professeurService.rechercherProfesseurs(recherche);
        return resultatRecherche;
    }

    @GetMapping("/search")
    public List<Professeur> search(@RequestParam(required = false) String query) {
        return professeurService.findByNomContainingOrPrenomContainingOrEmailContaining(query);
    }

    @GetMapping("/find-prof/{id}")
    public List<ProfesseurRepository.ProfesseurProjection> findProfesseur(@PathVariable Long id) {
        Professeur professeur = professeurService.getById(id);
        return professeurService.findProfesseur(id);
    }
    @GetMapping("/find-salaire/{id}")
    public Integer findSalaireProfesseur(@PathVariable Long id) {
        return professeurService.findProfesseurSalaire(id);
    }

    @PutMapping("update/salaire/{id}")
    public ResponseEntity<String> updateSalaire(@RequestBody Integer salaire, @PathVariable Long id){
        Professeur professeur = professeurService.getById(id);
        if(professeur != null){
            professeurService.updateSalaireProfesseur(salaire, id);
            return ResponseEntity.ok("Salaire updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @GetMapping("/by-domaine/{id}/status/{status}/disponibilite/{disponibilite}")
    public ResponseEntity<List<Professeur>> getProfesseursByDomaineCategoriesAndStatus(
            @PathVariable Long id,
            @PathVariable String status,
            @PathVariable String disponibilite) {
        List<Professeur> professeurs = professeurService.getProfesseursByDomaineCategoriesAndStatusAndDisponibilite(id, status, disponibilite);
        return ResponseEntity.ok(professeurs);
    }

    @GetMapping("/count")
    public Page<Professeur> count(Pageable pageable) {
        return professeurService.findAll(pageable);
    }
    @GetMapping("/professeurs/{id}")
    public ResponseEntity<List<Professeur>> getProfesseursByDomaineCategorie(@PathVariable Long id) {
        List<Professeur> professeurs = professeurService.getProfesseursByDomaineCategories(id);
        return ResponseEntity.ok(professeurs);
    }

    @GetMapping("/read")
    public List<Professeur> read() {
        return professeurService.findAllByOrderByIdDesc();
    }

    @GetMapping("/professeur-for-cours/{coursId}")
    public ResponseEntity<Professeur> getProfesseurForCours(@PathVariable Long coursId) {
        Professeur professeur = professeurService.findProfesseurByCoursId(coursId);
        if (professeur != null) {
            return ResponseEntity.ok(professeur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create-with-horaire")
    public Professeur createWithHoraire(
            @RequestBody CreateProfesseurWithHoraireRequest request) {

        return professeurService.creerAvecHoraireMensuel(request.getProfesseur(), request.getHoraireMensuel());
    }

    @GetMapping("/professeur-for-marque-presence/{id}")
    public ResponseEntity<Professeur> getProfesseurFormarqueDePresence(@PathVariable Long id) {
        Professeur professeur = professeurService.findProfesseurBymarqueDePresenceId(id);
        if (professeur != null) {
            return ResponseEntity.ok(professeur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/professeur-for-horaire-mensuel/{id}")
    public ResponseEntity<Professeur> getProfesseurForHoraireMensuel(@PathVariable Long id) {
        Professeur professeur = professeurService.findProfesseurByHoraireMensuel(id);
        if (professeur != null) {
            return ResponseEntity.ok(professeur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/read/{id}")
    public Professeur readOne(@PathVariable Long id) {
        return professeurService.findProfesseurById(id);
    }

    @PutMapping("update/{id}")
    public Professeur update(@PathVariable Long id, @RequestBody Professeur professeur){
        return professeurService.modifier(id, professeur);
    }
    @PutMapping("update-all/{id}")
    public Professeur updateAll(@PathVariable Long id, @RequestBody Professeur professeur){
        return professeurService.modifierAll(id, professeur);
    }

    @PutMapping("update/status/{id}")
    public Professeur updateOne(@PathVariable Long id, @RequestBody Professeur professeur){
        return professeurService.modifierOne(id, professeur);
    }
    @PutMapping("update/salaire-prof/{id}")
    public Professeur updateSalaire(@PathVariable Long id, @RequestBody Professeur professeur){
        return professeurService.modifierSalaire(id, professeur);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return professeurService.supprimer(id);
    }
}
