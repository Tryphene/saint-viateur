package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.VerificationToken;


public interface VerificationTokenService {

    VerificationToken creer(Long idParent, VerificationToken verificationToken);
    VerificationToken findByToken(String token);
    VerificationToken findByParentToken(Apprenant apprenant);



}
