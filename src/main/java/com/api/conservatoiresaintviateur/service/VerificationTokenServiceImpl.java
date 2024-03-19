package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.VerificationToken;
import com.api.conservatoiresaintviateur.repository.VerificationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Calendar;

@Service
@AllArgsConstructor
public class VerificationTokenServiceImpl implements VerificationTokenService {
    private final VerificationTokenRepository verificationTokenRepository;

    @Override
    public VerificationToken creer(Long idParent, VerificationToken verificationToken) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(idParent);
        verificationToken.setExpireTime(expireDate(60));
        verificationToken.setParentToken(apprenant);
        return verificationTokenRepository.save(verificationToken);
    }

    @Transactional
    public VerificationToken findByToken(String token) {
        return verificationTokenRepository.findByToken(token);
    }

    @Transactional
    public VerificationToken findByParentToken(Apprenant apprenant) {
        return verificationTokenRepository.findByParentToken(apprenant);
    }

    private Timestamp expireDate(int expireTempsMin) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expireTempsMin);
        return new Timestamp(calendar.getTime().getTime());
    }
}
