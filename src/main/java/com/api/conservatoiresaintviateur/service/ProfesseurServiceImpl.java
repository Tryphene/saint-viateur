package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.DomaineCategorieRepository;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Component("professeurServiceImpl")
public class ProfesseurServiceImpl implements ProfesseurService {

    @Autowired
    private final ProfesseurRepository professeurRepository;

    @Autowired
    private final DomaineCategorieRepository domaineCategorieRepository;

    private final HoraireMensuelService horaireMensuelService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Professeur creer(Professeur professeur) {
        String token = generateToken();
        professeur.setAuthToken(token);
        professeur.setMdp(this.passwordEncoder.encode(professeur.getMdp()));
        return professeurRepository.save(professeur);
    }

    @Override
    public List<Professeur> lire() {
        return professeurRepository.findAll();
    }

    @Override
    public Professeur findByEmail(String mail) {
        return professeurRepository.findByEmail(mail);
    }

    @Override
    public String getStatusByEmail(String email) {
        return professeurRepository.getStatusByEmail(email);
    }

    @Override
    public List<ProfesseurRepository.ProfesseurProjection> findProfesseur(Long id) {
        return professeurRepository.findProfesseur(id);
    }

    @Override
    public List<Professeur> findByStatus(String status) {
        return professeurRepository.findByStatus(status);
    }

    @Override
    public List<Professeur> findByStatusAndDisponibilite(String status, String Disponibilite) {
        return professeurRepository.findByStatusAndDisponibilite(status, Disponibilite);
    }

    @Override
    public Professeur findProfesseurById(Long id) {
        return professeurRepository.findProfesseurById(id);
    }

    @Override
    public List<Professeur> findByNomContainingOrPrenomContainingOrEmailContaining(String query) {
        if (query == null || query.isEmpty()) {
            return professeurRepository.findAll();
        } else {
            return professeurRepository.findByNomContainingOrPrenomContainingOrEmailContaining(query, query, query);
        }
    }

    @Override
    public Integer findProfesseurSalaire(Long id) {
        return professeurRepository.findProfesseurSalaire(id);
    }

    @Override
    public void updateSalaireProfesseur(Integer salaire, Long id) {
        professeurRepository.updateSalaireProfesseur(salaire, id);
    }

    @Override
    public Optional<Professeur> findByAuthToken(String authToken) {
        return professeurRepository.findByAuthToken(authToken);
    }
    @Override
    public Professeur findProfesseurByHoraireMensuel(Long id) {
        return professeurRepository.findProfesseurByHoraireMensuel(id);
    }

    @Override
    public Professeur creerAvecHoraireMensuel(Professeur professeur, HoraireMensuel horaireMensuel) {
        professeur.setMdp(this.passwordEncoder.encode(professeur.getMdp()));
        Professeur nouveauProfesseur = professeurRepository.save(professeur);

        horaireMensuel.setProf(professeur);
        horaireMensuelService.creer(nouveauProfesseur.getId(), horaireMensuel);

        return nouveauProfesseur;
    }

    @Override
    public List<Professeur> getProfesseursByDomaineCategories(Long id) {
        DomaineCategorie domaineCategorie = domaineCategorieRepository.getById(id);
        if (domaineCategorie != null) {
            return domaineCategorie.getProfesseurs();
        }
        return new ArrayList<>();
    }

    public static Specification<Professeur> rechercheParNomPrenom(String nom, String prenom) {
        return (Root<Professeur> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            Predicate predicate = builder.conjunction();

            if (nom != null && !nom.isEmpty()) {
                predicate = builder.and(predicate, builder.like(root.get("nom"), "%" + nom + "%"));
            }

            if (prenom != null && !prenom.isEmpty()) {
                predicate = builder.and(predicate, builder.like(root.get("prenom"), "%" + prenom + "%"));
            }

            return predicate;
        };
    }

    public List<Professeur> rechercherProfesseurs(String nom, String prenom) {
        /*Specification<Professeur> spec = ProfesseurRepository.ProfesseurSpecifications.rechercheParNomPrenom(nom, prenom);
        return professeurRepository.findAll(spec);*/
        return professeurRepository.findAll();
    }

