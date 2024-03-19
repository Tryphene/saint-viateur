package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.DomaineCategorie;
import com.api.conservatoiresaintviateur.modele.HoraireMensuel;
import com.api.conservatoiresaintviateur.service.HoraireMensuelService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/horaire-mensuel")
@AllArgsConstructor
public class HoraireMensuelController {
    private HoraireMensuelService horaireMensuelService;

    @PostMapping("/create/{id}")
    public HoraireMensuel create(@PathVariable Long idProfesseur, @RequestBody HoraireMensuel horaireMensuel){
        return horaireMensuelService.creer(idProfesseur, horaireMensuel);
    }

    @PutMapping("update/heure-mensuel")
    public ResponseEntity<String> updateHeureMensuel(@RequestParam Integer heure, @RequestParam String mois, @RequestParam Long id){
        horaireMensuelService.updateHeureMensuelByProf(heure, mois, id);
        return ResponseEntity.ok("Presence updated successfully.");
    }

    @GetMapping("/read")
    public List<HoraireMensuel> read() {
        return horaireMensuelService.findAllByOrderByIdDesc();
    }

    @GetMapping("/read-by-mois/{id}")
    public Integer readByMois(@RequestParam String mois, @PathVariable Long id) {
        return horaireMensuelService.findHeureMensuelByMois(mois, id);
    }

    /*@GetMapping("/find-by-mois")
    public ResponseEntity<HoraireMensuel> findByMois(@RequestParam String mois) {
        HoraireMensuel horaireMensuel = horaireMensuelService.findByMois(mois);

        if (horaireMensuel != null) {
            return ResponseEntity.ok(horaireMensuel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

    @PutMapping("update/{id}")
    public HoraireMensuel update(@PathVariable Long id, @RequestBody HoraireMensuel horaireMensuel){
        return horaireMensuelService.modifier(id, horaireMensuel);
    }
}
