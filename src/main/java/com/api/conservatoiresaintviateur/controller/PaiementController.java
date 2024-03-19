package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Paiement;
import com.api.conservatoiresaintviateur.service.AdminService;
import com.api.conservatoiresaintviateur.service.PaiementService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/paiement")
@AllArgsConstructor
public class PaiementController {
    private final PaiementService paiementService;

    @PostMapping("/create/{apprenantId}/{coursId}")
    public Paiement create(@PathVariable Long apprenantId, @PathVariable Long coursId,@RequestBody Paiement paiement){
        return paiementService.creer(apprenantId, coursId, paiement);
    }
    @GetMapping("/count-montant-by-apprenant/{id}")
    public ResponseEntity<?> countMontantByApprenantId(@PathVariable Long id) {
        Integer count = paiementService.sumMontantByApprenantId(id);
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-montant-by-apprenant-cours/{id}/{coursId}")
    public ResponseEntity<?> countMontantByApprenantIdAndCoursId(@PathVariable Long id, @PathVariable Long coursId) {
        Integer count = paiementService.sumMontantByApprenantIdAndCoursId(id, coursId);
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }

    @GetMapping("/read")
    public List<Paiement> read() {
        return paiementService.lire();
    }

    @GetMapping("/read-par-cours/{id}")
    public List<Paiement> readPaiementParCours(@PathVariable Long id) {
        return paiementService.readPaiementParCours(id);
    }

    @GetMapping("/find-by-cours")
    public Paiement findByCours(@PathVariable Long id) {
        return paiementService.findPaiementByCoursId(id);
    }

    @PutMapping("update/{id}")
    public Paiement update(@PathVariable Long id, @RequestBody Paiement paiement){
        return paiementService.modifier(id, paiement);
    }

    @GetMapping("/read-paiement")
    public ResponseEntity<List<Map<String, Object>>> readPaiement() {
        List<Object[]> datesHeures = paiementService.readPaiement();

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("admin", dateHeure[0]);
            dateHeureObj.put("datePaiement", dateHeure[1]);
            dateHeureObj.put("montant", dateHeure[2]);
            dateHeureObj.put("nomApprenant", dateHeure[3]);
            dateHeureObj.put("prenomApprenant", dateHeure[4]);
            dateHeureObj.put("telephoneApprenant", dateHeure[5]);
            dateHeureObj.put("id", dateHeure[6]);
            dateHeureObj.put("nomCours", dateHeure[7]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }

    @GetMapping("/count-montant-annuel")
    public ResponseEntity<?> countAnnuel() {
        BigDecimal count = paiementService.sumMontantForCurrentYear();
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-montant-total")
    public ResponseEntity<?> countFraisTotal() {
        Integer count = paiementService.sumMontant();
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-montant-mois")
    public ResponseEntity<?> countFraisParMois(@RequestParam int month) {
        BigDecimal count = paiementService.sumMontantByDatePaiementMonth(month);
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-montant-day")
    public ResponseEntity<?> countFraisParJour(@DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        BigDecimal count = paiementService.sumMontantByDatePaiementDay(date);
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
}
