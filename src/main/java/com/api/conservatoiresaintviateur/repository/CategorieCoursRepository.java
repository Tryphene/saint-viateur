package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.CategorieCours;
import com.api.conservatoiresaintviateur.modele.Cours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategorieCoursRepository extends JpaRepository<CategorieCours, Long> {
    List<CategorieCours> findByStatus(String status);

    @Query("SELECT c FROM CategorieCours c JOIN c.children d WHERE d.id = :id")
    CategorieCours  findCoursByChildrenId(Long id);
}
