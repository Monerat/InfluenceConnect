package br.com.influence.influence.controller;

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
import org.springframework.web.bind.annotation.RestController;

import br.com.influence.influence.dto.redeSocial.RedeSocialRequestDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.RedeSocialService;
import io.swagger.v3.oas.annotations.Hidden;

@RestController
@RequestMapping("/api/redessociais")
@CrossOrigin("*")
public class RedeSocialController {
    
    @Autowired
    private RedeSocialService redeSocialService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RedeSocialResponseDTO> adicionar(@RequestBody RedeSocialRequestDTO redeSocialRequest){
        RedeSocialResponseDTO redeSocialResponse = redeSocialService.adicionar(redeSocialRequest);

        return ResponseEntity
                    .status(201)
                    .body(redeSocialResponse);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<RedeSocialResponseDTO>> obterTodos(){
        return ResponseEntity
                    .status(200)
                    .body(redeSocialService.obterTodos());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RedeSocialResponseDTO> obterPorId(@PathVariable Long id){
        return ResponseEntity
                    .status(200)
                    .body(redeSocialService.obterPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RedeSocialResponseDTO> atualizar(@PathVariable Long id, @RequestBody RedeSocialRequestDTO redeSocialRequest){
        RedeSocialResponseDTO redeSocialResponse = redeSocialService.atualizar(id, redeSocialRequest);

        return ResponseEntity
                    .status(200)
                    .body(redeSocialResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        redeSocialService.deletar(id);

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
