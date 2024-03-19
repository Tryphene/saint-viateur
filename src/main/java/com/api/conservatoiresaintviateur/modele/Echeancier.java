package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "echeancier")
@Setter
@Getter
@AllArgsConstructor
public class Echeancier {
    public Echeancier() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250, nullable = false)
    private Integer montant;

    @Column(length = 250, nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "apprenant_id")
    @JsonIgnore
    private Apprenant apprenantEcheancier;

    @ManyToOne
    @JoinColumn(name = "cours_id")
    @JsonIgnore
    private Cours coursEcheancier;


    @Column(name = "date_paiement")
    @Temporal(TemporalType.DATE)
    private Date datePaiement;

    @Column(name = "date_echeance")
    @Temporal(TemporalType.DATE)
    private Date dateEcheance;


}
