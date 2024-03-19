package com.api.conservatoiresaintviateur.controller;

import aj.org.objectweb.asm.TypeReference;
import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.CoursRepository;
import com.api.conservatoiresaintviateur.service.ApprenantService;
import com.api.conservatoiresaintviateur.service.CategorieCoursService;
import com.api.conservatoiresaintviateur.service.CoursService;
import com.api.conservatoiresaintviateur.service.ProfesseurService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.util.*;

@RestController
@RequestMapping("/cours")
@AllArgsConstructor
public class CoursController {
    private final CoursService coursService;
    private final ApprenantService apprenantService;
    private final ProfesseurService professeurService;

    /*@PostMapping("/create/{id}/{idProfesseur}")
    public Cours create(@PathVariable Long id, @PathVariable Long idProfesseur, @RequestBody Cours cours){
        return coursService.creer(id, idProfesseur, cours);
    }*/

    @PostMapping("/create/{id}/{idProfesseur}/{idDomaine}")
    public Cours create(@PathVariable Long id, @PathVariable Long idProfesseur, @PathVariable Long idDomaine, @RequestBody Cours cours){
        return coursService.creer(id, idProfesseur, idDomaine, cours);
    }

    @GetMapping("/cours-for-marque-presence/{id}")
    public ResponseEntity<Cours> getCoursFormarqueDePresence(@PathVariable Long id) {
        Cours cours = coursService.findCoursBymarqueDePresenceId(id);
        if (cours != null) {
            return ResponseEntity.ok(cours);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/cours-for-echeancier/{id}")
    public ResponseEntity<Cours> getCoursForEcheancier(@PathVariable Long id) {
        Cours cours = coursService.findCoursByCoursEcheancierId(id);
        if (cours != null) {
            return ResponseEntity.ok(cours);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("update/professeur/{id}")
    public ResponseEntity<String> updatePresence(@RequestParam Long idProf, @PathVariable Long id) {
        Professeur professeur = professeurService.getById(idProf);

        if (professeur != null) {
            // Le professeur existe, vous pouvez mettre à jour le cours
            coursService.updateProfesseeur(idProf, id);
            return ResponseEntity.ok("Professeur mis à jour avec succès.");
        } else {
            // Le professeur n'existe pas, renvoyez une réponse appropriée
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professeur non trouvé.");
        }
    }

    /*@PostMapping("/create-with-schedule/{apprenantId}/{professeurId}/{idDomaine}")
    public Cours createWithSchedule(
            @PathVariable Long apprenantId,
            @PathVariable Long professeurId,
            @PathVariable Long idDomaine,
            @RequestBody CreateCoursWithScheduleRequest request) {

        return coursService.creerAvecEmploiDuTemps(apprenantId, request.getCours(), professeurId, idDomaine, request.getMarqueDePresence(), request.getEcheancier());
    }*/

    /*@PostMapping("/create-with-schedule/{apprenantId}/{professeurId}/{idDomaine}")
    public Cours createWithSchedule(
            @PathVariable Long apprenantId,
            @PathVariable Long professeurId,
            @PathVariable Long idDomaine,
            @RequestBody CreateCoursWithScheduleRequest request) {

        List<Echeancier> echeanciers = request.getEcheancier();
        System.out.println(echeanciers.isEmpty());

        // Si la liste d'échéanciers est vide ou null, créez le cours sans échéanciers
        if (echeanciers == null || echeanciers.isEmpty()) {
            return coursService.creerAvecEmploiDuTemps(apprenantId, request.getCours(), professeurId, idDomaine, request.getMarqueDePresence(), new ArrayList<>(), request.getSeanceProfesseurs());
        } else {
            return coursService.creerAvecEmploiDuTemps(apprenantId, request.getCours(), professeurId, idDomaine, request.getMarqueDePresence(), echeanciers, request.getSeanceProfesseurs());
        }
    }*/

    @PostMapping("/create-with-schedule/{apprenantId}/{idDomaine}")
    public Cours createWithSchedule(
            @PathVariable Long apprenantId,
            @PathVariable Long idDomaine,
            @RequestBody CreateCoursWithScheduleRequest request) {

        List<Echeancier> echeanciers = request.getEcheancier();
        System.out.println(echeanciers.isEmpty());

        // Récupérez l'ID du professeur depuis la requête
        Long professeurId = request.getProfesseur();

        // Vérifiez si la propriété professeur est null
        if (request.getProfesseur() == null) {
            // Si elle est null, vous pouvez gérer le cas où aucun professeur n'est spécifié
            // Vous pouvez soit créer le cours sans professeur, soit générer une erreur appropriée.
            // Dans cet exemple, nous allons créer le cours sans professeur.
            return coursService.creerAvecEmploiDuTemps(apprenantId, request.getCours(), null, idDomaine, request.getMarqueDePresence(), echeanciers, request.getSeanceProfesseurs());
        }

        // Si la propriété professeur n'est pas null, utilisez l'ID du professeur
        return coursService.creerAvecEmploiDuTemps(apprenantId, request.getCours(), professeurId, idDomaine, request.getMarqueDePresence(), echeanciers, request.getSeanceProfesseurs());
    }


    @GetMapping("/cours-by-day-and-status")
    public ResponseEntity<List<Cours>> getCoursByDayAndStatus(@RequestParam String dayOfWeek, String status) {
        List<Cours> cours = coursService.findCoursByDayOfWeekAndStatus(dayOfWeek, "En cours");
        return ResponseEntity.ok(cours);
    }

    @GetMapping("/read")
    public List<Cours> read() {
        return coursService.lire();
    }

    @GetMapping("/read-dte-debut-cours")
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresInscription() {
        List<Object[]> datesHeures = coursService.findAllDteDteDebutCoursAndHeureCours();

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("date", dateHeure[0]);
            dateHeureObj.put("heure", dateHeure[1]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }
    /*@GetMapping("/read-cours-apprenant-actif/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllCoursApprenantNonAcif(@PathVariable Long id, @RequestParam Boolean isActif) {
        List<Object[]> datesHeures = coursService.findAllCoursApprenantNonAcif(id, isActif);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("nomProfesseur", dateHeure[0]);
            dateHeureObj.put("prenomProfesseur", dateHeure[1]);
            dateHeureObj.put("telephoneProfesseur", dateHeure[2]);
            dateHeureObj.put("dateDebutCours", dateHeure[3]);
            dateHeureObj.put("dateFinCours", dateHeure[4]);
            dateHeureObj.put("heureCours", dateHeure[5]);
            dateHeureObj.put("forfait", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("echeancierUsed", dateHeure[8]);
            dateHeureObj.put("isActif", dateHeure[9]);
            dateHeureObj.put("id", dateHeure[10]);
            dateHeureObj.put("montant", dateHeure[11]);
            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }*/
    @GetMapping("/read-cours-apprenant-actif/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllCoursApprenantNonAcif(@PathVariable Long id, @RequestParam Boolean isActif) {
        List<Object[]> datesHeures = coursService.findAllCoursApprenantNonAcif(id, isActif);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            //dateHeureObj.put("nomProfesseur", dateHeure[0]);
            //dateHeureObj.put("prenomProfesseur", dateHeure[1]);
            //dateHeureObj.put("telephoneProfesseur", dateHeure[2]);
            dateHeureObj.put("dateDebutCours", dateHeure[3]);
            dateHeureObj.put("dateFinCours", dateHeure[4]);
            dateHeureObj.put("heureCours", dateHeure[5]);
            dateHeureObj.put("forfait", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("echeancierUsed", dateHeure[8]);
            dateHeureObj.put("isActif", dateHeure[9]);
            dateHeureObj.put("id", dateHeure[10]);
            dateHeureObj.put("montant", dateHeure[11]);
            dateHeureObj.put("idCours", dateHeure[12]);

            Optional<Object> nomprofesseurOptional = Optional.ofNullable(dateHeure[0]);
            nomprofesseurOptional.ifPresent(professeur -> dateHeureObj.put("nomProfesseur", professeur));

            Optional<Object> prenomprofesseurOptional = Optional.ofNullable(dateHeure[1]);
            prenomprofesseurOptional.ifPresent(professeur -> dateHeureObj.put("prenomProfesseur", professeur));

            Optional<Object> telprofesseurOptional = Optional.ofNullable(dateHeure[2]);
            telprofesseurOptional.ifPresent(professeur -> dateHeureObj.put("telephoneProfesseur", professeur));

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }
    @GetMapping("/read-cours-apprenant-actif-sans-prof/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllCoursApprenantNonAcifSansProf(@PathVariable Long id, @RequestParam Boolean isActif) {
        List<Object[]> datesHeures = coursService.findAllCoursApprenantNonActifSansProf(id, isActif);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("dateDebutCours", dateHeure[0]);
            dateHeureObj.put("dateFinCours", dateHeure[1]);
            dateHeureObj.put("heureCours", dateHeure[2]);
            dateHeureObj.put("forfait", dateHeure[3]);
            dateHeureObj.put("nomCours", dateHeure[4]);
            dateHeureObj.put("echeancierUsed", dateHeure[5]);
            dateHeureObj.put("isActif", dateHeure[6]);
            dateHeureObj.put("id", dateHeure[7]);
            dateHeureObj.put("montant", dateHeure[8]);
            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }

    @GetMapping("/read-cours-apprenant-actif-status/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllCoursApprenantIsActifByStatus(@PathVariable Long id, @RequestParam Boolean isActif, @RequestParam String status) {
        List<Object[]> datesHeures = coursService.findAllCoursApprenantIsActifByStatus(id, isActif, status);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("nomProfesseur", dateHeure[0]);
            dateHeureObj.put("prenomProfesseur", dateHeure[1]);
            dateHeureObj.put("telephoneProfesseur", dateHeure[2]);
            dateHeureObj.put("dateDebutCours", dateHeure[3]);
            dateHeureObj.put("dateFinCours", dateHeure[4]);
            dateHeureObj.put("heureCours", dateHeure[5]);
            dateHeureObj.put("forfait", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("echeancierUsed", dateHeure[8]);
            dateHeureObj.put("isActif", dateHeure[9]);
            dateHeureObj.put("id", dateHeure[10]);
            dateHeureObj.put("montant", dateHeure[11]);
            dateHeureObj.put("libelle", dateHeure[12]);
            dateHeureObj.put("professeur", dateHeure[13]);
            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }

    @PutMapping("update/status-cours/{id}")
    public ResponseEntity<String> updateStatusCours(@RequestParam String status, @PathVariable Long id){
        coursService.updateStatusCours(status, id);
        return ResponseEntity.ok("Status updated successfully.");
    }

    @PutMapping("update/is-actif/{id}")
    public Cours  modifierIsActif(@PathVariable Long id, @RequestBody Cours cours){
        return coursService.modifierIsActive(id, cours);
    }

    /*
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresInscription() {
        List<Object[]> datesHeures = coursService.findAllDteDteDebutCoursAndDteDteFinCoursAndHeureCours();

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("dateDebut", dateHeure[0]);
            dateHeureObj.put("dateFin", dateHeure[1]);
            dateHeureObj.put("heure", dateHeure[2]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }
    */

    @GetMapping("/cours/{id}")
    public List<Cours> find(@PathVariable Long id, String status) {
        Apprenant apprenant = apprenantService.getById(id);
        return coursService.findByParentAndStatus(apprenant, "En cours");
    }

    @GetMapping("/cours-is-actif-apprenant/{id}")
    public List<Cours> findCoursActifByStatus(@PathVariable Long id, @RequestParam String status, @RequestParam Boolean isActif) {
        Apprenant apprenant = apprenantService.getById(id);
        return coursService.findByParentAndStatusAndIsActif(id, status, isActif);
    }

    /*@GetMapping("/cours-is-actif-apprenant-status/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllCoursApprenantIsActifByStatus2(@PathVariable Long id, @RequestParam Boolean isActif, @RequestParam String status) {
        List<Object[]> datesHeures = coursService.findAllCoursApprenantIsActifByStatus2(id, isActif, status);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("nomProfesseur", dateHeure[0]);
            dateHeureObj.put("prenomProfesseur", dateHeure[1]);
            dateHeureObj.put("telephoneProfesseur", dateHeure[2]);
            dateHeureObj.put("dateDebutCours", dateHeure[3]);
            dateHeureObj.put("dateFinCours", dateHeure[4]);
            dateHeureObj.put("heureCours", dateHeure[5]);
            dateHeureObj.put("forfait", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("echeancierUsed", dateHeure[8]);
            dateHeureObj.put("isActif", dateHeure[9]);
            dateHeureObj.put("id", dateHeure[10]);
            dateHeureObj.put("montant", dateHeure[11]);
            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }*/

    @GetMapping("/cours-is-actif-professeur/{id}")
    public List<Cours> findCoursActifByStatusAndByProfesseur(@PathVariable Long id, @RequestParam String status, @RequestParam Boolean isActif) {
        Apprenant apprenant = apprenantService.getById(id);
        return coursService.findByProfesseurAndStatusAndIsActif(id, status, isActif);
    }
    /*@GetMapping("/cours-is-actif-professeur/{id}")
    public List<Cours> findCoursActifByStatusAndByProfesseurid(@PathVariable Long id, @RequestParam String status, @RequestParam Boolean isActif) {
        Apprenant apprenant = apprenantService.getById(id);
        return coursService.findByProfesseurIdAndStatusAndIsActif(id, status, isActif);
    }*/
    @GetMapping("/all-cours-actif/{id}")
    public List<Cours> findCoursActif(@PathVariable Long id, @RequestParam Boolean isActif) {
        Apprenant apprenant = apprenantService.getById(id);
        return coursService.findByParentAndIsActif(id, isActif);
    }

    @GetMapping("/cours-by-professeur/{id}")
    public List<Cours> findCoursByProfesseur(@PathVariable Long id, @RequestParam String status) {
        Professeur professeur = professeurService.getById(id);
        return coursService.findByProfesseurAndStatus(professeur, status);
    }

    @GetMapping("/all-cours/{id}")
    public List<Cours> findAll(@PathVariable Long id) {
        Apprenant apprenant = apprenantService.getById(id);
        return coursService.findByParent(apprenant);
    }

    @GetMapping("/all-cours-by-professeur/{id}")
    public List<Cours> findAllCoursByProfesseur(@PathVariable Long id) {
        Professeur professeur = professeurService.getById(id);
        return coursService.findByProfesseur(professeur);
    }

    @GetMapping("/exist-mail")
    public Boolean existEmail(@RequestParam String mail) {
        return apprenantService.existsByMail(mail);
    }

    @GetMapping("/somme-montant")
    public Integer sumMontant() {
        return coursService.sumMontant();
    }

    @GetMapping("/somme-montant-by-apprenant/{id}")
    public Integer sumMontantByParentId(@PathVariable Long id) {
        if(coursService.sumMontantByParentId(id) != null){
            return coursService.sumMontantByParentId(id);
        } else {
            return 0;
        }
    }
    @GetMapping("/somme-montant-by-apprenant-cours/{id}/{coursId}")
    public Integer sumMontantByParentIdAndCoursIdAndIsActif(@PathVariable Long id, @PathVariable Long coursId, @RequestParam Boolean isActif) {
        if(coursService.sumMontantByParentIdAndCoursIdAndIsActif(id, coursId, isActif) != null){
            return coursService.sumMontantByParentIdAndCoursIdAndIsActif(id, coursId, isActif);
        } else {
            return 0;
        }
    }
    @GetMapping("/somme-montant-by-apprenant-actif/{id}")
    public Integer sumMontantByParentIdAndIsActif(@PathVariable Long id, @RequestParam Boolean isActif) {
        if(coursService.sumMontantByParentIdAndIsActif(id, isActif) != null){
            return coursService.sumMontantByParentIdAndIsActif(id, isActif);
        } else {
            return 0;
        }
    }

    @GetMapping("/count-encours")
    public Page<Cours> encours(String status, boolean isActif, Pageable pageable) {
        return coursService.findByStatusAndIsActif("En cours", true, pageable);
    }

    @GetMapping("/count-by-apprenant")
    public Page<Cours> coursByApprenant(@RequestParam String status, @RequestParam Long id, Pageable pageable, @RequestParam Boolean isActif) {
        return coursService.findByStatusAndParentIdAndIsActif(status, id, pageable, isActif);
    }

    @GetMapping("/count-termine")
    public Page<Cours> termine(String status,  boolean isActif, Pageable pageable) {
        return coursService.findByStatusAndIsActif("Terminé", true , pageable);
    }

    @GetMapping("/exist-dte")
    public Boolean existDate(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        /*dd/MM/yyyy*/
        return coursService.existsByDteDteDebutCours(date);
    }
}