    @Override
    public List<Professeur> getProfesseursByDomaineCategoriesAndStatusAndDisponibilite(Long id, String status, String disponibilite) {
        DomaineCategorie domaineCategorie = domaineCategorieRepository.findById(id).orElse(null);
        if (domaineCategorie != null) {
            return domaineCategorie.getProfesseurs().stream()
                    .filter(professeur -> professeur.getStatus().equals(status)) // Assurez-vous que vous avez une propriété "status" dans votre classe Professeur
                    .filter(professeur -> professeur.getDisponibilite().equals(disponibilite)) // Assurez-vous que vous avez une propriété "status" dans votre classe Professeur
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public Professeur getById(Long id) {
        return professeurRepository.getById(id);
    }

    @Override
    public Professeur findProfesseurByCoursId(Long coursId) {
        return professeurRepository.findProfesseurByCoursId(coursId);
    }

    @Override
    public Professeur findProfesseurBymarqueDePresenceId(Long id) {
        return professeurRepository.findProfesseurBymarqueDePresenceId(id);
    }

    @Override
    public Page<Professeur> findAll(Pageable pageable) {
        return professeurRepository.findAll(pageable);
    }

    public void enregistrerProfesseurADomaineCategorie(Long professeurId, Long domaineId) {
        Professeur professeur = professeurRepository.getById(professeurId);
        DomaineCategorie domaineCategorie = domaineCategorieRepository.getById(domaineId);

        professeur.getDomaineCategories().add(domaineCategorie);
        domaineCategorie.getProfesseurs().add(professeur);

        professeurRepository.save(professeur);
        domaineCategorieRepository.save(domaineCategorie);
    }

    @Override
    public boolean existsByEmail(String email) {
        return professeurRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByIdAndDomaineCategories_Id(Long professeurId, Long domaineCategorieId) {
        return professeurRepository.existsByIdAndDomaineCategories_Id(professeurId, domaineCategorieId);
    }

    @Override
    public List<Professeur> findAllByOrderByIdDesc() {
        return professeurRepository.findAllByOrderByIdDesc();
    }

    @Override
    public List<Professeur> findByNomContainingAndPrenomContaining(String recherche) {
        return professeurRepository.findByNomContainingAndPrenomContaining(recherche, recherche);
    }
    public List<Professeur> rechercherProfesseurs(String recherche) {
        String[] termes = recherche.split(" ");
        String nom = "";
        String prenom = "";

        if (termes.length == 0) {
            return professeurRepository.findAllByOrderByIdDesc();
        }

        if (termes.length >= 1) {
            nom = termes[0];
        }

        // Tous les autres termes sont le prénom
        if (termes.length > 1) {
            for (int i = 1; i < termes.length; i++) {
                prenom += termes[i] + " ";
            }
            // Supprimez l'espace final ajouté
            prenom = prenom.trim();
        }
        return professeurRepository.findByNomContainingAndPrenomContaining(nom, prenom);

    }


    @Override
    public boolean existsByEmailAndMdp(String mail, String mdp) {
        String encodedMdp = professeurRepository.getMdpByEmail(mail);
        return passwordEncoder.matches(mdp, encodedMdp);
    }

    @Override
    public String getMdpByEmail(String email) {
        return professeurRepository.getMdpByEmail(email);
    }

    @Override
    public Professeur modifier(Long id, Professeur professeur) {
        return professeurRepository.findById(id)
                .map(p -> {
                    p.setNom(professeur.getNom());
                    p.setPrenom(professeur.getPrenom());
                    //p.setCategorieCours(professeur.getCategorieCours());
                    p.setEmail(professeur.getEmail());
                    p.setTelephone(professeur.getTelephone());
                    p.setStatus(professeur.getStatus());
                    // N'effectuez aucune modification sur la liste de cours
                    return professeurRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Professeur non trouvé !"));
    }

    @Override
    public Professeur modifierAll(Long id, Professeur professeur) {
        return professeurRepository.findById(id)
                .map(p -> {
                    p.setNom(professeur.getNom());
                    p.setPrenom(professeur.getPrenom());
                    //p.setCategorieCours(professeur.getCategorieCours());
                    p.setEmail(professeur.getEmail());
                    p.setMdp(this.passwordEncoder.encode(professeur.getMdp()));
                    p.setTelephone(professeur.getTelephone());
                    p.setStatus(professeur.getStatus());
                    // N'effectuez aucune modification sur la liste de cours
                    return professeurRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Professeur non trouvé !"));
    }



    @Override
    public Professeur modifierOne(Long id, Professeur professeur) {
        return professeurRepository.findById(id)
                .map(p -> {
                    p.setStatus(professeur.getStatus());
                    return professeurRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public Professeur modifierSalaire(Long id, Professeur professeur) {
        return professeurRepository.findById(id)
                .map(p -> {
                    p.setSalaire(professeur.getSalaire());
                    return professeurRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Apprenant non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        professeurRepository.deleteById(id);
        return "Professeur supprimé";
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Professeur professeur = professeurRepository.findByEmail(mail);
        if (professeur == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé");
        }
        return new org.springframework.security.core.userdetails.User(
                professeur.getEmail(),
                professeur.getMdp(),
                new ArrayList<>()
        );
    }

    private String generateToken() {
        byte[] randomBytes = new byte[24];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    /*public void requestPasswordReset(String email) {
        Optional<Professeur> professeurOptional = professeurRepository.getByMail(email);

        System.out.println(apprenantOptional);
        System.out.println(apprenantOptional.isPresent());

        if (professeurOptional.isPresent()) {
            Professeur professeur = professeurOptional.get();
            String resetToken = generateToken();
            professeur.setPasswordResetToken(resetToken);
            apprenant.setTokenExpiryDateTime(LocalDateTime.now().plusHours(1));
            apprenantRepository.save(apprenant);

            sendEmail(apprenant.getMail(), resetToken);
        } else {
            throw new NotFoundException("Apprenant introuvable");
        }
    }*/
}
