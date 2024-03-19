package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.HoraireMensuel;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.HoraireMensuelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HoraireMensuelServiceImpl implements HoraireMensuelService {
    private final HoraireMensuelRepository horaireMensuelRepository;
    @Override
    public HoraireMensuel creer(Long id, HoraireMensuel horaireMensuel) {
        Professeur professeur = new Professeur();
        professeur.setId(id);
        horaireMensuel.setProf(professeur);
        return horaireMensuelRepository.save(horaireMensuel);
    }

    /*@Override
    public List<HoraireMensuel> lire() {
        return horaireMensuelRepository.findAll();
    }*/

    @Override
    public List<HoraireMensuel> lire() {
        List<HoraireMensuel> horaires = horaireMensuelRepository.findAll();
        return horaires;
    }


    @Override
    public List<HoraireMensuel> findAllByOrderByIdDesc() {
        return horaireMensuelRepository.findAllByOrderByIdDesc();
    }

    @Override
    public Integer findHeureMensuelByMois(String mois, Long id) {
        return horaireMensuelRepository.findHeureMensuelByMois(mois, id);
    }

    @Override
    public void updateHeureMensuelByProf(Integer heure, String mois, Long id) {
        horaireMensuelRepository.updateHeureMensuelByProf(heure, mois, id);
    }

    /*@Override
    public void updateHeureMensuel(Integer heure, String mois) {
        horaireMensuelRepository.updateHeureMensuel(heure, mois);
    }*/

    /*@Override
    public void updateHeureMensuelByProf(Integer heure, String mois, Long id) {
        horaireMensuelRepository.updateHeureMensuel(heure, mois, id);
    }*/

    @Override
    public HoraireMensuel modifier(Long id, HoraireMensuel horaireMensuel) {
        return horaireMensuelRepository.findById(id)
                .map(p-> {
                    p.setHeureMensuel(horaireMensuel.getHeureMensuel());
                    return horaireMensuelRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Cour non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        horaireMensuelRepository.deleteById(id);
        return "Heure supprimé";
    }
}
