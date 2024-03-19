package com.api.conservatoiresaintviateur.controller;

import com.api.conservatoiresaintviateur.config.JwtTokenUtil;
import com.api.conservatoiresaintviateur.modele.*;
import com.api.conservatoiresaintviateur.repository.AdminRepository;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import com.api.conservatoiresaintviateur.service.ApprenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ApprenantRepository apprenantRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private ProfesseurRepository professeurRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login-apprenant")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws ParseException {
        Apprenant apprenant = apprenantRepository.findByMail(loginRequest.getMail());
        Integer frais = 15000;

        if(apprenant != null && passwordEncoder.matches(loginRequest.getMdp(), apprenant.getMdp())){
            if(apprenant.getAbonnementExpiryDate() != null){
                String dateString = apprenant.getAbonnementExpiryDate().toString();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
                Date date = sdf.parse(dateString);
                System.out.println(date);
                System.out.println(new Date());
                System.out.println(date.before(new Date()));
                if ((apprenant.getAbonnementExpiryDate() != null && date.after(new Date()))) {
                    if(apprenantRepository.getStatusByMail(loginRequest.getMail()).equals("Actif")){
                        if(apprenantRepository.getIsValidatedRegistrationByMail(loginRequest.getMail()) &&
                                apprenantRepository.getFraisInscriptionByMail(loginRequest.getMail()).equals(frais)
                                || apprenant != null
                                && passwordEncoder.matches(loginRequest.getMdp(), apprenant.getMdp())
                                && apprenantRepository.getIsValidatedRegistrationByMail(loginRequest.getMail())){
                            if(apprenantRepository.getIsUpToDateEcheancierByMail(loginRequest.getMail())){
                                final Authentication authentication = authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(loginRequest.getMail(), loginRequest.getMdp())
                                );
                                System.out.println(loginRequest.getMail());
                                System.out.println(loginRequest.getMdp());
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                                final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                                final String token = jwtTokenUtil.generateToken(userDetails);
                                return ResponseEntity.ok(new JwtAuthenticationResponse(token));

                            }else {
                                //return ResponseEntity.badRequest().body("Vous êtes en retard sur votre paiement d'écheance!");
                                return ResponseEntity.badRequest().body("Vous êtes en retard sur votre paiement d'écheance! Veuillez vous rendre au conservatoire pour effectuer le paiement !");
                            }
                        }else {
                            return ResponseEntity.badRequest().body("Vous compte est inactif. Veuillez vous rendre au conservatoire avec votre fiche d'inscription afin de payer les frais d'inscription pour l'activation de votre compte!");
                            //return ResponseEntity.badRequest().body("Vous compte est inactif. Veuillez vous rendre au conservatoire avec votre fiche d'inscription et le reçu de paiement pour l'activation de votre compte!");
                        }

                    } else {
                        return ResponseEntity.badRequest().body("Vous compte été bloqué. Veuillez contacter le service client SVP!");
                    }
                } else {
                    return ResponseEntity.badRequest().body("Veuillez payer les frais d'inscription pour la nouvelle rentrée afin de pouvoir accéder à votre compte!");
                }
            }
            else {
                return ResponseEntity.badRequest().body("Veuillez payer les frais d'inscription pour la nouvelle rentrée afin de pouvoir accéder à votre compte!");
            }
        } else {
            return ResponseEntity.badRequest().body("Mauvais e-mail ou mot de passe !");
            //return ResponseEntity.badRequest().body(apprenantRepository.existsByMailAndMdp(loginRequest.getMail(), loginRequest.getMdp()));
        }
    }

    @PostMapping("/login-admin")
    public ResponseEntity<?> login_admin(@RequestBody LoginAdminRequest loginAdminRequest) {
        Admin admin = adminRepository.findByEmail(loginAdminRequest.getEmail());
        System.out.println("admin");
        System.out.println(admin);
        if(admin != null && passwordEncoder.matches(loginAdminRequest.getMdp(), admin.getMdp())){
            if(adminRepository.getStatusByEmail(loginAdminRequest.getEmail()).equals("Actif")){
                final Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginAdminRequest.getEmail(), loginAdminRequest.getMdp())
                );
                System.out.println(loginAdminRequest.getEmail());
                System.out.println(loginAdminRequest.getMdp());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                final String token = jwtTokenUtil.generateToken(userDetails);
                return ResponseEntity.ok(new JwtAuthenticationResponse(token));
            } else {
                return ResponseEntity.badRequest().body("Vous compte été bloqué. Veuillez contacter vos supérieurs SVP!");
            }
        }else {
            return ResponseEntity.badRequest().body("Mauvais e-mail ou mot de passe !");
            //return ResponseEntity.badRequest().body(apprenantRepository.existsByMailAndMdp(loginRequest.getMail(), loginRequest.getMdp()));
        }
        /*if(adminRepository.existsByEmail(loginRequest.getEmail())){
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getMdp())
            );
            System.out.println(loginRequest.getEmail());
            System.out.println(loginRequest.getMdp());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            final String token = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        }else {
            return ResponseEntity.badRequest().body("no");ZZ
        }*/
    }

    @PostMapping("/login-professeur")
    public ResponseEntity<?> login_professeur(@RequestBody LoginProfRequest loginProfRequest) {
        Professeur professeur = professeurRepository.findByEmail(loginProfRequest.getEmail());
        System.out.println("professeur");
        System.out.println(professeur);
        if(professeur != null && passwordEncoder.matches(loginProfRequest.getMdp(), professeur.getMdp())){
            if(professeurRepository.getStatusByEmail(loginProfRequest.getEmail()).equals("Actif")){
                final Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginProfRequest.getEmail(), loginProfRequest.getMdp())
                );
                System.out.println(loginProfRequest.getEmail());
                System.out.println(loginProfRequest.getMdp());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                final String token = jwtTokenUtil.generateToken(userDetails);
                return ResponseEntity.ok(new JwtAuthenticationResponse(token));
            } else {
                return ResponseEntity.badRequest().body("Vous compte été bloqué. Veuillez contacter vos supérieurs SVP!");
            }
        }else {
            return ResponseEntity.badRequest().body("Mauvais e-mail ou mot de passe !");
            //return ResponseEntity.badRequest().body(apprenantRepository.existsByMailAndMdp(loginRequest.getMail(), loginRequest.getMdp()));
        }
    }

    /*@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }*/

    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            System.out.println(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshJwt(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        if (authToken != null && authToken.startsWith("Bearer ")) {
            String oldJwt = authToken.substring(7);
            if (jwtTokenUtil.canTokenBeRefreshed(oldJwt)) {
                String newJwt = jwtTokenUtil.refreshToken(oldJwt);
                return ResponseEntity.ok(new JwtAuthenticationResponse(newJwt));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token cannot be refreshed.");
    }
}
