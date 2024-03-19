package com.api.conservatoiresaintviateur.modele;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categorie_cours")
@Setter
@Getter
@AllArgsConstructor
public class CategorieCours {
    public CategorieCours() {
        // Constructeur par défaut sans paramètres
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250, nullable = false)
    private String libelle;

    @Column(length = 250, nullable = false)
    private String status;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<DomaineCategorie> children;
}
