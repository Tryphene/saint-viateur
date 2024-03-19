package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import com.api.conservatoiresaintviateur.repository.CoursRepository;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import com.api.conservatoiresaintviateur.service.CoursService;
import com.api.conservatoiresaintviateur.service.MarqueDePresenceService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/marque-de-presence")
@AllArgsConstructor
public class MarqueDePresenceController {
    private final MarqueDePresenceService marqueDePresenceService;
    private final CoursService coursService;
    private final ProfesseurRepository professeurRepository;
    private final CoursRepository coursRepository;

    @PostMapping("/create/{apprenantId}/{coursId}/{professeurId}")
    public MarqueDePresence creer(@PathVariable Long apprenantId, @PathVariable Long coursId, @PathVariable Long professeurId, @RequestBody MarqueDePresence marqueDePresence){
        return marqueDePresenceService.creer(apprenantId, coursId, professeurId, marqueDePresence);
    }

    /*@PostMapping("/create/{apprenantId}/{coursId}")
    public List<MarqueDePresence> creer(@PathVariable Long apprenantId, @PathVariable Long coursId, @RequestBody List<MarqueDePresence> marqueDePresences){
        List<MarqueDePresence> createdMarquesDePresence = new ArrayList<>();
        for (MarqueDePresence marqueDePresence : marqueDePresences) {
            createdMarquesDePresence.add(marqueDePresenceService.creer(apprenantId, coursId, marqueDePresence));
        }
        return createdMarquesDePresence;
    }*/

    @GetMapping("/find-by-apprenant/{apprenantId}")
    public List<MarqueDePresence> findByApprenantId(@PathVariable Long apprenantId) {
        return marqueDePresenceService.findByApprenantId(apprenantId);
    }

    @GetMapping("/find/{id}")
    public List<MarqueDePresence> find(@PathVariable Long id, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, String heure) {
        return marqueDePresenceService.findByProffIdAndDateMarqueDePresenceAndHeure(id, date, heure);
    }

    @GetMapping("/find-by-date/{id}/{domaineId}")
    public int findByDate(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, String heure, @PathVariable Long id, @PathVariable Long domaineId, Boolean isActif) {
        return marqueDePresenceService.countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieIdAndCoursIsActif(date, heure, id, domaineId, true);
    }

    @GetMapping("/read")
    public List<MarqueDePresence> read() {
        return marqueDePresenceService.lire();
    }

    @GetMapping("/find-by-apprenant-cours/{apprenantId}/{coursId}")
    public List<MarqueDePresence> findByApprenantIdAndCoursId(@PathVariable Long apprenantId, @PathVariable Long coursId) {
        return marqueDePresenceService.findByApprenantIdAndCoursId(apprenantId, coursId);
    }

    @PutMapping("update/presence-apprenant/{idApprenant}")
    public ResponseEntity<String> updatePresence(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String presence, @PathVariable Long idApprenant){
        marqueDePresenceService.updatePresence(date, heure, presence, idApprenant);
        return ResponseEntity.ok("Presence updated successfully.");
    }

