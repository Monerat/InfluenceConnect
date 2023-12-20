package br.com.influence.influence.dto.influenciador;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.BooleanDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;

public abstract class InfluenciadorBaseDTO {

    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    @JsonDeserialize(using = BooleanDeserializer.class)
    protected Boolean ativo;
    protected String nomeFantasia;
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
    public Boolean getAtivo() {
        return ativo;
    }
    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
    public String getNomeFantasia() {
        return nomeFantasia;
    }
    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
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