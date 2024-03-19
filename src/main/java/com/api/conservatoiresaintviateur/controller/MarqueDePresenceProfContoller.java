package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.modele.SeanceProfesseur;
import com.api.conservatoiresaintviateur.repository.CoursRepository;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import com.api.conservatoiresaintviateur.repository.SeanceProfesseurRepository;
import com.api.conservatoiresaintviateur.service.SeanceProfesseurService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/marque-de-presence-professeur")
@AllArgsConstructor
public class MarqueDePresenceProfContoller {
    private final SeanceProfesseurService marqueDePresenceProfService;
    private final ProfesseurRepository professeurRepository;
    private final SeanceProfesseurRepository seanceProfesseurRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @GetMapping("/count-heure-mensuel-by-month")
    public ResponseEntity<?> countApprenantByMonth(@RequestParam int month, @RequestParam Long id) {
        BigDecimal count = marqueDePresenceProfService.sumHeureEffectueByDateMarqueDePresence(month, id);
        return ResponseEntity.ok(count);
    }

    @PostMapping("/create-seances/{professeurId}/{coursId}")
    public ResponseEntity<List<SeanceProfesseur>> createSeances(
            @PathVariable Long professeurId,
            @PathVariable Long coursId,
            @RequestBody List<SeanceProfesseur> seances) {
        try {
            List<SeanceProfesseur> seancesCrees = marqueDePresenceProfService.creerSeances(professeurId, coursId, seances);
            System.out.println(seances);
            System.out.println(professeurId);
            return new ResponseEntity<>(seancesCrees, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/nombre-marque-de-presence-professeur")
    public ResponseEntity<Page<SeanceProfesseur>> getMarquesDePresenceProfesseurByCriteria(
            @RequestParam String presence,
            @RequestParam Long professeurId, Pageable pageable) {

        Page<SeanceProfesseur> seanceProfesseurs = marqueDePresenceProfService.findByPresenceProfesseurAndProffId(presence, professeurId, pageable);
        return ResponseEntity.ok(seanceProfesseurs);
    }

    @PutMapping("update/presence-professeur/{id}")
    public ResponseEntity<String> updatePresenceProfesseur(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String presence, @PathVariable Long id){
        marqueDePresenceProfService.updatePresenceProfesseur(date, heure, presence, id);
        return ResponseEntity.ok("Presence updated successfully.");
    }

    @GetMapping("/find/{id}")
    public List<SeanceProfesseurRepository.SeanceProfesseurProjection> getCoursByProf(
            @PathVariable Long id,
            @RequestParam String heure,
            @RequestParam Long domaineId
    ) {
        return marqueDePresenceProfService.findByDomaine(id, heure, domaineId);
    }
    @GetMapping("/find-all-seance/{id}")
    public List<SeanceProfesseurRepository.SeanceProfesseurProjection> getCoursByProf(
            @PathVariable Long id
    ) {
        return marqueDePresenceProfService.findAllSeance(id);
    }

    @GetMapping("/find-all-domaine/{id}")
    public List<Long> findAllDomaine(@PathVariable Long id) {
        return marqueDePresenceProfService.findAllDomaine(id);
    }

    @PutMapping("update/heure-debut")
    public ResponseEntity<String> updateheureDebut(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureDebut, @RequestParam Long id){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceProfService.updateheureDebut(date, heure, heureDebut, id);
            return ResponseEntity.ok("Heure Debut updated successfully.");
        } else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @PutMapping("update/heure-fin")
    public ResponseEntity<String> updateheureFin(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureFin, @RequestParam Long id){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceProfService.updateheureFin(date, heure, heureFin, id);
            return ResponseEntity.ok("Heure Fin updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @PutMapping("update/heure-effectue")
    public ResponseEntity<String> updateHeureEffectue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam BigDecimal heureEffectue, @RequestParam Long id){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceProfService.updateHeureEffectue(date, heure, heureEffectue, id);
            return ResponseEntity.ok("Heure Effectue updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
    @GetMapping("find-domaine-id-heure/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllDatesAndHeuresInscription(@PathVariable Long id) {
        List<Object[]> datesHeures = marqueDePresenceProfService.findAllDomaineAndHeure(id);

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("domaineId", dateHeure[0]);
            dateHeureObj.put("heure", dateHeure[1]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }

    @GetMapping("find-domaine-id-heure-seance/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllDomaineAndHeureWithSeances(@PathVariable Long id, Boolean isActif) throws JsonProcessingException {
        List<Object[]> domainesHeuresSeances = marqueDePresenceProfService.findAllDomaineAndHeureWithSeances(id, true);

        // Créez une structure pour stocker les données regroupées par domaineId, domaineNom et heure
        Map<Long, Map<String, Map<String, List<Map<String, Object>>>>> groupedData = new HashMap<>();

        for (Object[] domainesHeuresSeance : domainesHeuresSeances) {
            Long domaineId = (Long) domainesHeuresSeance[0];
            String domaineNom = (String) domainesHeuresSeance[1];
            String heure = (String) domainesHeuresSeance[2];
            List<SeanceProfesseur> seance = Arrays.asList((SeanceProfesseur) domainesHeuresSeance[3]);

            String json = objectMapper.writeValueAsString(seance);

            // Vérifiez si le domaineId existe déjà dans la map principale
            if (!groupedData.containsKey(domaineId)) {
                groupedData.put(domaineId, new HashMap<>());
            }

            // Vérifiez si le domaineNom existe déjà dans la map du domaineId
            if (!groupedData.get(domaineId).containsKey(domaineNom)) {
                groupedData.get(domaineId).put(domaineNom, new HashMap<>());
            }

            // Vérifiez si l'heure existe déjà dans la map du domaineId et domaineNom
            if (!groupedData.get(domaineId).get(domaineNom).containsKey(heure)) {
                groupedData.get(domaineId).get(domaineNom).put(heure, new ArrayList<>());
            }

            // Ajoutez les données actuelles dans la liste correspondant à domaineId, domaineNom et heure
            Map<String, Object> domaineHeureObj = new HashMap<>();
            domaineHeureObj.put("domaineId", domaineId);
            domaineHeureObj.put("domaineNom", domaineNom);
            domaineHeureObj.put("heure", heure);
            domaineHeureObj.put("seances", seance); // Ajoutez les séances si nécessaire

            groupedData.get(domaineId).get(domaineNom).get(heure).add(domaineHeureObj);
        }

        // Convertissez la structure de données en une liste
        List<Map<String, Object>> domainesHeuresList = new ArrayList<>();
        groupedData.forEach((domaineId, domaineNomMap) -> {
            domaineNomMap.forEach((domaineNom, heuresMap) -> {
                heuresMap.forEach((heure, seances) -> {
                    Map<String, Object> entry = new HashMap<>();
                    entry.put("domaineId", domaineId);
                    entry.put("domaineNom", domaineNom);
                    entry.put("heure", heure);
                    entry.put("seanceList", seances);
                    domainesHeuresList.add(entry);
                });
            });
        });

        return ResponseEntity.ok(domainesHeuresList);
    }

    @GetMapping("find-domaine-id-heure-seance-actif/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllDomaineAndHeureWithSeancesCoursActif(@PathVariable Long id, Boolean isActif, String status) throws JsonProcessingException {
        List<Object[]> domainesHeuresSeances = marqueDePresenceProfService.findAllDomaineAndHeureWithSeancesCoursActif(id, true, "En cours");

        // Créez une structure pour stocker les données regroupées par domaineId, domaineNom et heure
        Map<Long, Map<String, Map<String, List<Map<String, Object>>>>> groupedData = new HashMap<>();

        for (Object[] domainesHeuresSeance : domainesHeuresSeances) {
            Long domaineId = (Long) domainesHeuresSeance[0];
            String domaineNom = (String) domainesHeuresSeance[1];
            String heure = (String) domainesHeuresSeance[2];
            List<SeanceProfesseur> seance = Arrays.asList((SeanceProfesseur) domainesHeuresSeance[3]);

            String json = objectMapper.writeValueAsString(seance);

            // Vérifiez si le domaineId existe déjà dans la map principale
            if (!groupedData.containsKey(domaineId)) {
                groupedData.put(domaineId, new HashMap<>());
            }

            // Vérifiez si le domaineNom existe déjà dans la map du domaineId
            if (!groupedData.get(domaineId).containsKey(domaineNom)) {
                groupedData.get(domaineId).put(domaineNom, new HashMap<>());
            }

            // Vérifiez si l'heure existe déjà dans la map du domaineId et domaineNom
            if (!groupedData.get(domaineId).get(domaineNom).containsKey(heure)) {
                groupedData.get(domaineId).get(domaineNom).put(heure, new ArrayList<>());
            }

            // Ajoutez les données actuelles dans la liste correspondant à domaineId, domaineNom et heure
            Map<String, Object> domaineHeureObj = new HashMap<>();
            domaineHeureObj.put("domaineId", domaineId);
            domaineHeureObj.put("domaineNom", domaineNom);
            domaineHeureObj.put("heure", heure);
            domaineHeureObj.put("seances", seance); // Ajoutez les séances si nécessaire

            groupedData.get(domaineId).get(domaineNom).get(heure).add(domaineHeureObj);
        }

        // Convertissez la structure de données en une liste
        List<Map<String, Object>> domainesHeuresList = new ArrayList<>();
        groupedData.forEach((domaineId, domaineNomMap) -> {
            domaineNomMap.forEach((domaineNom, heuresMap) -> {
                heuresMap.forEach((heure, seances) -> {
                    Map<String, Object> entry = new HashMap<>();
                    entry.put("domaineId", domaineId);
                    entry.put("domaineNom", domaineNom);
                    entry.put("heure", heure);
                    entry.put("seanceList", seances);
                    domainesHeuresList.add(entry);
                });
            });
        });

        return ResponseEntity.ok(domainesHeuresList);
    }

    @PutMapping("update/heure-fin-effectue")
    public ResponseEntity<String> updateheureFinAndHeureEffectue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureFin, @RequestParam BigDecimal heureEffectue, @RequestParam Long id){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceProfService.updateHeureFinAndHeureEffectue(date, heure, heureFin, heureEffectue, id);
            return ResponseEntity.ok("Heure Fin updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }

    @PutMapping("update/heure-debut-fin-effectue")
    public ResponseEntity<String> updateHeureDebutAndheureFinAndHeureEffectue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String heure, @RequestParam String heureDebut, @RequestParam String heureFin, @RequestParam BigDecimal heureEffectue, @RequestParam Long id){
        Professeur professeur = professeurRepository.getById(id);
        System.out.println(professeur);
        if(professeur != null){
            marqueDePresenceProfService.updateHeureDebutAndHeureFinAndHeureEffectue(date, heure, heureDebut, heureFin, heureEffectue, id);
            return ResponseEntity.ok("Heure Fin, Heure Debut, HeureDebut updated successfully.");
        }else {
            return ResponseEntity.ok("Professeur non trouvé");
        }
    }
}
