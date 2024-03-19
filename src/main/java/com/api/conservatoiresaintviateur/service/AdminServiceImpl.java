package com.api.conservatoiresaintviateur.service;

import com.api.conservatoiresaintviateur.modele.Admin;
import com.api.conservatoiresaintviateur.modele.Professeur;
import com.api.conservatoiresaintviateur.repository.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Component("adminServiceImpl")
//@Primary
@Qualifier("aminServiceImpl")
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Admin creer(Admin admin) {
        admin.setMdp(this.passwordEncoder.encode(admin.getMdp()));
        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> lire() {
        return adminRepository.findAll();
    }

    @Override
    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public List<Admin> findByNomContainingOrPrenomContainingOrEmailContaining(String query) {
        if (query == null || query.isEmpty()) {
            return adminRepository.findAll();
        } else {
            return adminRepository.findByNomContainingOrPrenomContainingOrEmailContaining(query, query, query);
        }
    }

    @Override
    public String getStatusByEmail(String email) {
        return adminRepository.getStatusByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return adminRepository.existsByEmail(email);
    }

    @Override
    public List<Admin> findByStatusOrderByIdDesc(String status) {
        return adminRepository.findByStatusOrderByIdDesc(status);
    }


    @Override
    public Admin modifier(Long id, Admin admin) {
        return adminRepository.findById(id)
                .map(p-> {
                    p.setNom(admin.getNom());
                    p.setPrenom(admin.getPrenom());
                    p.setDteNaissance(admin.getDteNaissance());
                    p.setEmail(admin.getEmail());
                    p.setTelephone(admin.getTelephone());
                    p.setRole(admin.getRole());
                    p.setUpdated_at(admin.getUpdated_at());
                    p.setUpdated_by(admin.getUpdated_by());
                    p.setStatus(admin.getStatus());
                    return adminRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Admin non trouvé !"));
    }

    @Override
    public Admin modifierAll(Long id, Admin admin) {
        return adminRepository.findById(id)
                .map(p-> {
                    p.setNom(admin.getNom());
                    p.setPrenom(admin.getPrenom());
                    p.setDteNaissance(admin.getDteNaissance());
                    p.setEmail(admin.getEmail());
                    p.setMdp(this.passwordEncoder.encode(admin.getMdp()));
                    p.setTelephone(admin.getTelephone());
                    p.setRole(admin.getRole());
                    p.setUpdated_at(admin.getUpdated_at());
                    p.setUpdated_by(admin.getUpdated_by());
                    p.setStatus(admin.getStatus());
                    return adminRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Admin non trouvé !"));
    }

    @Override
    public Admin modifierOne(Long id, Admin admin) {
        return adminRepository.findById(id)
                .map(p-> {
                    p.setStatus(admin.getStatus());
                    p.setUpdated_at(admin.getUpdated_at());
                    p.setUpdated_by(admin.getUpdated_by());
                    return adminRepository.save(p);
                }).orElseThrow(() -> new RuntimeException("Admin non trouvé !"));
    }

    @Override
    public String supprimer(Long id) {
        adminRepository.deleteById(id);
        return "Produit supprimé";
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Admin user = adminRepository.findByEmail(mail);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getMdp(),
                new ArrayList<>()
        );
    }
}
