package br.com.influence.influence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Pessoa;

public interface PessoaRepository extends JpaRepository <Pessoa, Long>{
    Optional<Pessoa> findByEmail(String email);
    Optional<Pessoa> findByCpf(String cpf);
}
