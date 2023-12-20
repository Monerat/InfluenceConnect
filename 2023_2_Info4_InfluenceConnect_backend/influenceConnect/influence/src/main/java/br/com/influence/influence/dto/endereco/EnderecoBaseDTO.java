package br.com.influence.influence.dto.endereco;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.EnumTipoEnderecoDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;
import br.com.influence.influence.model.Enum.EnumTipoEndereco;

public abstract class EnderecoBaseDTO {
    
    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    @JsonDeserialize(using = EnumTipoEnderecoDeserializer.class)
    protected EnumTipoEndereco tipoEndereco;
    protected String cep;
    protected String tipoLogradouro;
    protected String logradouro;
    protected String numero;
    protected String complemento;
    protected String bairro;
    protected String cidade;
    protected String estado;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public EnumTipoEndereco getTipoEndereco() {
        return tipoEndereco;
    }
    public void setTipoEndereco(EnumTipoEndereco tipoEndereco) {
        this.tipoEndereco = tipoEndereco;
    }
    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }
    public String getTipoLogradouro() {
        return tipoLogradouro;
    }
    public void setTipoLogradouro(String tipoLogradouro) {
        this.tipoLogradouro = tipoLogradouro;
    }
    public String getLogradouro() {
        return logradouro;
    }
    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }
    public String getNumero() {
        return numero;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public String getComplemento() {
        return complemento;
    }
    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
    public String getBairro() {
        return bairro;
    }
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
}