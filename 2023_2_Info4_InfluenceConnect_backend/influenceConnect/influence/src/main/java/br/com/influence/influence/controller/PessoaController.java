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

import br.com.influence.influence.dto.pessoa.PessoaLoginRequestDTO;
import br.com.influence.influence.dto.pessoa.PessoaLoginResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.PessoaService;
import io.swagger.v3.oas.annotations.Hidden;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin("*")
public class PessoaController {
    
    @Autowired
    private PessoaService pessoaService;


    @PostMapping("/login")
    public ResponseEntity<PessoaLoginResponseDTO> logar(@RequestBody PessoaLoginRequestDTO pessoaloginRequest) {

        PessoaLoginResponseDTO pessoaLogado = pessoaService.logar(pessoaloginRequest.getEmail(),
                pessoaloginRequest.getSenha());

        return ResponseEntity
                .status(200)
                .body(pessoaLogado);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PessoaResponseDTO> adicionar(@RequestBody PessoaRequestDTO pessoaRequest){
        PessoaResponseDTO pessoaResponse = pessoaService.adicionar(pessoaRequest);

        return ResponseEntity
                    .status(201)
                    .body(pessoaResponse);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<PessoaResponseDTO>> obterTodos(){
        return ResponseEntity
                    .status(200)
                    .body(pessoaService.obterTodos());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PessoaResponseDTO> obterPorId(@PathVariable Long id){
        return ResponseEntity
                    .status(200)
                    .body(pessoaService.obterPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PessoaResponseDTO> atualizar(@PathVariable Long id, @RequestBody PessoaRequestDTO pessoaRequest){
        PessoaResponseDTO pessoaResponse = pessoaService.atualizar(id, pessoaRequest);

        return ResponseEntity
                    .status(200)
                    .body(pessoaResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        pessoaService.deletar(id);

        return ResponseEntity
                    .status(204)
                    .build();
    }
    
    @GetMapping("/public")
    public ResponseEntity<PessoaResponseDTO> obterPorIdPublicoLogado() {
        return ResponseEntity
                .status(200)
                .body(pessoaService.obterPessoaLogado());
    }

    @Hidden
    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleUnsupportedMethod() {
        throw new MethodNotSupportedException("Você tentou fazer uma requisição que não é suportada pela API");
    }
    
}