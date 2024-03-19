package com.api.conservatoiresaintviateur.modele;

public class CreateProfesseurWithHoraireRequest {
    private Professeur professeur;
    private HoraireMensuel horaireMensuel;

    public Professeur getProfesseur() {
        return professeur;
    }

    public void setProfesseur(Professeur professeur) {
        this.professeur = professeur;
    }

    public HoraireMensuel getHoraireMensuel() {
        return horaireMensuel;
    }

    public void setHoraireMensuel(HoraireMensuel horaireMensuel) {
        this.horaireMensuel = horaireMensuel;
    }
}
