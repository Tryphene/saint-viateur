package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.HoraireMensuel;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HoraireMensuelService {
    HoraireMensuel creer(Long id, HoraireMensuel horaireMensuel);

    List<HoraireMensuel> lire();
    List<HoraireMensuel> findAllByOrderByIdDesc();

    Integer findHeureMensuelByMois(String mois, Long id);
    //void updateHeureMensuel(@Param("heure") Integer heure, @Param("mois") String mois);

    void updateHeureMensuelByProf(@Param("heure") Integer heure, @Param("mois") String mois, @Param("id") Long id);
    HoraireMensuel modifier(Long id, HoraireMensuel horaireMensuel);

    String supprimer(Long id);
}
