package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "frais_inscription")
@Setter
@Getter
@AllArgsConstructor
public class FraisInscriptionPaiement {
    public FraisInscriptionPaiement () {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //incremente l'id
    private Long id;

    @Column(length = 250, nullable = false)
    private Integer fraisInscription;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date datePaiement;

    @Column(length = 250, nullable = false)
    private String admin;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "apprenant_id")
    private Apprenant apprenantPaiementFrais;
}
