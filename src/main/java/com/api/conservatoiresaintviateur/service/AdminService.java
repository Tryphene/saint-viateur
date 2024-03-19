package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Admin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface AdminService  extends UserDetailsService {
    Admin creer(Admin admin);

    List<Admin> lire();
    Admin findByEmail(String mail);
    List<Admin> findByNomContainingOrPrenomContainingOrEmailContaining(String query);

    String getStatusByEmail(@Param("email") String email);

    boolean existsByEmail(String email);

    List<Admin> findByStatusOrderByIdDesc(String status);

    Admin modifier(Long id, Admin admin);
    Admin modifierAll(Long id, Admin admin);

    Admin modifierOne(Long id, Admin admin);

    String supprimer(Long id);
}
