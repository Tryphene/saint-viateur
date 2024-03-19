package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DomaineCategorieRepository extends JpaRepository<DomaineCategorie, Long> {
    List<DomaineCategorie> findByParent(CategorieCours categorieCours);
    List<DomaineCategorie> findAllByOrderByIdDesc();
    DomaineCategorie findDomaineCategorieById(Long id);
    public interface DomaineCategorieProjection {
        DomaineCategorie getDomaineCategorie();
        String getParent();
    }
    List<DomaineCategorie> findByLibelleContaining(String recherche);

    @Query("SELECT d as domaineCategorie, d.parent.libelle as parent FROM DomaineCategorie d")
    List<DomaineCategorieProjection> findByParent();
    @Query("SELECT d FROM DomaineCategorie d JOIN d.coursList c WHERE c.id = :coursId")
    DomaineCategorie findDomaineCategorieByCoursId(Long coursId);

    DomaineCategorie getById(Long id);

}
