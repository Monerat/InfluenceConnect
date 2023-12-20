package br.com.influence.influence.dto.campanhaInfluenciador;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.DoubleDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;

public abstract class CampanhaInfluenciadorBaseDTO {
    
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    @JsonDeserialize(using = DoubleDeserializer.class)
    protected Double valorGasto;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long quantidade;
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long idRedeSocial;

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

}