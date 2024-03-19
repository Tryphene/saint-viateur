package com.api.conservatoiresaintviateur.repository;

import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import com.api.conservatoiresaintviateur.modele.Professeur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProfesseurRepository extends JpaRepository<Professeur, Long> {
    Professeur findByEmail(String mail);
    List<Professeur> findByStatus(String status);
    List<Professeur> findByStatusAndDisponibilite(String status, String Disponibilite);
    Professeur findProfesseurById(Long id);
    @Query("SELECT p.status FROM Professeur p WHERE email = :email")
    String getStatusByEmail(@Param("email") String email);

    Page<Professeur> findAll(Pageable pageable);
    boolean existsByEmail(String email);
    public interface ProfesseurProjection {
        Professeur geProfesseur();
        List<String> getDomaineCategories();
    }
    /*@Query("SELECT p as professeur, p.domaineCategories.libelle as domaineCategorie FROM Professeur p WHERE p.id = :id")
    List<ProfesseurProjection> findProfesseur(Long id);*/
    @Query("SELECT p as professeur, dc.libelle as domaineCategories FROM Professeur p JOIN p.domaineCategories dc WHERE p.id = :id")
    List<ProfesseurProjection> findProfesseur(Long id);
    boolean existsByIdAndDomaineCategories_Id(Long professeurId, Long domaineCategorieId);
    Optional<Professeur> findByAuthToken(String authToken);
    @Query("SELECT p FROM Professeur p JOIN p.coursList c WHERE c.id = :coursId")
    Professeur findProfesseurByCoursId(Long coursId);

    @Query("SELECT p.salaire FROM Professeur p  WHERE p.id = :id")
    Integer findProfesseurSalaire(Long id);
    @Modifying
    @Transactional
    @Query("UPDATE Professeur p SET p.salaire = :salaire WHERE p.id = :id")
    void updateSalaireProfesseur(Integer salaire, Long id);

    @Query("SELECT p FROM Professeur p JOIN p.marqueDePresenceList c WHERE c.id = :id")
    Professeur findProfesseurBymarqueDePresenceId(Long id);

    @Query("SELECT p FROM Professeur p JOIN p.horaireMensuelList h WHERE h.id = :id")
    Professeur findProfesseurByHoraireMensuel(Long id);
    boolean existsByEmailAndMdp(String mail, String mdp);

    @Query("SELECT mdp FROM Professeur WHERE email = :email")
    String getMdpByEmail(@Param("email") String email);
    List<Professeur> findByNomContaining(String nomRecherche);
    List<Professeur> findByPrenomContaining(String prenomRecherche);

    List<Professeur> findByNomContainingAndPrenomContaining(String nomRecherche, String prenomRecherche);
    List<Professeur> findByNomContainingOrPrenomContainingOrEmailContaining(String nomRecherche, String prenomRecherche, String emailRecherche);
    List<Professeur> getProfesseursByDomaineCategoriesAndStatusAndDisponibilite(Long id, String status, String disponibilite);
    List<Professeur> getProfesseursByDomaineCategories(String libelleDomaineCategorie);

    List<Professeur> findAllByOrderByIdDesc();
}
