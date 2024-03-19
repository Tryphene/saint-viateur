package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "paiement")
@AllArgsConstructor
@Setter
@Getter
public class Paiement {
    public Paiement () {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //incremente l'id
    private Long id;

    @Column(length = 250, nullable = false)
    private Integer montant;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date datePaiement;

    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date jour;

    @Column(length = 250, nullable = false)
    private String admin;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "cours_id")
    private Cours cours;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "apprenant_id")
    private Apprenant apprenant;


}
