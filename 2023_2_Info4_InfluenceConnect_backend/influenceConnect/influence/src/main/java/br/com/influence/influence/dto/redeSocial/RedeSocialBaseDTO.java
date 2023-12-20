package br.com.influence.influence.dto.redeSocial;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.DoubleDeserializer;
import br.com.influence.influence.deserializer.EnumRedeSocialDeserializer;
import br.com.influence.influence.deserializer.IntegerDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;
import br.com.influence.influence.model.Enum.EnumRedeSocial;


public abstract class RedeSocialBaseDTO {
    
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    @JsonDeserialize(using = EnumRedeSocialDeserializer.class)
    protected EnumRedeSocial nomeRede;
    protected String arroba;
    protected String link;
    @JsonDeserialize(using = DoubleDeserializer.class)
    protected Double custoPubli;
    @JsonDeserialize(using = IntegerDeserializer.class)
    protected Integer quantidadeSeguidores;
    @JsonDeserialize(using = DoubleDeserializer.class)
    protected Double taxaEngajamento;
    protected String regiaoAtuacao;
    
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

}