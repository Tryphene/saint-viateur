package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "horaire_mensuel")
@AllArgsConstructor
@Setter
@Getter
public class HoraireMensuel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250, nullable = false)
    private String mois;

    @Column(length = 250, nullable = true)
    private Integer heureMensuel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professeur")
    @JsonIgnore
    private Professeur prof;

    public HoraireMensuel() {

    }
}
