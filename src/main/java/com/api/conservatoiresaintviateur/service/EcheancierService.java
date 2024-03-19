package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Echeancier;
import org.springframework.data.repository.query.Param;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface EcheancierService {
    Echeancier creer(Long apprenantId, Long CoursId, Echeancier echeancier);
    List<Echeancier> lire();
    List<Echeancier> findByApprenantEcheancierId(Long apprenantId);
    List<Echeancier> findByCoursEcheancierId(Long coursId);
    List<String> findAllDatePaiementByStatus(String status);
    List<Object[]> findAllDatePaiementAndStatusByApprenantEcheancierId(Long id, String status);
    List<Object[]> findAllDatePaiementAndStatus(String status);
    List<Echeancier> findByDateEcheanceBetweenAndStatus(Date startDate, Date endDate, String status);
    List<Object[]> findAllByDatePaiementBetweenAndStatus(Date startDate, Date endDate, String status);
    List<Echeancier> getUsersWithUpcomingPayments() throws ParseException;
    Integer sumMontantByStatus(String status, Long id);
    List<Echeancier> findByApprenantEcheancierIdAndCoursEcheancierId(Long apprenantId, Long coursId);
    void updatePaiement(@Param("date") Date date, @Param("status") String status, @Param("datePaie") Date datePaie, Long id);
}
