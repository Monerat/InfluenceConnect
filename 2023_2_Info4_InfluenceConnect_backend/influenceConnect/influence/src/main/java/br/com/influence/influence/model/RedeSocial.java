package br.com.influence.influence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.model.Enum.EnumRedeSocial;

@Entity
@Table(name = "redeSocial")
public class RedeSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRedeSocial")
    private Long id;

    @Column(nullable = false)
    private EnumRedeSocial nomeRede;
    
    @Column(nullable = false)
    private String arroba;
    
    @Column(nullable = false)
    private String link;
    
    @Column(nullable = false)
    private Double custoPubli;
    
    @Column(nullable = false)
    private Integer quantidadeSeguidores;
    
    @Column(nullable = false)
    private Double taxaEngajamento;
    
    @Column(nullable = false)
    private String regiaoAtuacao;
    
    @ManyToOne
    @JoinColumn(name = "idInfluenciador", nullable = false)
    @JsonBackReference
    private Influenciador influenciador;
    
    public RedeSocial() {
    }

    public RedeSocial(Long id) {
        this.id = id;
    }
    
    public RedeSocial(Long id, EnumRedeSocial nomeRede, String arroba, String link, Double custoPubli,
            Integer quantidadeSeguidores, Double taxaEngajamento, String regiaoAtuacao, Influenciador influenciador) {
        this.id = id;
        this.nomeRede = nomeRede;
        this.arroba = arroba;
        this.link = link;
        this.custoPubli = custoPubli;
        this.quantidadeSeguidores = quantidadeSeguidores;
        this.taxaEngajamento = taxaEngajamento;
        this.regiaoAtuacao = regiaoAtuacao;
        this.influenciador = influenciador;
    }

    public RedeSocial(Long id, EnumRedeSocial nomeRede, String arroba, String link, Double custoPubli,
            Integer quantidadeSeguidores, Double taxaEngajamento, String regiaoAtuacao) {
        this.id = id;
        this.nomeRede = nomeRede;
        this.arroba = arroba;
        this.link = link;
        this.custoPubli = custoPubli;
        this.quantidadeSeguidores = quantidadeSeguidores;
        this.taxaEngajamento = taxaEngajamento;
        this.regiaoAtuacao = regiaoAtuacao;
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EnumRedeSocial getNomeRede() {
        return nomeRede;
    }

    public void setNomeRede(EnumRedeSocial nomeRede) {
        this.nomeRede = nomeRede;
    }

    public String getArroba() {
        return arroba;
    }

    public void setArroba(String arroba) {
        this.arroba = arroba;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Double getCustoPubli() {
        return custoPubli;
    }

    public void setCustoPubli(Double custoPubli) {
        this.custoPubli = custoPubli;
    }

    public Integer getQuantidadeSeguidores() {
        return quantidadeSeguidores;
    }

    public void setQuantidadeSeguidores(Integer quantidadeSeguidores) {
        this.quantidadeSeguidores = quantidadeSeguidores;
    }

    public Double getTaxaEngajamento() {
        return taxaEngajamento;
    }

    public void setTaxaEngajamento(Double taxaEngajamento) {
        this.taxaEngajamento = taxaEngajamento;
    }

    public String getRegiaoAtuacao() {
        return regiaoAtuacao;
    }

    public void setRegiaoAtuacao(String regiaoAtuacao) {
        this.regiaoAtuacao = regiaoAtuacao;
    }

    public Influenciador getInfluenciador() {
        return influenciador;
    }

    public void setInfluenciador(Influenciador influenciador) {
        this.influenciador = influenciador;
    }
          
}