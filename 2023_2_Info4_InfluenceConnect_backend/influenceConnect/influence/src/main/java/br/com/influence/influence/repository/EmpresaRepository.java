package br.com.influence.influence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
    Optional<Empresa> findByCnpj(String cnpj);
}
