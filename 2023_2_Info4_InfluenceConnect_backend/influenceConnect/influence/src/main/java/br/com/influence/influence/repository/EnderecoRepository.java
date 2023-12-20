package br.com.influence.influence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
}
