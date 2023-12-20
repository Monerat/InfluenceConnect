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

import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorRequestDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.model.error.ErrorResponse;
import br.com.influence.influence.model.exceptions.MethodNotSupportedException;
import br.com.influence.influence.service.ImageService;
import br.com.influence.influence.service.InfluenciadorService;
import io.swagger.v3.oas.annotations.Hidden;

import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/api/influenciadores")
@CrossOrigin("*")
public class InfluenciadorController {
    
    @Autowired
    private InfluenciadorService influenciadorService;

    @Autowired
    private ImageService imageService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<InfluenciadorResponseDTO> adicionar(@RequestBody InfluenciadorRequestDTO influenciadorRequest){
        InfluenciadorResponseDTO influenciadorResponse = influenciadorService.adicionar(influenciadorRequest);

        return ResponseEntity
                    .status(201)
                    .body(influenciadorResponse);
    }

    @PostMapping("/public")
    public ResponseEntity<InfluenciadorResponseDTO> adicionarPublic(@RequestBody InfluenciadorRequestDTO influenciadorRequest){
        InfluenciadorResponseDTO influenciadorResponse = influenciadorService.adicionarPublic(influenciadorRequest);

        return ResponseEntity
                    .status(201)
                    .body(influenciadorResponse);
    }

    @GetMapping("/pessoa/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PessoaResponseDTO> obterPessoaMarca(@PathVariable Long id) {
        return ResponseEntity
                    .status(200)
                    .body(influenciadorService.obterPessoa(id));
    }

    @GetMapping("/imagem/{id}")
    public ResponseEntity<?> getImagem(@PathVariable Long id) {
       byte[] imageData = imageService.downloadImage(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(IMAGE_PNG_VALUE))
                .body(imageData);
    }

    @PostMapping("/imagem/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> salvarArquivo(@PathVariable Long id, @RequestParam("perfil") MultipartFile perfil,
        @RequestParam("feed1") MultipartFile feed1, @RequestParam("feed2") MultipartFile feed2,
        @RequestParam("feed3") MultipartFile feed3, @RequestParam("background") MultipartFile background) {
        ResponseEntity<String> resposta = influenciadorService.salvarArquivo(id,perfil, feed1, feed2, feed3,background, "influenciador");

        return resposta;
    }

    @GetMapping("/ativos")
    @PreAuthorize("hasAuthority('MARCA')")
    public ResponseEntity<List<InfluenciadorResponseDTO>> obterTodosAtivos(){
        return ResponseEntity
                    .status(200)
                    .body(influenciadorService.obterTodosAtivos());
    }

    @GetMapping("/ativos/{id}")
    @PreAuthorize("hasAuthority('MARCA')")
    public ResponseEntity<InfluenciadorResponseDTO> obterPorIdAtivo(@PathVariable Long id){
        return ResponseEntity
                    .status(200)
                    .body(influenciadorService.obterPorIdAtivo(id));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<InfluenciadorResponseDTO>> obterTodos(){
        return ResponseEntity
                    .status(200)
                    .body(influenciadorService.obterTodos());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MARCA')")
    public ResponseEntity<InfluenciadorResponseDTO> obterPorId(@PathVariable Long id){
        return ResponseEntity
                    .status(200)
                    .body(influenciadorService.obterPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<InfluenciadorResponseDTO> atualizar(@PathVariable Long id, @RequestBody InfluenciadorRequestDTO influenciadorRequest){
        InfluenciadorResponseDTO influenciadorResponse = influenciadorService.atualizar(id, influenciadorRequest);

        return ResponseEntity
                    .status(200)
                    .body(influenciadorResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        influenciadorService.deletar(id);

        return ResponseEntity
                    .status(204)
                    .build();
    }

    @GetMapping("/campanhas-marcas")
    @PreAuthorize("hasAuthority('INFLUENCIADOR')")
    public ResponseEntity<List<EmpresaResponseDTO>> obterEmpresas() {
        List<EmpresaResponseDTO> empresasResponse = influenciadorService.obterEmpresas();
        
        return ResponseEntity
                    .status(200)
                    .body(empresasResponse);
    }

    @Hidden
    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleUnsupportedMethod() {
        throw new MethodNotSupportedException("Você tentou fazer uma requisição que não é suportada pela API");
    }

}
