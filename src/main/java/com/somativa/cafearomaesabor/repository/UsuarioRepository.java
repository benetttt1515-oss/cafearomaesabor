package com.somativa.cafearomaesabor.repository;

import com.somativa.cafearomaesabor.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
