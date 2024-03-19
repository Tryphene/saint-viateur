package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.CoursRepository;
import com.api.conservatoiresaintviateur.repository.MarqueDePresenceRepository;
import com.api.conservatoiresaintviateur.repository.SeanceProfesseurRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.util.*;
import java.time.format.TextStyle;

@Service
@AllArgsConstructor
public class CoursServiceImpl implements CoursService {
    private final CoursRepository coursRepository;
    private final MarqueDePresenceRepository marqueDePresenceRepository;
    private final MarqueDePresenceService marqueDePresenceService;
    private final EcheancierService echeancierService;
    private final SeanceProfesseurService seanceProfesseurService;
    @Override
    public Integer sumMontant() {
        return coursRepository.sumMontant();
    }

    @Override
    public Integer sumMontantByParentId(Long id) {
        return coursRepository.sumMontantByParentId(id);
    }

    @Override
    public void updateStatusCours(String status, Long id) {
        coursRepository.updateStatusCours(status, id);
    }

    @Override
    public List<CoursRepository.CoursProjection> findByParentAndStatusAndIsActifW(Long id, String status, Boolean isActif) {
        return coursRepository.findByParentAndStatusAndIsActifW(id, status, isActif);
    }

    @Override
    public Integer sumMontantByParentIdAndCoursIdAndIsActif(Long id, Long coursId, Boolean isActif) {
        return coursRepository.sumMontantByParentIdAndCoursIdAndIsActif(id, coursId, isActif);
    }

    @Override
    public Integer sumMontantByParentIdAndIsActif(Long id, Boolean isActif) {
        return coursRepository.sumMontantByParentIdAndIsActif(id, isActif);
    }

