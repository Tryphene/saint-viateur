package com.api.conservatoiresaintviateur.config;

import com.api.conservatoiresaintviateur.repository.AdminRepository;
import com.api.conservatoiresaintviateur.repository.ApprenantRepository;
import com.api.conservatoiresaintviateur.repository.ProfesseurRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@Component
public class JwtRequestFilter extends OncePerRequestFilter {

   /* @Autowired
    private UserDetailsService userDetailsService;*/

    @Autowired
    @Qualifier("adminServiceImpl")
    private UserDetailsService admin;

    @Autowired
    @Qualifier("apprenantServiceImpl")
    private UserDetailsService apprenant;

    @Autowired
    @Qualifier("professeurServiceImpl")
    private UserDetailsService professeur;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private ApprenantRepository apprenantRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ProfesseurRepository professeurRepository;

    private boolean isAdminRequest(HttpServletRequest request) {
        return false;
    }

    private boolean isApprenantRequest(HttpServletRequest request) {
        // Ajoutez votre logique pour déterminer si c'est une requête apprenant
        // Par exemple, vérifiez l'URL, les en-têtes, etc.
        return false;
    }

    private boolean isProfesseurRequest(HttpServletRequest request) {
        // Ajoutez votre logique pour déterminer si c'est une requête professeur
        // Par exemple, vérifiez l'URL, les en-têtes, etc.
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        // Check if the token is present and formatted correctly
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.extractUsername(jwtToken);
            } catch (ExpiredJwtException e) {
                // Handle token expiration here
            }
        }

        // Validate the token and set authentication in the security context
        /*if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }*/

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;
            // Choisissez le UserDetailsService approprié en fonction du contexte
            if (adminRepository.existsByEmail(username)) {
                userDetails = admin.loadUserByUsername(username);
            } else if (apprenantRepository.existsByMail(username)) {
                userDetails = apprenant.loadUserByUsername(username);
            } else if (professeurRepository.existsByEmail(username)) {
                userDetails = professeur.loadUserByUsername(username);
            }

            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        chain.doFilter(request, response);
    }
}
