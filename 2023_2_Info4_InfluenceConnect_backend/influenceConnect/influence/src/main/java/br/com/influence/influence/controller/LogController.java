package br.com.influence.influence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.influence.influence.dto.log.LogResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.LogService;
import io.swagger.v3.oas.annotations.Hidden;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin("*")
public class LogController {

    @Autowired
    private LogService logService;

    // Read
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<LogResponseDTO>> obterTodos() {
        List<LogResponseDTO> logs = logService.obterTodos();
        return ResponseEntity.ok(logs);
    }

    // Read by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<LogResponseDTO> obterPorId(@PathVariable Long id) {
        LogResponseDTO log = logService.obterPorId(id);
        return ResponseEntity.ok(log);
    }

    @Hidden
    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleUnsupportedMethod() {
        throw new MethodNotSupportedException("Você tentou fazer uma requisição que não é suportada pela API");
    }

}