    @Override
    public Cours creer(Long idParent, Long idProfesseur, Long idDomaine, Cours cours) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(idParent);
        Professeur professeur = new Professeur();
        professeur.setId(idProfesseur);
        DomaineCategorie domaineCategorie = new DomaineCategorie();
        domaineCategorie.setId(idDomaine);
        cours.setParent(apprenant);
        cours.setProfesseur(professeur);
        cours.setDomaineCategorie(domaineCategorie);
        return coursRepository.save(cours);
    }

    /*public Cours creerAvecEmploiDuTemps(Long apprenantId, Long coursId, Cours cours) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        Professeur professeur = new Professeur();
        professeur.setId(coursId);
        cours.setParent(apprenant);
        cours.setProfesseur(professeur);

        // Enregistrer le cours dans la base de données
        Cours nouveauCours = coursRepository.save(cours);

        // Créer un emploi du temps associé au cours
        MarqueDePresence marqueDePresence = new MarqueDePresence();
        marqueDePresence.setApprenant(apprenant);
        marqueDePresence.setCours(nouveauCours);
        marqueDePresenceService.creer(apprenantId, coursId, marqueDePresence);

        return nouveauCours;
    }*/

    /*@Transactional
    public Cours creerAvecEmploiDuTemps(Long apprenantId,  Cours cours, Long professeurId, Long idDomaine, List<MarqueDePresence> marqueDePresences, List<Echeancier> echeanciers, List<SeanceProfesseur> seanceProfesseurs) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        Professeur professeur = new Professeur();
        professeur.setId(professeurId);
        DomaineCategorie domaineCategorie = new DomaineCategorie();
        domaineCategorie.setId(idDomaine);
        cours.setParent(apprenant);
        cours.setProfesseur(professeur);
        cours.setDomaineCategorie(domaineCategorie);
        Cours nouveauCours = coursRepository.save(cours);

        // Créer les emplois du temps associés au cours
        for (MarqueDePresence marqueDePresence : marqueDePresences) {
            marqueDePresence.setApprenant(apprenant);
            marqueDePresence.setCours(nouveauCours);
            marqueDePresence.setProff(professeur);
            marqueDePresenceService.creer(apprenantId, professeurId, nouveauCours.getId(), marqueDePresence);
        }

            // Créer les emplois du temps associés au cours
            for (SeanceProfesseur seanceProfesseur : seanceProfesseurs) {
                seanceProfesseur.setCours(nouveauCours);
                seanceProfesseur.setProff(professeur);

                if (!existeMarqueDePresence(seanceProfesseur)) {
                    // Si elle n'existe pas, insérez-la
                    seanceProfesseurService.creer(professeurId, nouveauCours.getId(), seanceProfesseur);
                }
            }

        if (!echeanciers.isEmpty()) {
            for (Echeancier echeancier : echeanciers) {
                echeancier.setApprenantEcheancier(apprenant);
                echeancier.setCoursEcheancier(nouveauCours);
                echeancierService.creer(apprenantId, nouveauCours.getId(), echeancier);

            }
        }
            return nouveauCours;
    }*/

    @Transactional
    public Cours creerAvecEmploiDuTemps(Long apprenantId, Cours cours, Long professeurId, Long idDomaine, List<MarqueDePresence> marqueDePresences, List<Echeancier> echeanciers, List<SeanceProfesseur> seanceProfesseurs) {
        Apprenant apprenant = new Apprenant();
        apprenant.setId(apprenantId);
        DomaineCategorie domaineCategorie = new DomaineCategorie();
        domaineCategorie.setId(idDomaine);
        cours.setParent(apprenant);
        cours.setDomaineCategorie(domaineCategorie);

        // Vérifier si un professeur a été spécifié
        if (professeurId != null) {
            Professeur professeur = new Professeur();
            professeur.setId(professeurId);
            cours.setProfesseur(professeur);
        }

        Cours nouveauCours = coursRepository.save(cours);


        if (!echeanciers.isEmpty()) {
            for (Echeancier echeancier : echeanciers) {
                System.out.println(echeancier.getDatePaiement());
                echeancier.setApprenantEcheancier(apprenant);
                echeancier.setCoursEcheancier(nouveauCours);
                echeancierService.creer(apprenantId, nouveauCours.getId(), echeancier);

            }
        }

        // Créer les emplois du temps associés au cours
        for (MarqueDePresence marqueDePresence : marqueDePresences) {
            marqueDePresence.setApprenant(apprenant);
            marqueDePresence.setCours(nouveauCours);

            // Si un professeur est associé au cours, définissez-le
            if (cours.getProfesseur() != null) {
                marqueDePresence.setProff(cours.getProfesseur());
            }

            marqueDePresenceService.creer(apprenantId, professeurId, nouveauCours.getId(), marqueDePresence);
        }

        // Créer les emplois du temps associés au cours
        for (SeanceProfesseur seanceProfesseur : seanceProfesseurs) {
            seanceProfesseur.setCours(nouveauCours);

            // Si un professeur est associé au cours, définissez-le
            if (cours.getProfesseur() != null) {
                seanceProfesseur.setProff(cours.getProfesseur());
            }

            if (!existeMarqueDePresence(seanceProfesseur)) {
                // Si elle n'existe pas, insérez-la
                seanceProfesseurService.creer(professeurId, nouveauCours.getId(), seanceProfesseur);
            }
        }

        return nouveauCours;
    }

    public boolean existeMarqueDePresence(SeanceProfesseur seanceProfesseur) {
        // Utilisez le repository pour rechercher une marque de présence
        // avec les mêmes caractéristiques (date, heure, professeur, etc.).
        // Vous devrez adapter cela à votre modèle de données réel.
        List<SeanceProfesseur> marquesExistantes = seanceProfesseurService.findByProffAndDateMarqueDePresenceAndHeureAndCoursDomaineCategorieId(
                seanceProfesseur.getProff(), seanceProfesseur.getDateMarqueDePresence(), seanceProfesseur.getHeure(), seanceProfesseur.getCours().getDomaineCategorie().getId());

        // Si vous trouvez des marques de présence existantes, cela signifie
        // qu'une marque de présence avec des caractéristiques similaires existe déjà.
        return !marquesExistantes.isEmpty();
    }

    @Override
    public Cours findCoursByCoursEcheancierId(Long id) {
        return coursRepository.findCoursByCoursEcheancierId(id);
    }

    @Override
    public List<Cours> lire() {
        return coursRepository.findAll();
    }

    @Override
    public void updateProfesseeur(@Param("idProf") Long idProf, Long id) {
        coursRepository.updateProfesseeur(idProf, id);
    }

    @Override
    public Cours findCoursBymarqueDePresenceId(Long id) {
        return coursRepository.findCoursBymarqueDePresenceId(id);
    }

    @Override
    public boolean existsByDteDteDebutCours(Date dteDteDebutCours) {
        return coursRepository.existsByDteDteDebutCours(dteDteDebutCours);
    }

    @Override
    public List<Object[]> findAllDteDteDebutCoursAndHeureCours() {
        return coursRepository.findAllDteDteDebutCoursAndHeureCours();
    }

    @Override
    public List<Object[]> findAllCoursApprenantNonAcif(Long id, Boolean isActif) {
        return coursRepository.findAllCoursApprenantNonAcif(id, isActif);
    }

    @Override
    public List<Object[]> findAllCoursApprenantNonActifSansProf(Long id, Boolean isActif) {
        return coursRepository.findAllCoursApprenantNonActifSansProf(id, isActif);
    }

    @Override
    public List<Object[]> findAllCoursApprenantIsActifByStatus(Long id, Boolean isActif, String status) {
        return coursRepository.findAllCoursApprenantIsActifByStatus(id, isActif, status);
    }

    @Override
    public List<Object[]> findAllDteDteDebutCoursAndHeureCoursByProfesseurId(Long id) {
        return findAllDteDteDebutCoursAndHeureCoursByProfesseurId(id);
    }

    /*@Override
    public List<Object[]> findAllDteDteDebutCoursAndDteDteFinCoursAndHeureCours() {
        return coursRepository.findAllDteDteDebutCoursAndDteFinCoursAndHeureCours();
    }*/

    public List<Cours> findCoursByDayOfWeekAndStatus(String dayOfWeek, String status) {
        int dayOfWeekValue = DayOfWeek.valueOf(dayOfWeek.toUpperCase()).getValue();
        return coursRepository.findCoursByDayOfWeekAndStatus(dayOfWeekValue, status);
    }

    private DayOfWeek getFormattedDayOfWeek(String dayOfWeek) {
        String upperCaseDayOfWeek = dayOfWeek.toUpperCase();
        switch (upperCaseDayOfWeek) {
            case "LUNDI":
                return DayOfWeek.MONDAY;
            case "MARDI":
                return DayOfWeek.TUESDAY;
            case "MERCREDI":
                return DayOfWeek.WEDNESDAY;
            case "JEUDI":
                return DayOfWeek.THURSDAY;
            case "VENDREDI":
                return DayOfWeek.FRIDAY;
            case "SAMEDI":
                return DayOfWeek.SATURDAY;
            case "DIMANCHE":
                return DayOfWeek.SUNDAY;
            default:
                throw new IllegalArgumentException("Jour de la semaine invalide : " + dayOfWeek);
        }
    }

    @Override
    public List<Cours> findByParentAndStatus(Apprenant apprenant, String status) {
        return coursRepository.findByParentAndStatus(apprenant, status);
    }

    @Override
    public List<Cours> findByParentAndStatusAndIsActif(Long id, String status, Boolean isActif) {
        return coursRepository.findByParentAndStatusAndIsActif(id, status, isActif);
    }

    @Override
    public List<Cours> findByProfesseurAndStatusAndIsActif(Long id, String status, Boolean isActif) {
        return coursRepository.findByProfesseurAndStatusAndIsActif(id, status, isActif);
    }

    @Override
    public List<Cours> findByParentAndIsActif(Long id, Boolean isActif) {
        return coursRepository.findByParentAndIsActif(id, isActif);
    }

    @Override
    public List<Cours> findByProfesseurAndStatus(Professeur professeur, String status) {
        return coursRepository.findByProfesseurAndStatus(professeur, status);
    }

    @Override
    public List<Cours> findByParent(Apprenant apprenant) {
        return coursRepository.findByParent(apprenant);
    }

    @Override
    public List<Cours> findByProfesseur(Professeur professeur) {
        return coursRepository.findByProfesseur(professeur);
    }

    @Override
    public Page<Cours> findByStatusAndIsActif(String status, Boolean isActif, Pageable pageable) {
        return coursRepository.findByStatusAndIsActif(status, isActif, pageable);
    }

    @Override
    public Page<Cours> findByStatusAndParentIdAndIsActif(String status, Long parentId, Pageable pageable, Boolean isActif) {
        return coursRepository.findByStatusAndParentIdAndIsActif(status, parentId, pageable, isActif);
    }

    @Override
    public Cours modifier(Long id, Cours cours) {
        return coursRepository.findById(id)
                .map(p-> {
                    p.setLibelle(cours.getLibelle());
                    p.setDteDteDebutCours(cours.getDteDteDebutCours());
                    p.setDteDteFinCours(cours.getDteDteFinCours());
                    p.setStatus(cours.getStatus());
                    return coursRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Cour non trouvé !"));
    }

    @Override
    public Cours modifierIsActive(Long id, Cours cours) {
        return coursRepository.findById(id)
                .map(p-> {
                    p.setIsActif(cours.getIsActif());
                    return coursRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Cours non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        coursRepository.deleteById(id);
        return "Cour supprimé";
    }
}
