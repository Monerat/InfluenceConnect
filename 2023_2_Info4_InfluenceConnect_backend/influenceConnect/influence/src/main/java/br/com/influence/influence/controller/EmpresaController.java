package br.com.influence.influence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.influence.influence.dto.empresa.EmpresaRequestDTO;
import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.EmpresaService;
import br.com.influence.influence.service.ImageService;
import io.swagger.v3.oas.annotations.Hidden;

import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;
@RestController
@RequestMapping("/api/empresas")
@CrossOrigin("*")
public class EmpresaController {
    
    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ImageService imageService;

    @PostMapping("/imagem/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> salvarArquivo(@PathVariable Long id, @RequestParam("perfil") MultipartFile perfil,
        @RequestParam("feed1") MultipartFile feed1, @RequestParam("feed2") MultipartFile feed2,
        @RequestParam("feed3") MultipartFile feed3, @RequestParam("background") MultipartFile background) {
        
        ResponseEntity<String> resposta = empresaService.salvarArquivo(id, perfil, feed1, feed2, feed3, background, "empresa");

        return resposta;
    }

    @GetMapping("/imagem/{id}")
    public ResponseEntity<?> getImagem(@PathVariable Long id) {
       byte[] imageData = imageService.downloadImage(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(IMAGE_PNG_VALUE))
                .body(imageData);
    }
    
    
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<EmpresaResponseDTO> adicionar(@RequestBody EmpresaRequestDTO empresaRequest){
        EmpresaResponseDTO empresaResponse = empresaService.adicionar(empresaRequest);

        return ResponseEntity
                    .status(201)
                    .body(empresaResponse);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<EmpresaResponseDTO>> obterTodos(){
        return ResponseEntity
                    .status(200)
                    .body(empresaService.obterTodos());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<EmpresaResponseDTO> obterPorId(@PathVariable Long id){
        return ResponseEntity
                    .status(200)
                    .body(empresaService.obterPorId(id));
    }

    @GetMapping("/pessoa/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PessoaResponseDTO> obterPessoaMarca(@PathVariable Long id) {
        return ResponseEntity
                    .status(200)
                    .body(empresaService.obterPessoa(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<EmpresaResponseDTO> atualizar(@PathVariable Long id, @RequestBody EmpresaRequestDTO empresaRequest){
        EmpresaResponseDTO empresaResponse = empresaService.atualizar(id, empresaRequest);

        return ResponseEntity
                    .status(200)
                    .body(empresaResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        empresaService.deletar(id);

        return ResponseEntity
                    .status(204)
                    .build();
    }

    @GetMapping("/campanhas")
    @PreAuthorize("hasAuthority('MARCA')")
    public ResponseEntity<EmpresaResponseDTO> obterCampanhas() {
        EmpresaResponseDTO empresaResponse = empresaService.obterCampanhas();

        return ResponseEntity
                    .status(200)
                    .body(empresaResponse);
    }

    @Hidden
    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleUnsupportedMethod() {
        throw new MethodNotSupportedException("Você tentou fazer uma requisição que não é suportada pela API");
    }
    
}