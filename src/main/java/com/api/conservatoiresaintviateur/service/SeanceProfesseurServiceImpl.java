package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.CoursRepository;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import com.api.conservatoiresaintviateur.repository.SeanceProfesseurRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class SeanceProfesseurServiceImpl implements SeanceProfesseurService {
    private final SeanceProfesseurRepository seanceProfesseurRepository;
    private final CoursRepository coursRepository;
    private final ProfesseurRepository professeurRepository;

    @Override
    public SeanceProfesseur creer(Long ProfesseurId, Long CoursId, SeanceProfesseur seanceProfesseur) {
        Cours cours = new Cours();
        cours.setId(CoursId);
        Professeur professeur = new Professeur();
        professeur.setId(ProfesseurId);
        seanceProfesseur.setCours(cours);
        seanceProfesseur.setProff(professeur);
        return seanceProfesseurRepository.save(seanceProfesseur);
    }

    public boolean existeMarqueDePresence(SeanceProfesseur seanceProfesseur) {
        // Utilisez le repository pour rechercher une marque de présence
        // avec les mêmes caractéristiques (date, heure, professeur, etc.).
        // Vous devrez adapter cela à votre modèle de données réel.
        List<SeanceProfesseur> marquesExistantes = seanceProfesseurRepository.findByProffAndDateMarqueDePresenceAndHeureAndCoursDomaineCategorieId(
                seanceProfesseur.getProff(), seanceProfesseur.getDateMarqueDePresence(), seanceProfesseur.getHeure(), seanceProfesseur.getCours().getDomaineCategorie().getId());

        // Si vous trouvez des marques de présence existantes, cela signifie
        // qu'une marque de présence avec des caractéristiques similaires existe déjà.
        return !marquesExistantes.isEmpty();
    }

    @Override
    public List<SeanceProfesseur> creerSeances(Long professeurId, Long coursId, List<SeanceProfesseur> seances) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

        Professeur professeur = professeurRepository.findById(professeurId).orElseThrow(() -> new EntityNotFoundException("Professeur non trouvé"));

        List<SeanceProfesseur> seancesACreer = new ArrayList<>();

        for (SeanceProfesseur seance : seances) {
            seance.setCours(cours);
            seance.setProff(professeur);

            if (!existeMarqueDePresence(seance)) {
                seancesACreer.add(seance);
            }
        }

        if (!seancesACreer.isEmpty()) {
            List<SeanceProfesseur> seancesCrees = seanceProfesseurRepository.saveAll(seancesACreer);
            return seancesCrees;
        }

        return Collections.emptyList();
    }


    @Override
    public List<SeanceProfesseur> findByProffAndDateMarqueDePresenceAndHeure(Professeur professeur, Date date, String heure) {
        return seanceProfesseurRepository.findByProffAndDateMarqueDePresenceAndHeure(professeur, date, heure);
    }

    @Override
    public List<SeanceProfesseur> findByProffAndDateMarqueDePresenceAndHeureAndCoursDomaineCategorieId(Professeur professeur, Date date, String heure, Long domaineId) {
        return seanceProfesseurRepository.findByProffAndDateMarqueDePresenceAndHeureAndCoursDomaineCategorieId(professeur, date, heure, domaineId);
    }

    @Override
    public BigDecimal sumHeureEffectueByDateMarqueDePresence(int month, Long id) {
        return seanceProfesseurRepository.sumHeureEffectueByDateMarqueDePresence(month, id);
    }

    @Override
    public  List<Long> findAllDomaine(Long id) {
        return seanceProfesseurRepository.findAllDomaine(id);
    }

    @Override
    public List<Object[]> findAllDomaineAndHeureWithSeances(Long id, Boolean isActif) {
        return seanceProfesseurRepository.findAllDomaineAndHeureWithSeances(id, isActif);
    }

    @Override
    public List<Object[]> findAllDomaineAndHeure(Long id) {
        return seanceProfesseurRepository.findAllDomaineAndHeure(id);
    }

    @Override
    public List<SeanceProfesseurRepository.SeanceProfesseurProjection> findByDomaine(Long id, String heure, Long domaineId) {
        return seanceProfesseurRepository.findByDomaine(id, heure, domaineId);
    }

    @Override
    public List<SeanceProfesseurRepository.SeanceProfesseurProjection> findAllSeance(Long id) {
        return seanceProfesseurRepository.findAllSeance(id);
    }

    @Override
    public Page<SeanceProfesseur> findByPresenceProfesseurAndProffId(String presence, Long proffId, Pageable pageable) {
        return seanceProfesseurRepository.findByPresenceProfesseurAndProffId(presence, proffId, pageable);
    }

    @Override
    public List<Object[]> findAllDomaineAndHeureWithSeancesCoursActif(Long id, Boolean isActif, String status) {
        return seanceProfesseurRepository.findAllDomaineAndHeureWithSeancesCoursActif(id, isActif, status);
    }

    @Override
    public void updatePresenceProfesseur(Date date, String heure, String presence, Long id) {
        seanceProfesseurRepository.updatePresenceProfesseur(date, heure, presence, id);
    }

    @Override
    public void updateheureDebut(Date date, String heure, String heureDebut, Long id) {
        seanceProfesseurRepository.updateheureDebut(date, heure, heureDebut, id);
    }

    @Override
    public void updateheureFin(Date date, String heure, String heureDebut, Long id) {
        seanceProfesseurRepository.updateheureFin(date, heure, heureDebut, id);
    }

    @Override
    public void updateHeureFinAndHeureEffectue(Date date, String heure, String heureFin, BigDecimal heureEffectue, Long id) {
        seanceProfesseurRepository.updateHeureFinAndHeureEffectue(date, heure, heureFin, heureEffectue, id);
    }

    @Override
    public void updateHeureDebutAndHeureFinAndHeureEffectue(Date date, String heure, String heureDebut, String heureFin, BigDecimal heureEffectue,  Long id) {
        seanceProfesseurRepository.updateHeureDebutAndHeureFinAndHeureEffectue(date, heure, heureDebut, heureFin, heureEffectue, id);
    }

    @Override
    public void updateHeureEffectue(Date date, String heure, BigDecimal heureEffectue, Long id) {
        seanceProfesseurRepository.updateHeureEffectue(date, heure, heureEffectue, id);
    }

    @Override
    public List<Object[]> findAllDateMarqueDePresenceAndHeureByProffId(Long id) {
        return seanceProfesseurRepository.findAllDateMarqueDePresenceAndHeureByProffId(id);
    }

    @Override
    public List<Object[]> findAllCoursDuJour(String status, Boolean isActif) {
        return seanceProfesseurRepository.findAllCoursDuJour(status, isActif);
    }
}
