package br.com.influence.influence.dto.campanha;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.BooleanDeserializer;
import br.com.influence.influence.deserializer.DateDeserializer;
import br.com.influence.influence.deserializer.DoubleDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;

public abstract class CampanhaBaseDTO {
    
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    protected String nome;
    @JsonDeserialize(using = BooleanDeserializer.class)
    protected Boolean ativo;
    @JsonDeserialize(using = DateDeserializer.class)
    protected Date inicioCampanha;
    @JsonDeserialize(using = DateDeserializer.class)
    protected Date encerramentoCampanha;
    @JsonDeserialize(using = DoubleDeserializer.class)
    protected Double orcamento;
    protected String nicho;
    @JsonDeserialize(using = DoubleDeserializer.class)
    protected Double valorGasto;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long imgPerfil;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long imgFeed1;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long imgFeed2;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long imgFeed3;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long imgBackground;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Boolean getAtivo() {
        return ativo;
    }
    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
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
    
}