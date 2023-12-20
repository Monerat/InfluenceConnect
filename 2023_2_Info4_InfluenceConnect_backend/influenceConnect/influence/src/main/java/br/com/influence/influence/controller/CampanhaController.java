package br.com.influence.influence.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import br.com.influence.influence.dto.campanha.CampanhaRequestDTO;
import br.com.influence.influence.dto.campanha.CampanhaResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.CampanhaService;
import br.com.influence.influence.service.ImageService;
import io.swagger.v3.oas.annotations.Hidden;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;
  
@RestController
@RequestMapping("/api/campanhas")
@CrossOrigin("*")
public class CampanhaController {

    @Autowired
    private CampanhaService campanhaService;

    @Autowired
    private ImageService imageService;

    @PostMapping("/imagem/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> salvarArquivo(@PathVariable Long id, @RequestParam("perfil") MultipartFile perfil,
        @RequestParam("feed1") MultipartFile feed1, @RequestParam("feed2") MultipartFile feed2,
        @RequestParam("feed3") MultipartFile feed3, @RequestParam("background") MultipartFile background) {
        
        ResponseEntity<String> resposta = campanhaService.salvarArquivo(id, perfil, feed1, feed2, feed3, background, "campanha");

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
    public ResponseEntity<CampanhaResponseDTO> adicionar(@RequestBody CampanhaRequestDTO campanhaRequest) {
        CampanhaResponseDTO campanhaAdicionada = campanhaService.adicionar(campanhaRequest);

        return ResponseEntity
                .status(201)
                .body(campanhaAdicionada);        
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CampanhaResponseDTO> atualizar(@PathVariable Long id, 
                @RequestBody CampanhaRequestDTO campanhaRequest) {
        CampanhaResponseDTO campanhaAtualizada = campanhaService.atualizar(id, campanhaRequest);

        return ResponseEntity
                .status(200)
                .body(campanhaAtualizada);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<CampanhaResponseDTO>> obterTodos() {
        return ResponseEntity
                .status(200)
                .body(campanhaService.obterTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CampanhaResponseDTO> obterPorId(@PathVariable Long id) {
        return ResponseEntity
                .status(200)
                .body(campanhaService.obterPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        campanhaService.deletar(id);

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

