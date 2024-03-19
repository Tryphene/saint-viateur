package com.api.conservatoiresaintviateur.repository;

import com.api.conservatoiresaintviateur.modele.Cours;
import com.api.conservatoiresaintviateur.modele.HoraireMensuel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface HoraireMensuelRepository extends JpaRepository<HoraireMensuel, Long> {
    List<HoraireMensuel> findAllByOrderByIdDesc();

    /*@Modifying
    @Transactional
    @Query("UPDATE HoraireMensuel h SET h.heureMensuel = :heure WHERE h.mois = :mois")
    void updateHeureMensuel(@Param("heure") Integer heure, @Param("mois") String mois);*/
    @Modifying
    @Transactional
    @Query("UPDATE HoraireMensuel h SET h.heureMensuel = :heure WHERE h.mois = :mois AND h.prof.id = :id")
    void updateHeureMensuelByProf(@Param("heure") Integer heure, @Param("mois") String mois, @Param("id") Long id);

    @Query("SELECT h.heureMensuel FROM HoraireMensuel h JOIN h.prof p WHERE h.mois = :mois AND p.id = :id")
    Integer findHeureMensuelByMois(String mois, Long id);
}
