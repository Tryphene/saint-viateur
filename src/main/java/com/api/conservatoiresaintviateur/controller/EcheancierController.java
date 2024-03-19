package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.DomaineCategorie;
import com.api.conservatoiresaintviateur.modele.Echeancier;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.service.EcheancierService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/echeancier")
@AllArgsConstructor
public class EcheancierController {
    private final EcheancierService echeancierService;

    @GetMapping("/read")
    public List<Echeancier> read() {
        return echeancierService.lire();
    }

    @PostMapping("/create/{apprenantId}/{coursId}")
    public Echeancier creer(@PathVariable Long apprenantId, @PathVariable Long coursId, @RequestBody Echeancier echeancier){
        return echeancierService.creer(apprenantId, coursId, echeancier);
    }

    @PutMapping("update-status-echeancier/{id}")
    public ResponseEntity<String> updatePaiement(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam String status, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date datePaie, @PathVariable Long id){
        echeancierService.updatePaiement(date, status, datePaie, id);
        return ResponseEntity.ok("Echeancier updated successfully.");
    }

    @GetMapping("/find-by-apprenant/{apprenantId}")
    public List<Echeancier> findByApprenantId(@PathVariable Long apprenantId) {
        return echeancierService.findByApprenantEcheancierId(apprenantId);
    }
    @GetMapping("/find-by-date")
    public List<Echeancier> findByDatePaiementBetweenAndStatus(@RequestParam  @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, @RequestParam String status) {
        return echeancierService.findByDateEcheanceBetweenAndStatus(startDate, endDate, status);
    }
    @GetMapping("/read-dte-paiement-status-by-apprenant/{id}")
    public ResponseEntity<List<Map<String, Object>>> getAllDatePaiementAndStatusByApprenantEcheancier(@PathVariable Long id, String status) {
        List<Object[]> datesStatus = echeancierService.findAllDatePaiementAndStatusByApprenantEcheancierId(id, "Non payé");

        List<Map<String, Object>> datesStatusReadable = new ArrayList<>();

        for (Object[] dateHeure : datesStatus) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("datePaiement", dateHeure[0]);
            dateHeureObj.put("status", dateHeure[1]);
            dateHeureObj.put("apprenantId", dateHeure[2]);
            dateHeureObj.put("apprenantNom", dateHeure[3]);
            dateHeureObj.put("apprenantPrenom", dateHeure[4]);
            dateHeureObj.put("apprenantMail", dateHeure[5]);
            dateHeureObj.put("coursId", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("montant", dateHeure[8]);

            datesStatusReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesStatusReadable);
    }
    @GetMapping("/read-dte-paiement-status")
    public ResponseEntity<List<Map<String, Object>>> getAllDatePaiementAndStatus(String status) {
        List<Object[]> datesStatus = echeancierService.findAllDatePaiementAndStatus("Non payé");

        List<Map<String, Object>> datesStatusReadable = new ArrayList<>();

        for (Object[] dateHeure : datesStatus) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("datePaiement", dateHeure[0]);
            dateHeureObj.put("status", dateHeure[1]);
            dateHeureObj.put("apprenantId", dateHeure[2]);
            dateHeureObj.put("apprenantNom", dateHeure[3]);
            dateHeureObj.put("apprenantPrenom", dateHeure[4]);
            dateHeureObj.put("apprenantMail", dateHeure[5]);
            dateHeureObj.put("coursId", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("montant", dateHeure[8]);

            datesStatusReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesStatusReadable);
    }

    @GetMapping("/read-dte-echeance")
    public ResponseEntity<List<Map<String, Object>>> getAllDatePaiementAndStatus(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, String status) {
        List<Object[]> datesStatus = echeancierService.findAllByDatePaiementBetweenAndStatus(startDate, endDate,"Non payé");

        List<Map<String, Object>> datesStatusReadable = new ArrayList<>();

        for (Object[] dateHeure : datesStatus) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("datePaiement", dateHeure[0]);
            dateHeureObj.put("status", dateHeure[1]);
            dateHeureObj.put("apprenantId", dateHeure[2]);
            dateHeureObj.put("apprenantNom", dateHeure[3]);
            dateHeureObj.put("apprenantPrenom", dateHeure[4]);
            dateHeureObj.put("apprenantMail", dateHeure[5]);
            dateHeureObj.put("coursId", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);
            dateHeureObj.put("montant", dateHeure[8]);

            datesStatusReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesStatusReadable);
    }

    @GetMapping("/sum-montant/{status}/{id}")
    public ResponseEntity<Integer> getSumMontantByStatus(@PathVariable String status, @PathVariable Long id) {
        Integer sumMontant = echeancierService.sumMontantByStatus(status, id);
        return ResponseEntity.ok(sumMontant);
    }

    @GetMapping("/find-by-cours/{coursId}")
    public List<Echeancier> findByCoursId(@PathVariable Long coursId) {
        return echeancierService.findByCoursEcheancierId(coursId);
    }


    @GetMapping("/find-by-apprenant-cours/{apprenantId}/{coursId}")
    public List<Echeancier> findByApprenantIdAndCoursId(@PathVariable Long apprenantId, @PathVariable Long coursId) {
        return echeancierService.findByApprenantEcheancierIdAndCoursEcheancierId(apprenantId, coursId);
    }
}
