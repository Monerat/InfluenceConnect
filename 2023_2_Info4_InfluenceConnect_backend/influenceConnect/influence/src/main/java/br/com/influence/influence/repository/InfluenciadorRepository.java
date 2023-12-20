package br.com.influence.influence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Influenciador;

public interface InfluenciadorRepository extends JpaRepository<Influenciador, Long> {
}