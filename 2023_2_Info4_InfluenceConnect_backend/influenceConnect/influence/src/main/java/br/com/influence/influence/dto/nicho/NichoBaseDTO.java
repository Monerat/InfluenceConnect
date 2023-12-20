package br.com.influence.influence.dto.nicho;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.EnumFaixaEtariaDeserializer;
import br.com.influence.influence.deserializer.EnumGeneroDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;
import br.com.influence.influence.model.Enum.EnumFaixaEtaria;
import br.com.influence.influence.model.Enum.EnumGenero;

public abstract class NichoBaseDTO {

    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    protected String nome;
    protected String descricao;
    @JsonDeserialize(using = EnumFaixaEtariaDeserializer.class)
    protected EnumFaixaEtaria faixaEtaria;
    @JsonDeserialize(using = EnumGeneroDeserializer.class)
    protected EnumGenero genero;

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
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public EnumFaixaEtaria getFaixaEtaria() {
        return faixaEtaria;
    }
    public void setFaixaEtaria(EnumFaixaEtaria faixaEtaria) {
        this.faixaEtaria = faixaEtaria;
    }
    public EnumGenero getGenero() {
        return genero;
    }
    public void setGenero(EnumGenero genero) {
        this.genero = genero;
    }    
    
}