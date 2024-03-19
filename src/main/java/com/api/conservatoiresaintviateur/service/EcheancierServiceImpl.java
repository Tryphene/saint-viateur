package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.Echeancier;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.EcheancierRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class EcheancierServiceImpl implements EcheancierService {
    private final EcheancierRepository echeancierRepository;

    @Override
    public Echeancier creer(Long apprenantId, Long CoursId, Echeancier echeancier) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        Cours cours = new Cours();
        cours.setId(CoursId);
        echeancier.setApprenantEcheancier(apprenant);
        echeancier.setCoursEcheancier(cours);
        return echeancierRepository.save(echeancier);
    }

    @Override
    public List<Echeancier> lire() {
        return echeancierRepository.findAll();
    }

    @Override
    public List<Echeancier> findByApprenantEcheancierId(Long apprenantId) {
        return echeancierRepository.findByApprenantEcheancierId(apprenantId);
    }

    @Override
    public List<Echeancier> findByCoursEcheancierId(Long coursId) {
        return echeancierRepository.findByCoursEcheancierId(coursId);
    }

    @Override
    public List<String> findAllDatePaiementByStatus(String status) {
        return echeancierRepository.findAllDatePaiementByStatus(status);
    }

    @Override
    public List<Object[]> findAllDatePaiementAndStatusByApprenantEcheancierId(Long id, String status) {
        return echeancierRepository.findAllDatePaiementAndStatusByApprenantEcheancierId(id, status);
    }

    @Override
    public List<Object[]> findAllDatePaiementAndStatus(String status) {
        return echeancierRepository.findAllDatePaiementAndStatus(status);
    }

    @Override
    public List<Echeancier> findByDateEcheanceBetweenAndStatus(Date startDate, Date endDate, String status) {
        return echeancierRepository.findByDateEcheanceBetweenAndStatus(startDate, endDate, status);
    }

    @Override
    public List<Object[]> findAllByDatePaiementBetweenAndStatus(Date startDate, Date endDate, String status) {
        return echeancierRepository.findAllByDatePaiementBetweenAndStatus(startDate, endDate, status);
    }

    public List<Echeancier> getUsersWithUpcomingPayments() throws ParseException {
        /*LocalDate today = LocalDate.now();
        LocalDate twoWeeksLater = today.plusWeeks(2);*/

        Date today = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String todayStr = dateFormat.format(today);

// Créez une instance de Calendar et configurez-la avec la date de référence
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);

// Soustrayez une semaine (7 jours) à la date de référence
        calendar.add(Calendar.DAY_OF_YEAR, -7);
        Date dateSemainePrecedente = calendar.getTime();

// Ajoutez deux semaines (14 jours) à la date de référence pour obtenir deux semaines plus tard
        calendar.setTime(today);
        calendar.add(Calendar.DAY_OF_YEAR, 14);
        Date twoWeeksLater = calendar.getTime();
        return echeancierRepository.findByDateEcheanceBetweenAndStatus(today, twoWeeksLater, "Non payé");
    }

    @Override
    public Integer sumMontantByStatus(String status, Long id) {
        return echeancierRepository.sumMontantByStatus(status, id);
    }

    @Override
    public List<Echeancier> findByApprenantEcheancierIdAndCoursEcheancierId(Long apprenantId, Long coursId) {
        return echeancierRepository.findByApprenantEcheancierIdAndCoursEcheancierId(apprenantId, coursId);
    }

    @Override
    public void updatePaiement(Date date, String status, Date datePaie, Long id) {
        echeancierRepository.updatePaiement(date, status, datePaie, id);
    }

}
