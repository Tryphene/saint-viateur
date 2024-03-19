package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="cours")
@Getter
@Setter
@AllArgsConstructor
public class Cours {
    public Cours() {
        // Constructeur par défaut sans paramètres
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250, nullable = false)
    private String libelle;

    @Column(length = 250, nullable = false)
    private String forfait;

    @Column(length = 1, nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteDteDebutCours;

    @Column(length = 250, nullable = false)
    private Boolean isActif;

    @Column(length = 1, nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteDteFinCours;

    @Column(length = 30, nullable = false)
    private String heureCours;

    @Column(length = 250, nullable = false)
    private Integer montant;

    @Column(length = 250, nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "domaine_categorie_id")
    @JsonIgnore
    private DomaineCategorie domaineCategorie;

    @ManyToOne
    @JoinColumn(name = "apprenant_id")
    @JsonIgnore
    private Apprenant parent;

    @Column(length = 250, nullable = false)
    private Boolean echeancierUsed;

    @ManyToOne(optional = true)
    @JoinColumn(name = "professeur_id")
    @JsonIgnore
    private Professeur professeur;

    @OneToMany(mappedBy = "cours", cascade = CascadeType.ALL)
    private List<MarqueDePresence> marqueDePresenceList;

    @OneToMany(mappedBy = "coursEcheancier", cascade = CascadeType.ALL)
    private List<Echeancier> echeancierList;

    @OneToMany(mappedBy = "cours", cascade = CascadeType.ALL)
    private List<Paiement> paiementList;

}
