package com.api.conservatoiresaintviateur.modele;

public class JwtAuthenticationResponse {
    private String accessToken;

    // Constructor, getters, and setters


    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
