package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "professeur")
@AllArgsConstructor
@Setter
@Getter
public class Professeur {
    public Professeur() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String nom;

    @Column(length = 500, nullable = false)
    private String prenom;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteNaissance;

    @Column(length = 500, nullable = false)
    private String categorieCours;

    @Column(length = 500, nullable = false)
    private String email;

    @Column(length = 500, nullable = false)
    private String mdp;

    @Column(length = 500, nullable = true)
    private String disponibilite;

    @Column(length = 500, nullable = false)
    private String telephone;

    @Column(length = 500, nullable = false)
    private String status;

    @Column(length = 500, nullable = false)
    private Integer salaire = 0;

    @Column(unique = true)
    private String authToken;

    @OneToMany(mappedBy = "professeur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cours> coursList;

    @OneToMany(mappedBy = "prof", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HoraireMensuel> horaireMensuelList;

    @OneToMany(mappedBy = "proff", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MarqueDePresence> marqueDePresenceList;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "professeur_domaine_categorie",
            joinColumns = @JoinColumn(name = "professeur_id"),
            inverseJoinColumns = @JoinColumn(name = "domaine_categorie_id")
    )
    private List<DomaineCategorie> domaineCategories = new ArrayList<>();
}
