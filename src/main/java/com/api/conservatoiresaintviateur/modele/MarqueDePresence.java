package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class MarqueDePresence {
    public MarqueDePresence() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "apprenant_id")
    @JsonIgnore
    private Apprenant apprenant;

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

    @Column(name = "presence")
    private String presence;

    @Column(name = "presence_professeur")
    private String presenceProfesseur;

    @Column(name = "heure")
    private String heure;

    @Column(name = "heure_debut")
    private String heureDebut;

    @Column(name = "heure_fin")
    private String heureFin;

    @Column(length = 250, nullable = false)
    private Long heureEffectue;

    public MarqueDePresence(MarqueDePresence marqueDePresence, Apprenant apprenant) {
    }

    // Getters, setters, constructeurs, etc.
}