    @PutMapping("update/presence-professeur")
    public ResponseEntity<String> updatePresenceProfesseur(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String presence, @PathVariable Long idApprenant){
        marqueDePresenceService.updatePresenceProfesseur(date, heure, presence, idApprenant);
        return ResponseEntity.ok("Presence updated successfully.");
    }
    @PutMapping("update/heure-debut")
    public ResponseEntity<String> updateheureDebut(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureDebut, @RequestParam Long id, @RequestParam Long idApprenant){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceService.updateheureDebut(date, heure, heureDebut, id, idApprenant);
            return ResponseEntity.ok("Heure Debut updated successfully.");
        } else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @PutMapping("update/heure-fin")
    public ResponseEntity<String> updateheureFin(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureFin, @RequestParam Long id, @RequestParam Long idApprenant){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceService.updateheureFin(date, heure, heureFin, id, idApprenant);
            return ResponseEntity.ok("Heure Fin updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @PutMapping("update/heure-effectue")
    public ResponseEntity<String> updateHeureEffectue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam Long heureEffectue, @RequestParam Long id, @RequestParam Long idApprenant){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceService.updateHeureEffectue(date, heure, heureEffectue, id, idApprenant);
            return ResponseEntity.ok("Heure Effectue updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }

    @PutMapping("update/heure-fin-effectue")
    public ResponseEntity<String> updateheureFinAndHeureEffectue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureFin, @RequestParam Long heureEffectue, @RequestParam Long id, @RequestParam Long idApprenant){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceService.updateHeureFinAndHeureEffectue(date, heure, heureFin, heureEffectue, id, idApprenant);
            return ResponseEntity.ok("Heure Fin updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }

    @PutMapping("update/heure-debut-fin-effectue")
    public ResponseEntity<String> updateHeureDebutAndheureFinAndHeureEffectue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureDebut, @RequestParam String heureFin, @RequestParam Long heureEffectue, @RequestParam Long id, @RequestParam Long idApprenant){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceService.updateHeureDebutAndHeureFinAndHeureEffectue(date, heure, heureDebut, heureFin, heureEffectue, id, idApprenant);
            return ResponseEntity.ok("Heure Fin, Heure Debut, HeureDebut updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @PutMapping("update/professeur")
    public ResponseEntity<String> updateProfesseur(@RequestParam Long idProf, @RequestParam Long idCours){
        Professeur professeur = professeurRepository.getById(idProf);
        Cours cours = coursRepository.getById(idCours);
        System.out.println(professeur);
        if(professeur != null || cours != null){
            marqueDePresenceService.updateProfesseur(idProf, idCours);
            return ResponseEntity.ok("Professeur updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @GetMapping("/find-by-date-coursid")
    public MarqueDePresence findByDateMarqueDePresenceAndCoursId(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam Long coursId) {
        return marqueDePresenceService.findByDateMarqueDePresenceAndCoursId(date, coursId);
    }

    @GetMapping("/count-heure-mensuel-by-month")
    public ResponseEntity<?> countApprenantByMonth(@RequestParam int month, @RequestParam Long id) {
        BigDecimal count = marqueDePresenceService.sumHeureEffectueByDateMarqueDePresence(month, id);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/count-presence-by-month/{id}")
    public ResponseEntity<?> countApprenantByMonth(@PathVariable Long id, @RequestParam int month, @RequestParam String presence) {
        Long count = marqueDePresenceService.countPresenceByDateMarqueDePresence(id, month, presence);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/read-dte-heure-cours")
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresInscription() {
        List<Object[]> datesHeures = marqueDePresenceService.findAllDateMarqueDePresenceAndHeure();

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("date", dateHeure[0]);
            dateHeureObj.put("heure", dateHeure[1]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }
    @GetMapping("/read-dte-heure-cours-by-prof/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresCoursByProf(@PathVariable Long id) {
        List<Object[]> datesHeures = marqueDePresenceService.findAllDateMarqueDePresenceAndHeureByProffId(id);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("date", dateHeure[0]);
            dateHeureObj.put("heure", dateHeure[1]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }

    @GetMapping("/read-dte-heure-cours-apprenant-by-prof/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresCoursAndApprenantByProf(@PathVariable Long id, String status) {
        List<Object[]> datesHeures = marqueDePresenceService.findAllDateMarqueDePresenceAndHeureAndApprenantIdByProffId(id, "En cours");

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("date", dateHeure[0]);
            dateHeureObj.put("heure", dateHeure[1]);
            dateHeureObj.put("apprenantId", dateHeure[2]);
            dateHeureObj.put("profId", dateHeure[3]);
            dateHeureObj.put("domaineId", dateHeure[4]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }
    @GetMapping("/read-dte-heure-cours-apprenant-prof")
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresCoursAndApprenant(String status) {
        List<Object[]> datesHeures = marqueDePresenceService.findAllDateMarqueDePresenceAndHeureAndApprenantId("En cours");

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("date", dateHeure[0]);
            dateHeureObj.put("heure", dateHeure[1]);
            dateHeureObj.put("apprenantId", dateHeure[2]);
            dateHeureObj.put("profId", dateHeure[3]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }

    @GetMapping("/read-cours-du-jour")
    public ResponseEntity<List<Map<String, Object>>> getAllCoursDuJour(String status, Boolean isActif) {
        List<Object[]> datesStatus = marqueDePresenceService.findAllCoursDuJour("En cours", true);

        List<Map<String, Object>> datesStatusReadable = new ArrayList<>();

        for (Object[] dateHeure : datesStatus) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("apprenantNom", dateHeure[0]);
            dateHeureObj.put("apprenantPrenom", dateHeure[1]);
            dateHeureObj.put("apprenantTelephone", dateHeure[2]);
            dateHeureObj.put("profNom", dateHeure[3]);
            dateHeureObj.put("profPrenom", dateHeure[4]);
            dateHeureObj.put("profTelephone", dateHeure[5]);
            dateHeureObj.put("nomCours", dateHeure[6]);
            dateHeureObj.put("dateMarqueDePresence", dateHeure[7]);
            dateHeureObj.put("heure", dateHeure[8]);
            dateHeureObj.put("id", dateHeure[9]);
            dateHeureObj.put("apprenantId", dateHeure[10]);

            datesStatusReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesStatusReadable);
    }

    @GetMapping("/marques-de-presence")
    public ResponseEntity<Page<MarqueDePresence>> getMarquesDePresenceByCriteria(
            @RequestParam String presence,
            @RequestParam Long apprenantId, Pageable pageable) {

        Page<MarqueDePresence> marquesDePresence = marqueDePresenceService.findByPresenceAndApprenantId(presence, apprenantId, pageable);
        return ResponseEntity.ok(marquesDePresence);
    }

    @GetMapping("/marques-de-presence-professeur")
    public ResponseEntity<Page<MarqueDePresence>> getMarquesDePresenceProfesseurByCriteria(
            @RequestParam String presence,
            @RequestParam Long professeurId, Pageable pageable) {

        Page<MarqueDePresence> marquesDePresence = marqueDePresenceService.findByPresenceProfesseurAndProffId(presence, professeurId, pageable);
        return ResponseEntity.ok(marquesDePresence);
    }

    /*@GetMapping("/marques-de-presence")
    public ResponseEntity<Page<MarqueDePresence>> getMarquesDePresenceAndApprenantByCriteria(
            @RequestParam String presence,
            @RequestParam Long apprenantId,
            @PageableDefault(size = 10) Pageable pageable) {

        Page<Object[]> marquesDePresenceAndApprenant = marqueDePresenceService.findMarquesDePresenceAndApprenantByCriteria(presence, apprenantId, pageable);

        List<MarqueDePresence> result = marquesDePresenceAndApprenant.getContent().stream()
                .map(objects -> {
                    MarqueDePresence marqueDePresence = (MarqueDePresence) objects[0];
                    Apprenant apprenant = (Apprenant) objects[1];
                    return new MarqueDePresence(marqueDePresence, apprenant);
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(new PageImpl<>(result, pageable, marquesDePresenceAndApprenant.getTotalElements()));
    }*/

    @GetMapping("/find-by-cours/{coursId}")
    public List<MarqueDePresence> findByCoursId(@PathVariable Long coursId) {
        return marqueDePresenceService.findByCoursId(coursId);
    }
}
