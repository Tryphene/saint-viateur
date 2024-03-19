package com.api.conservatoiresaintviateur.modele;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "avis")
@Setter
@Getter
public class Avis {
    public Avis() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = true)
    private String nom;

    @Column(length = 500, nullable = true)
    private String prenom;

    /*@Column(length = 500, nullable = true)
    private String email;*/

    @Column(length = 5000, nullable = true)
    private String Commentaire;

    @Column(length = 500, nullable = true)
    private Integer note;

    @Column(length = 500, nullable = false)
    private Boolean status;
}
