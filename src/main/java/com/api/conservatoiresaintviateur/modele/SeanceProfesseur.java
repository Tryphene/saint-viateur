package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class SeanceProfesseur {
    public SeanceProfesseur() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "cours_id")
    private Cours cours;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "professeur_id")
    private Professeur proff;

    @Column(name = "date_marque_de_presence")
    @Temporal(TemporalType.DATE)
    private Date dateMarqueDePresence;

    @Column(name = "presence_professeur")
    private String presenceProfesseur;

    @Column(name = "heure")
    private String heure;

    @Column(name = "heure_debut")
    private String heureDebut;

    @Column(name = "heure_fin")
    private String heureFin;

    @Column(length = 250, nullable = false)
    private BigDecimal heureEffectue;

    /*public Seance(MarqueDePresenceProfesseur marqueDePresenceProfesseur, Professeur professeur) {
    }*/

    // Getters, setters, constructeurs, etc.
}