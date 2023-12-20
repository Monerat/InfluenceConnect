package br.com.influence.influence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.influence.influence.model.Log;

public interface LogRepository extends JpaRepository<Log, Long> {
}
