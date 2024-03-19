package com.api.conservatoiresaintviateur.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "verificationToken")
@Setter
@Getter
@AllArgsConstructor
public class VerificationToken {
    public VerificationToken() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //incremente l'id
    private Long id;

    @Column(length = 250, nullable = false)
    private String token;

    @Column(length = 250, nullable = false)
    private Timestamp expireTime;

    @ManyToOne
    @JoinColumn(name = "apprenant_id")
    @JsonIgnore
    private Apprenant parentToken;
}
