package com.api.conservatoiresaintviateur.modele;


import java.util.List;

public class CreateCoursWithScheduleRequest {
    private Cours cours;
    private Long professeur;

    public Long getProfesseur() {
        return professeur;
    }

    public void setProfesseur(Long professeur) {
        this.professeur = professeur;
    }

    private List<MarqueDePresence> marqueDePresence;
    private List<Echeancier> echeancier;
    private  List<SeanceProfesseur> seanceProfesseurs;

    public List<Echeancier> getEcheancier() {
        return echeancier;
    }

    public List<SeanceProfesseur> getSeanceProfesseurs() {
        return seanceProfesseurs;
    }

    public void setSeanceProfesseurs(List<SeanceProfesseur> seanceProfesseurs) {
        this.seanceProfesseurs = seanceProfesseurs;
    }

    public void setEcheancier(List<Echeancier> echeancier) {
        this.echeancier = echeancier;
    }

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }

    public List<MarqueDePresence> getMarqueDePresence() {
        return marqueDePresence;
    }

    public void setMarqueDePresence(List<MarqueDePresence> marqueDePresence) {
        this.marqueDePresence = marqueDePresence;
    }
}
