package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "domaine_categorie")
@Setter
@Getter
@AllArgsConstructor
public class DomaineCategorie {

    public DomaineCategorie() {
        // Constructeur par défaut sans paramètres
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250, nullable = false)
    private String libelle;

    @Column(length = 250, nullable = false)
    private Integer placeDisponible;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @JsonIgnore
    private CategorieCours parent;

    @OneToMany(mappedBy = "domaineCategorie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cours> coursList;

    @Column(length = 250, nullable = false)
    private String status;

    @ManyToMany(mappedBy = "domaineCategories")
    @JsonIgnore
    private List<Professeur> professeurs = new ArrayList<>();

}
