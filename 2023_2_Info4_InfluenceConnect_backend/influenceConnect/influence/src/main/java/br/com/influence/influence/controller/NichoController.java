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

import br.com.influence.influence.dto.nicho.NichoRequestDTO;
import br.com.influence.influence.dto.nicho.NichoResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.NichoService;
import io.swagger.v3.oas.annotations.Hidden;

@RestController
@RequestMapping("/api/nichos")
@CrossOrigin("*")
public class NichoController {
    
    @Autowired
    private NichoService nichoService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<NichoResponseDTO> adicionar(@RequestBody NichoRequestDTO nichoRequest){
        NichoResponseDTO nichoResponse = nichoService.adicionar(nichoRequest);

        return ResponseEntity
                    .status(201)
                    .body(nichoResponse);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<NichoResponseDTO>> obterTodos(){
        return ResponseEntity
                    .status(200)
                    .body(nichoService.obterTodos());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<NichoResponseDTO> obterPorId(@PathVariable Long id){
        return ResponseEntity
                    .status(200)
                    .body(nichoService.obterPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<NichoResponseDTO> atualizar(@PathVariable Long id, @RequestBody NichoRequestDTO nichoRequest){
        NichoResponseDTO nichoResponse = nichoService.atualizar(id, nichoRequest);

        return ResponseEntity
                    .status(200)
                    .body(nichoResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        nichoService.deletar(id);

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
