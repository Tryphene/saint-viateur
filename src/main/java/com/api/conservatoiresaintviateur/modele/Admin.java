package com.api.conservatoiresaintviateur.modele;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.*;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name="admin")
@Getter
@Setter
@AllArgsConstructor
public class Admin {
    public Admin () {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //incremente l'id
    private Long id;

    @Column(length = 15, nullable = false)
    private String nom;

    @Column(length = 50, nullable = false)
    private String prenom;

    @Column(length = 1, nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dteNaissance;

    @Column(length = 250)
    private String admin;

    @Column(length = 250)
    private String updated_by;

    @Column(nullable = true)
    private Timestamp updated_at;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String mdp;

    @Column(length = 15, nullable = false)
    private String telephone;

    @Column(length = 30, nullable = false)
    private String role;

    @Column(length = 15, nullable = false)
    private String status;

}