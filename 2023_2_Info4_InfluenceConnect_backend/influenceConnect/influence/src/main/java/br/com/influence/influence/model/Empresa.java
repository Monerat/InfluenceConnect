package br.com.influence.influence.model;

import java.util.List;
import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEmpresa")
    private Long id;

    @Column(nullable = false)
    private Boolean ativo;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Column(nullable = false)
    private String segmento;

    private Long imgPerfil;
    private Long imgFeed1;
    private Long imgFeed2;
    private Long imgFeed3;
    private Long imgBackground;

    @ManyToOne
    @JoinColumn(name = "idPessoa")
    @JsonBackReference
    private Pessoa pessoa;

    @OneToMany(mappedBy = "empresa")
    private List<Campanha> campanhas;
    
    public Empresa(Long id) {
        this.id = id;
    }
    
    public Empresa() {
    }

    public Empresa(Long id, String nome, Boolean ativo, String cnpj, String segmento, Pessoa pessoa, Campanha campanha) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
        this.segmento = segmento;
        this.ativo = ativo;
        this.pessoa = pessoa;
        this.campanhas = new ArrayList<>();
        this.campanhas.add(campanha);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getSegmento() {
        return segmento;
    }

    public void setSegmento(String segmento) {
        this.segmento = segmento;
    }

    public Long getImgPerfil() {
        return imgPerfil;
    }

    public void setImgPerfil(Long imgPerfil) {
        this.imgPerfil = imgPerfil;
    }

    public Long getImgFeed1() {
        return imgFeed1;
    }

    public void setImgFeed1(Long imgFeed1) {
        this.imgFeed1 = imgFeed1;
    }

    public Long getImgFeed2() {
        return imgFeed2;
    }

    public void setImgFeed2(Long imgFeed2) {
        this.imgFeed2 = imgFeed2;
    }

    public Long getImgFeed3() {
        return imgFeed3;
    }

    public void setImgFeed3(Long imgFeed3) {
        this.imgFeed3 = imgFeed3;
    }

    public Long getImgBackground() {
        return imgBackground;
    }

    public void setImgBackground(Long imgBackground) {
        this.imgBackground = imgBackground;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public List<Campanha> getCampanhas() {
        return campanhas;
    }

    public void setCampanhas(List<Campanha> campanhas) {
        this.campanhas = campanhas;
    }
    
}
