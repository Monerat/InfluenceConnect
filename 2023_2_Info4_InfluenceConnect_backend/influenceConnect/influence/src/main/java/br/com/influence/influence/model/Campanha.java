package br.com.influence.influence.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Table(name = "campanha")
public class Campanha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCampanha")
    private Long id;

    @Column(nullable = false)
    private Boolean ativo;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Date inicioCampanha;

    @Column(nullable = false)
    private Date encerramentoCampanha;

    @Column(nullable = false)
    private Double orcamento;

    @Column(nullable = false)
    private String nicho;

    private Double valorGasto;

    private Long imgPerfil;
    private Long imgFeed1;
    private Long imgFeed2;
    private Long imgFeed3;
    private Long imgBackground;

    @ManyToOne
    @JoinColumn(name = "idEmpresa",nullable = false)
    @JsonBackReference
    private Empresa empresa;

    @OneToMany(mappedBy = "campanha")
    private List<CampanhaInfluenciador> campanhaInfluenciadores;
    
    public Campanha() {
    }

    public Campanha(Long id) {
        this.id = id;
    }

    public Campanha(Long id, String nome, Date inicioCampanha, Date encerramentoCampanha,
            Double orcamento, CampanhaInfluenciador campanhaInfluenciador, String nicho, Empresa empresa, Double valorGasto) {
        this.id = id;
        this.nome = nome;
        this.inicioCampanha = inicioCampanha;
        this.encerramentoCampanha = encerramentoCampanha;
        this.orcamento = orcamento;
        this.campanhaInfluenciadores = new ArrayList<>();
        campanhaInfluenciadores.add(campanhaInfluenciador);
        this.nicho = nicho;
        this.empresa = empresa;
        this.valorGasto = valorGasto;
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

    public Date getInicioCampanha() {
        return inicioCampanha;
    }

    public void setInicioCampanha(Date inicioCampanha) {
        this.inicioCampanha = inicioCampanha;
    }

    public Date getEncerramentoCampanha() {
        return encerramentoCampanha;
    }

    public void setEncerramentoCampanha(Date encerramentoCampanha) {
        this.encerramentoCampanha = encerramentoCampanha;
    }

    public Double getOrcamento() {
        return orcamento;
    }

    public void setOrcamento(Double orcamento) {
        this.orcamento = orcamento;
    }

    public String getNicho() {
        return nicho;
    }

    public void setNicho(String nicho) {
        this.nicho = nicho;
    }

    public Double getValorGasto() {
        return valorGasto;
    }

    public void setValorGasto(Double valorGasto) {
        this.valorGasto = valorGasto;
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

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public List<CampanhaInfluenciador> getCampanhaInfluenciadores() {
        return campanhaInfluenciadores;
    }

    public void setCampanhaInfluenciadores(List<CampanhaInfluenciador> campanhaInfluenciadores) {
        this.campanhaInfluenciadores = campanhaInfluenciadores;
    }
    
}