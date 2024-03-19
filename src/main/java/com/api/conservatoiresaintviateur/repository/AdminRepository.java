package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    //List<Admin> findAllByOrderByIdDesc();
    //List<Admin> findByStatus(String status);

    Admin findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT status FROM Admin u WHERE email = :email")
    String getStatusByEmail(@Param("email") String email);
    List<Admin> findByStatusOrderByIdDesc(String status);

    List<Admin> findByNomContainingOrPrenomContainingOrEmailContaining(String nomRecherche, String prenomRecherche, String emailRecherche);
}
