package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/create")
    public Admin create(@RequestBody Admin admin){
        return adminService.creer(admin);
    }

    @GetMapping("/read")
    public List<Admin> read() {
        return adminService.lire();
    }

    @GetMapping("/by-mail")
    public Admin findByEmail(@RequestParam String email) {
        return adminService.findByEmail(email);
    }

    @PutMapping("update/{id}")
    public Admin update(@PathVariable Long id, @RequestBody Admin admin){
        return adminService.modifier(id, admin);
    }
    @PutMapping("update-all/{id}")
    public Admin updateAll(@PathVariable Long id, @RequestBody Admin admin){
        return adminService.modifierAll(id, admin);
    }

    @PutMapping("update/status/{id}")
    public Admin updateOne(@PathVariable Long id, @RequestBody Admin admin){
        return adminService.modifierOne(id, admin);
    }
    @GetMapping("/search")
    public List<Admin> search(@RequestParam(required = false) String query) {
        return adminService.findByNomContainingOrPrenomContainingOrEmailContaining(query);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return adminService.supprimer(id);
    }
}
