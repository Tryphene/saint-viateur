package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.FraisInscriptionPaiement;
import com.api.conservatoiresaintviateur.modele.Paiement;
import com.api.conservatoiresaintviateur.service.FraisInscriptionPaiementService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.util.*;

@RestController
@RequestMapping("paiement-frais")
@AllArgsConstructor
public class FraisInscriptionPaiementController {
    private final FraisInscriptionPaiementService fraisInscriptionPaiementService;

    @PostMapping("/create/{apprenantId}")
    public FraisInscriptionPaiement create(@PathVariable Long apprenantId, @RequestBody FraisInscriptionPaiement fraisInscriptionPaiement){
        return fraisInscriptionPaiementService.creer(apprenantId, fraisInscriptionPaiement);
    }
    @GetMapping("/count-frais-total")
    public ResponseEntity<?> countFraisTotal() {
        Integer count = fraisInscriptionPaiementService.sumFraisInscription();
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-frais-mois")
    public ResponseEntity<?> countFraisParMois(@RequestParam int month) {
        BigDecimal count = fraisInscriptionPaiementService.sumFraisInscriptionByDatePaiementMonth(month);
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-frais-annee")
    public ResponseEntity<?> countFraisParAnnee() {
        BigDecimal count = fraisInscriptionPaiementService.sumFraisInscriptionForCurrentYear();
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }
    @GetMapping("/count-frais-day")
    public ResponseEntity<?> countFraisParJour(@DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        BigDecimal count = fraisInscriptionPaiementService.sumFraisInscriptionByDatePaiementDay(date);
        if(count != null){
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.ok(0);
        }
    }

    @GetMapping("/read")
    public List<FraisInscriptionPaiement> read() {
        return fraisInscriptionPaiementService.lire();
    }

    @GetMapping("/find-by-apprenant")
    public FraisInscriptionPaiement findByApprenant(@PathVariable Long id) {
        return fraisInscriptionPaiementService.findFraisInscriptionPaiementByApprenantPaiementFraisId(id);
    }

    @PutMapping("update/{id}")
    public FraisInscriptionPaiement update(@PathVariable Long id, @RequestBody FraisInscriptionPaiement fraisInscriptionPaiement){
        return fraisInscriptionPaiementService.modifier(id, fraisInscriptionPaiement);
    }
    @GetMapping("/read-frais")
    public ResponseEntity<List<Map<String, Object>>> readFraisInscription() {
        List<Object[]> datesHeures = fraisInscriptionPaiementService.readFraisInscription();

        List<Map<String, Object>> datesHeuresReadable = new ArrayList<>();

        for (Object[] dateHeure : datesHeures) {
            Map<String, Object> dateHeureObj = new HashMap<>();
            dateHeureObj.put("admin", dateHeure[0]);
            dateHeureObj.put("datePaiement", dateHeure[1]);
            dateHeureObj.put("fraisInscription", dateHeure[2]);
            dateHeureObj.put("nomApprenant", dateHeure[3]);
            dateHeureObj.put("prenomApprenant", dateHeure[4]);
            dateHeureObj.put("telephoneApprenant", dateHeure[5]);
            dateHeureObj.put("id", dateHeure[6]);

            datesHeuresReadable.add(dateHeureObj);
        }

        return ResponseEntity.ok(datesHeuresReadable);
    }
}
