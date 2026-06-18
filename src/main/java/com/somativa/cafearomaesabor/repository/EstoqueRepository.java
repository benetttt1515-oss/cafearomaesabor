package com.somativa.cafearomaesabor.repository;

import com.somativa.cafearomaesabor.model.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
}