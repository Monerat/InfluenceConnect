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

@Entity
@Table(name = "campanhaInfluenciador")
public class CampanhaInfluenciador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCampanhaInfluenciador")
    private Long id;

    private Double valorGasto;

    @Column(nullable = false)
    private Long quantidade;

    @Column(nullable = false)
    private Long idRedeSocial;

    @ManyToOne
    @JoinColumn(name = "idInfluenciador",nullable = false)
    @JsonBackReference
    private Influenciador influenciador;

    @ManyToOne
    @JoinColumn(name = "idCampanha",nullable = false)
    @JsonBackReference
    private Campanha campanha;
    
    public CampanhaInfluenciador() {
    }

    public CampanhaInfluenciador(Long id) {
        this.id = id;
    }

    public CampanhaInfluenciador(Long id, Double valorGasto, Campanha campanha, Influenciador influenciador, Long quantidade, Long idRedeSocial) {
        this.id = id;
        this.valorGasto = valorGasto;
        this.campanha = campanha;
        this.influenciador = influenciador;
        this.quantidade = quantidade;
        this.idRedeSocial = idRedeSocial;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValorGasto() {
        return valorGasto;
    }

    public void setValorGasto(Double valorGasto) {
        this.valorGasto = valorGasto;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public Long getIdRedeSocial() {
        return idRedeSocial;
    }

    public void setIdRedeSocial(Long idRedeSocial) {
        this.idRedeSocial = idRedeSocial;
    }

    public Influenciador getInfluenciador() {
        return influenciador;
    }

    public void setInfluenciador(Influenciador influenciador) {
        this.influenciador = influenciador;
    }

    public Campanha getCampanha() {
        return campanha;
    }

    public void setCampanha(Campanha campanha) {
        this.campanha = campanha;
    }
    
}
