package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Apprenant;
import com.api.conservatoiresaintviateur.modele.Professeur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApprenantRepository extends JpaRepository<Apprenant, Long> {
    List<Apprenant> findAllByOrderByIdDesc();

    Page<Apprenant> findAll(Pageable pageable);

    @Query("SELECT COUNT(u) FROM Apprenant u WHERE MONTH(u.dteInscription) = :month")
    Long countApprenantByDteInscription(@Param("month") int month);
    Apprenant findByMail(String mail);
    @Query("SELECT status FROM Apprenant u WHERE mail = :mail")
    String getStatusByMail(@Param("mail") String mail);

    @Query("SELECT isValidatedRegistration FROM Apprenant u WHERE mail = :mail")
    Boolean getIsValidatedRegistrationByMail(@Param("mail") String mail);
    @Query("SELECT isUpToDateEcheancier FROM Apprenant u WHERE mail = :mail")
    Boolean getIsUpToDateEcheancierByMail(@Param("mail") String mail);
    @Query("SELECT fraisInscription FROM Apprenant a WHERE mail = :mail")
    Integer getFraisInscriptionByMail(@Param("mail") String mail);

    @Query("SELECT a FROM Apprenant a JOIN a.marqueDePresenceList m WHERE m.id = :id")
    Apprenant findApprenantBymarqueDePresenceId(Long id);
    @Query("SELECT a FROM Apprenant a JOIN a.echeancierList e WHERE e.id = :id")
    Apprenant findApprenantByApprenantEcheancierId(Long id);

    @Query("SELECT a FROM Apprenant a JOIN a.coursList e WHERE e.id = :id")
    Apprenant findApprenantByParentId(Long id);
    boolean existsByMail(String mail);
    @Query("SELECT a FROM Apprenant a WHERE a.mail = :email")
    Optional<Apprenant> getByMail(String email);
    @Query("SELECT a FROM Apprenant a WHERE a.passwordResetToken = :token")
    Optional<Apprenant> findByPasswordResetToken(String token);
    boolean existsByMailAndMdp(String mail, String mdp);
    @Query("SELECT mdp FROM Apprenant WHERE mail = :mail")
    String getMdpByMail(@Param("mail") String mail);

    @Query("SELECT passwordResetToken FROM Apprenant WHERE mail = :mail")
    String getPasswordResetTokenByMail(@Param("mail") String mail);

    List<Apprenant> findByNomContainingOrPrenomContainingOrMailContaining(String nomRecherche, String prenomRecherche, String mailRecherche);

}
