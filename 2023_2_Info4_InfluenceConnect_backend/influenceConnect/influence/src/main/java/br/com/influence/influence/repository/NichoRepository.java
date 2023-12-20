package br.com.influence.influence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Nicho;

public interface NichoRepository extends JpaRepository<Nicho, Long> {
    Optional<Nicho> findByNome(String nome);
}