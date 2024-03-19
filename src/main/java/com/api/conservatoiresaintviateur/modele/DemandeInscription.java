package com.api.conservatoiresaintviateur.modele;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "demande_inscription")
@Setter
@Getter
@AllArgsConstructor
public class DemandeInscription {
    public DemandeInscription() {
        // Constructeur par défaut sans paramètres
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nom;

    @Column(length = 500, nullable = false)
    private String prenom;

    @Column(length = 250)
    private String profession;

    @Column(length = 250)
    private String nvScolaire;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteNaissance;

    @Column(length = 250, nullable = false)
    private String mail;

    @Column(length = 250, nullable = false)
    private String mdp;

    @Column(length = 250, nullable = false)
    private String telephone;

    @Column(length = 1000, nullable = false)
    private String domaine;

    @Column(length = 100, nullable = false)
    private String status;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteDebutCours;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteFinCours;

}
