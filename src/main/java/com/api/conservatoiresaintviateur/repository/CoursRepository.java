package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.Professeur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface CoursRepository extends JpaRepository<Cours, Long> {
    @Query(value = "SELECT SUM(montant) FROM Cours", nativeQuery = true)
    Integer sumMontant();

    @Query(value = "SELECT SUM(montant) FROM Cours WHERE apprenant_id = :id", nativeQuery = true)
    Integer sumMontantByParentId(Long id);

    @Query(value = "SELECT SUM(montant) FROM Cours WHERE apprenant_id = :id AND id = :coursId AND is_actif = :isActif", nativeQuery = true)
    Integer sumMontantByParentIdAndCoursIdAndIsActif(Long id, Long coursId, Boolean isActif);

    @Query(value = "SELECT SUM(montant) FROM Cours WHERE apprenant_id = :id AND is_actif = :isActif", nativeQuery = true)
    Integer sumMontantByParentIdAndIsActif(Long id, Boolean isActif);
    boolean existsByDteDteDebutCours(Date dteDteDebutCours);

    /*@Query("SELECT c FROM Cours c WHERE DAY(c.dteDteDebutCours) = DAY(:dteDteDebutCours) AND c.status = :status")
    List<Cours> findCoursByDayAndStatus(Date dteDteDebutCours, String status);*/

    @Modifying
    @Transactional
    @Query("UPDATE Cours c SET c.status = :status WHERE c.id = :id")
    void updateStatusCours(String status, Long id);

    @Query("SELECT c FROM Cours c WHERE DAYOFWEEK(c.dteDteDebutCours) = :dayOfWeek AND c.status = :status")
    List<Cours> findCoursByDayOfWeekAndStatus(@Param("dayOfWeek") int dayOfWeek, @Param("status") String status);

    @Query("SELECT c FROM Cours c JOIN c.marqueDePresenceList m WHERE m.id = :id")
    Cours findCoursBymarqueDePresenceId(Long id);

    @Query("SELECT c FROM Cours c JOIN c.echeancierList e WHERE e.id = :id")
    Cours findCoursByCoursEcheancierId(Long id);
    @Query("SELECT  c.dteDteDebutCours, c.heureCours FROM Cours c")
    List<Object[]> findAllDteDteDebutCoursAndHeureCours();

    @Query("SELECT c.dteDteDebutCours, c.heureCours FROM Cours c JOIN c.professeur p WHERE p.id = :id")
    List<Object[]> findAllDteDteDebutCoursAndHeureCoursByProfesseurId(Long id);

    /*@Query("SELECT  c.dteDteDebutCours, c.dteDteFinCours, c.heureCours FROM Cours c")
    List<Object[]> findAllDteDteDebutCoursAndDteFinCoursAndHeureCours();*/
    List<Cours> findByParentAndStatus(Apprenant apprenant, String status);
    public interface CoursProjection {
        Cours getCours();
        String getProfesseur();
    }
    @Query("SELECT c as cours, c.parent.id as parent FROM Cours c WHERE c.id = :id AND c.status = :status AND c.isActif = :isActif")
    List<CoursProjection> findByParentAndStatusAndIsActifW(Long id, String status, Boolean isActif);

    @Query("SELECT c, c.professeur.nom FROM Cours c JOIN c.parent a WHERE a.id = :id AND c.status = :status AND c.isActif = :isActif")
    List<Cours> findByParentAndStatusAndIsActif(Long id, String status, Boolean isActif);

    @Query("SELECT c.professeur.nom, c.professeur.prenom, c.professeur.telephone, c.dteDteDebutCours, c.dteDteFinCours, c.heureCours, c.forfait, c.domaineCategorie.libelle, c.echeancierUsed, c.isActif, c.id, c.montant, c.domaineCategorie.id FROM Cours c LEFT JOIN c.professeur p JOIN c.parent a WHERE a.id = :id AND c.isActif = :isActif")
    List<Object[]> findAllCoursApprenantNonAcif(Long id, Boolean isActif);

    @Query("SELECT c.dteDteDebutCours, c.dteDteFinCours, c.heureCours, c.forfait, c.domaineCategorie.libelle, c.echeancierUsed, c.isActif, c.id, c.montant FROM Cours c JOIN c.parent a WHERE a.id = :id AND c.isActif = :isActif")
    List<Object[]> findAllCoursApprenantNonActifSansProf(Long id, Boolean isActif);

    @Query("SELECT c.professeur.nom, c.professeur.prenom, c.professeur.telephone, c.dteDteDebutCours, c.dteDteFinCours, c.heureCours, c.forfait, c.domaineCategorie.libelle, c.echeancierUsed, c.isActif, c.id, c.montant, c.domaineCategorie.id, c.professeur.id FROM Cours c JOIN c.parent a WHERE a.id = :id AND c.isActif = :isActif AND c.status = :status")
    List<Object[]> findAllCoursApprenantIsActifByStatus(Long id, Boolean isActif, String status);
    @Query("SELECT c FROM Cours c JOIN c.professeur p WHERE p.id = :id AND c.status = :status AND c.isActif = :isActif")
    List<Cours> findByProfesseurAndStatusAndIsActif(Long id, String status, Boolean isActif);
    List<Cours> findByProfesseurAndStatus(Professeur professeur, String status);
    List<Cours> findByParent(Apprenant apprenant);;
    @Query("SELECT c FROM Cours c JOIN c.parent a WHERE a.id = :id  AND c.isActif = :isActif")
    List<Cours> findByParentAndIsActif(Long id, Boolean isActif);
    List<Cours> findByProfesseur(Professeur professeur);

    //@Query("SELECT c FROM Cours c JOIN c.echeancierList e WHERE e.id = :id")
    Page<Cours> findByStatusAndParentIdAndIsActif(String status, Long parentId, Pageable pageable, Boolean isActif);

    Page<Cours> findByStatusAndIsActif(String status, Boolean isActif, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Cours c SET c.professeur.id = :idProf WHERE c.id = :id ")
    void updateProfesseeur(@Param("idProf") Long idProf, Long id);

}
