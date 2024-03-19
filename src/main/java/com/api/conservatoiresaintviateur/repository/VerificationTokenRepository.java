package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
    VerificationToken findByParentToken(Apprenant apprenant);
}

