package br.com.influence.influence.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorRequestDTO;
import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.CampanhaInfluenciadorService;
import io.swagger.v3.oas.annotations.Hidden;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/campanhainfluenciador")
@CrossOrigin("*")
public class CampanhaInfluenciadorController {
    
    @Autowired
    private CampanhaInfluenciadorService campanhaInfluenciadorService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CampanhaInfluenciadorResponseDTO> adicionar(@RequestBody CampanhaInfluenciadorRequestDTO campanhaRequest) {
        CampanhaInfluenciadorResponseDTO campanhaAdicionada = campanhaInfluenciadorService.adicionar(campanhaRequest);

        return ResponseEntity
                .status(201)
                .body(campanhaAdicionada);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CampanhaInfluenciadorResponseDTO> atualizar(@PathVariable Long id, 
                @RequestBody CampanhaInfluenciadorRequestDTO campanhaRequest) {
        CampanhaInfluenciadorResponseDTO campanhaAtualizada = campanhaInfluenciadorService.atualizar(id, campanhaRequest);

        return ResponseEntity
                .status(200)
                .body(campanhaAtualizada);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<CampanhaInfluenciadorResponseDTO>> obterTodos() {
        return ResponseEntity
                .status(200)
                .body(campanhaInfluenciadorService.obterTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CampanhaInfluenciadorResponseDTO> obterPorId(@PathVariable Long id) {
        return ResponseEntity
                .status(200)
                .body(campanhaInfluenciadorService.obterPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        campanhaInfluenciadorService.deletar(id);

        return ResponseEntity
                .status(204)
                .build();
    }

    @Hidden
    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleUnsupportedMethod() {
        throw new MethodNotSupportedException("Você tentou fazer uma requisição que não é suportada pela API");
    }
    
}
