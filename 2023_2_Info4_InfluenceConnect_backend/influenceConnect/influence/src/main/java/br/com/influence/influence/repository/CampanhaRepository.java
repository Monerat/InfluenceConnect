package br.com.influence.influence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Campanha;

public interface CampanhaRepository extends JpaRepository<Campanha, Long> {
}
