package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.MarqueDePresence;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import com.api.conservatoiresaintviateur.repository.MarqueDePresenceRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class MarqueDePresenceServiceImpl implements MarqueDePresenceService {
    private final MarqueDePresenceRepository marqueDePresenceRepository;

    @Override
    public MarqueDePresence creer(Long apprenantId, Long ProfesseurId, Long CoursId, MarqueDePresence marqueDePresence) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        Cours cours = new Cours();
        cours.setId(CoursId);
        Professeur professeur = new Professeur();
        professeur.setId(ProfesseurId);
        marqueDePresence.setApprenant(apprenant);
        marqueDePresence.setCours(cours);
        marqueDePresence.setProff(professeur);
        return marqueDePresenceRepository.save(marqueDePresence);
    }

    @Override
    public int countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieId(Date date, String heure, Long id, Long domaineId) {
        return marqueDePresenceRepository.countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieId(date, heure, id, domaineId);
    }

    @Override
    public int countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieIdAndCoursIsActif(Date date, String heure, Long id, Long domaineId, Boolean isActif) {
        return marqueDePresenceRepository.countByDateMarqueDePresenceAndHeureAndProffIdAndCoursDomaineCategorieIdAndCoursIsActif(date, heure, id, domaineId, isActif);
    }

    @Override
    public List<MarqueDePresence> lire() {
        return marqueDePresenceRepository.findAll();
    }

    @Override
    public List<MarqueDePresence> findByApprenantId(Long apprenantId) {
        return marqueDePresenceRepository.findByApprenantId(apprenantId);
    }

    @Override
    public List<MarqueDePresence> findByCoursId(Long coursId) {
        return marqueDePresenceRepository.findByCoursId(coursId);
    }

    @Override
    public List<Object[]> findAllDateMarqueDePresenceAndHeure() {
        return marqueDePresenceRepository.findAllDateMarqueDePresenceAndHeure();
    }

    @Override
    public List<Object[]> findAllDateMarqueDePresenceAndHeureByProffId(Long id) {
        return marqueDePresenceRepository.findAllDateMarqueDePresenceAndHeureByProffId(id);
    }

    @Override
    public List<Object[]> findAllDateMarqueDePresenceAndHeureAndApprenantIdByProffId(Long id, String status) {
        return marqueDePresenceRepository.findAllDateMarqueDePresenceAndHeureAndApprenantIdByProffId(id, status);
    }

    @Override
    public List<Object[]> findAllDateMarqueDePresenceAndHeureAndApprenantId(String status) {
        return marqueDePresenceRepository.findAllDateMarqueDePresenceAndHeureAndApprenantId(status);
    }

    @Override
    public List<MarqueDePresence> findByApprenantIdAndCoursId(Long apprenantId, Long coursId) {
        return marqueDePresenceRepository.findByApprenantIdAndCoursId(apprenantId, coursId);
    }

    @Override
    public List<Object[]> findAllCoursDuJour(String status, Boolean isActif) {
        return marqueDePresenceRepository.findAllCoursDuJour(status, isActif);
    }

    @Override
    public List<MarqueDePresence> findByProffIdAndDateMarqueDePresenceAndHeure(Long id, Date date, String heure) {
        return marqueDePresenceRepository.findByProffIdAndDateMarqueDePresenceAndHeure(id, date, heure);
    }

    @Override
    public Long countPresenceByDateMarqueDePresence(Long id, int month, String presence) {
        return marqueDePresenceRepository.countPresenceByDateMarqueDePresence(id, month, presence);
    }

    @Override
    public List<MarqueDePresence> findByProffAndDateMarqueDePresenceAndHeure(Professeur professeur, Date date, String heure) {
        return marqueDePresenceRepository.findByProffAndDateMarqueDePresenceAndHeure(professeur, date, heure);
    }

    @Override
    public void updatePresence(Date date, String heure, String presence, Long idApprenant) {
        marqueDePresenceRepository.updatePresence(date, heure, presence, idApprenant);
    }

    @Override
    public void updateHeureDebutAndHeureFinAndHeureEffectue(Date date, String heure, String heureDebut, String heureFin, Long heureEffectue, Long id, Long idApprenant) {
        marqueDePresenceRepository.updateHeureDebutAndHeureFinAndHeureEffectue(date, heure, heureDebut, heureFin, heureEffectue, id, idApprenant);
    }
    @Override
    public void updatePresenceProfesseur(Date date, String heure, String presence, Long idApprenant) {
        marqueDePresenceRepository.updatePresenceProfesseur(date, heure, presence, idApprenant);
    }

    @Override
    public void updateheureDebut(Date date, String heure, String heureDebut, Long id, Long idApprenant) {
        marqueDePresenceRepository.updateheureDebut(date, heure, heureDebut, id, idApprenant);
    }

    @Override
    public void updateheureFin(Date date, String heure, String heureDebut, Long id, Long idApprenant) {
        marqueDePresenceRepository.updateheureFin(date, heure, heureDebut, id, idApprenant);
    }

    @Override
    public void updateHeureFinAndHeureEffectue(Date date, String heure, String heureFin, Long heureEffectue, Long id, Long idApprenant) {
        marqueDePresenceRepository.updateHeureFinAndHeureEffectue(date, heure, heureFin, heureEffectue, id, idApprenant);
    }

    @Override
    public void updateHeureEffectue(Date date, String heure, Long heureEffectue, Long id, Long idApprenant) {
        marqueDePresenceRepository.updateHeureEffectue(date, heure, heureEffectue, id, idApprenant);
    }

    @Override
    public void updateProfesseur(Long idProf, Long idCours) {
        marqueDePresenceRepository.updateProfesseur(idProf, idCours);
    }

    /*@Override
    public MarqueDePresence updatePresence(Date date, String heure, String presence) {
        return marqueDePresenceRepository.updatePresence(date, heure, presence);
    }*/

    @Override
    public MarqueDePresence modifierPresenceApprenant(Long id, MarqueDePresence marqueDePresence) {
        return marqueDePresenceRepository.findById(id)
                .map(p -> {
                    p.setPresence(marqueDePresence.getPresence());
                    return marqueDePresenceRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public MarqueDePresence modifierPresenceProfesseur(Long id, MarqueDePresence marqueDePresence) {
        return marqueDePresenceRepository.findById(id)
                .map(p -> {
                    p.setPresenceProfesseur(marqueDePresence.getPresenceProfesseur());
                    return marqueDePresenceRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public BigDecimal sumHeureEffectueByDateMarqueDePresence(int month, Long id) {
        return marqueDePresenceRepository.sumHeureEffectueByDateMarqueDePresence(month, id);
    }

    @Override
    public Page<Object[]> findMarquesDePresenceAndApprenantByCriteria(String presence, Long apprenantId, Pageable pageable) {
        return marqueDePresenceRepository.findMarquesDePresenceAndApprenantByCriteria(presence, apprenantId, pageable);
    }

    @Override
    public Page<MarqueDePresence> findByPresenceAndApprenantId(String presence, Long id, Pageable pageable) {
        return marqueDePresenceRepository.findByPresenceAndApprenantId(presence, id, pageable);
    }

    @Override
    public Page<MarqueDePresence> findByPresenceProfesseurAndProffId(String presence, Long proffId, Pageable pageable) {
        return marqueDePresenceRepository.findByPresenceProfesseurAndProffId(presence, proffId, pageable);
    }

    @Override
    public MarqueDePresence findByDateMarqueDePresenceAndCoursId(Date date, Long id) {
        return marqueDePresenceRepository.findByDateMarqueDePresenceAndCoursId(date, id);
    }

    @Override
    public List<MarqueDePresence> findByDateMarqueDePresenceBetween(Date startDate, Date endDate) {
        return marqueDePresenceRepository.findByDateMarqueDePresenceBetween(startDate, endDate);
    }

    // Méthode de génération de rapport pour un apprenant donné
    public String generatePresenceReportForApprenant(Long apprenantId) {
        List<MarqueDePresence> marquesDePresence = findByApprenantId(apprenantId);
        return "y";
        // Générez le rapport à partir des données de marquesDePresence (par exemple, au format JSON ou CSV)
        // Vous pouvez utiliser des bibliothèques Java pour formater les données dans le rapport
        // et les renvoyer sous forme de chaîne
    }
}
