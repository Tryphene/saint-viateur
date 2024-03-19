package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProfesseurService extends UserDetailsService {
    Professeur creer(Professeur professeur);

    List<Professeur> lire();
    Professeur findByEmail(String mail);
    String getStatusByEmail(@Param("email") String email);
    List<ProfesseurRepository.ProfesseurProjection> findProfesseur(Long id);
    List<Professeur> findByStatus(String status);
    List<Professeur> findByStatusAndDisponibilite(String status, String Disponibilite);
    Professeur findProfesseurById(Long id);
    List<Professeur> findByNomContainingOrPrenomContainingOrEmailContaining(String recherche);
    Integer findProfesseurSalaire(Long id);
    void updateSalaireProfesseur(Integer salaire, Long id);
    Optional<Professeur> findByAuthToken(String authToken);
    Professeur findProfesseurByHoraireMensuel(Long id);
    Professeur creerAvecHoraireMensuel(Professeur professeur, HoraireMensuel horaireMensuel);
    List<Professeur> getProfesseursByDomaineCategories(Long id);
    List<Professeur> getProfesseursByDomaineCategoriesAndStatusAndDisponibilite(Long id, String status, String disponibilite);

    Professeur findProfesseurByCoursId(Long coursId);

    Professeur findProfesseurBymarqueDePresenceId(Long id);
    Professeur getById(Long id);
    Page<Professeur> findAll(Pageable pageable);
    void enregistrerProfesseurADomaineCategorie(Long professeurId, Long domaineId);

    boolean existsByEmail(String email);

    boolean existsByIdAndDomaineCategories_Id(Long professeurId, Long domaineCategorieId);
    //public List<Professeur> rechercherProfesseurs(String nom, String prenom);
    List<Professeur> findAllByOrderByIdDesc();
    List<Professeur> findByNomContainingAndPrenomContaining(String recherche);
    boolean existsByEmailAndMdp(String mail, String mdp);
    public List<Professeur> rechercherProfesseurs(String recherche);
    String getMdpByEmail(@Param("email") String email);
    Professeur modifier(Long id, Professeur professeur);
    Professeur modifierAll(Long id, Professeur professeur);
    Professeur modifierOne(Long id, Professeur professeur);
    Professeur modifierSalaire(Long id, Professeur professeur);

    String supprimer(Long id);
}
