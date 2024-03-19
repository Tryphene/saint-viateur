package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "apprenant")
@Setter
@Getter
@AllArgsConstructor
public class Apprenant {
    public Apprenant() {
        // Constructeur par défaut sans paramètres
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String nom;

    @Column(length = 500, nullable = false)
    private String prenom;

    @Column(length = 500, nullable = true)
    private String nomParent;

    @Column(length = 500, nullable = true)
    private String prenomParent;

    @Column(length = 250)
    private String profession;

    @Column(length = 250)
    private String nvScolaire;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteNaissance;

    @Column(length = 500, nullable = false)
    private String lieuNaissance;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteInscription;

    @Column(length = 250)
    private String admin;

    @Column(length = 250)
    private String updated_by;

    @Column(nullable = true)
    private Timestamp updated_at;

    @Column(length = 250, nullable = true)
    private String mail;

    @Column(length = 250, nullable = true)
    private String mailParent;

    @Column(length = 250, nullable = false)
    private String mdp;

    @Column(length = 250, nullable = true)
    private String telephoneDomicile;

    @Column(length = 250, nullable = true)
    private String telephoneMobile;

    @Column(length = 250, nullable = true)
    private String telParent;

    @Column(length = 100, nullable = false)
    private String status;

    @Column(length = 250, nullable = false)
    private Integer scolarite;

    @Column(length = 250, nullable = false)
    private Integer fraisInscription;

    @Column(length = 250, nullable = false)
    private Integer scolaritePayé;

    @Column(length = 250, nullable = false)
    private Boolean testIsChecked;

    @Column(length = 250, nullable = true)
    private Boolean isValidatedRegistration;

    @Column(length = 250, nullable = true)
    private Boolean isUpToDateEcheancier;

    @Column(length = 250, nullable = true)
    private Boolean changeMdp;

    @Column(length = 100, nullable = true)
    private String passwordResetToken;

    @Column(length = 100, nullable = true)
    private LocalDateTime tokenExpiryDateTime;

    @Column(length = 100, nullable = true)
    private Date abonnementExpiryDate;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Cours> coursList;

    /*@ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "apprenant-cours",
            joinColumns = @JoinColumn(name = "apprenant_id"),
            inverseJoinColumns = @JoinColumn(name = "cours_id")
    )
    private List<Cours> coursList = new ArrayList<>();*/

    //@JsonIgnore
    @OneToMany(mappedBy = "apprenant", cascade = CascadeType.ALL)
    private List<MarqueDePresence> marqueDePresenceList;

    //@JsonIgnore
    @OneToMany(mappedBy = "apprenantEcheancier", cascade = CascadeType.ALL)
    private List<Echeancier> echeancierList;

    @OneToMany(mappedBy = "apprenant", cascade = CascadeType.ALL)
    private List<Paiement> paiementList;

    @OneToMany(mappedBy = "apprenantPaiementFrais", cascade = CascadeType.ALL)
    private List<FraisInscriptionPaiement> fraisInscriptionPaiementList;

    //@JsonIgnore
    @OneToMany(mappedBy = "parentToken", cascade = CascadeType.DETACH, orphanRemoval = true)
    private List<VerificationToken> tokenParent;
}
