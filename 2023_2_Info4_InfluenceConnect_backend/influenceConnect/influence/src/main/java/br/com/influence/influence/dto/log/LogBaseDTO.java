package br.com.influence.influence.dto.log;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.DateDeserializer;
import br.com.influence.influence.deserializer.EnumLogDeserializer;
import br.com.influence.influence.deserializer.EnumTipoEntidadeDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;

public abstract class LogBaseDTO {

    @JsonDeserialize(using = LongDeserializer.class)
    protected Long id;
    @JsonDeserialize(using = EnumLogDeserializer.class)
    protected EnumLog tipoAcao;
    @JsonDeserialize(using = DateDeserializer.class)
    protected Date dataAcao;
    @JsonDeserialize(using = EnumTipoEntidadeDeserializer.class)
    protected EnumTipoEntidade tipoEntidade;
    protected String valorOriginal;
    protected String valorAtual;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public EnumLog getTipoAcao() {
        return tipoAcao;
    }
    public void setTipoAcao(EnumLog tipoAcao) {
        this.tipoAcao = tipoAcao;
    }
    public Date getDataAcao() {
        return dataAcao;
    }
    public void setDataAcao(Date dataAcao) {
        this.dataAcao = dataAcao;
    }
    public EnumTipoEntidade getTipoEntidade() {
        return tipoEntidade;
    }
    public void setTipoEntidade(EnumTipoEntidade tipoEntidade) {
        this.tipoEntidade = tipoEntidade;
    }
    public String getValorOriginal() {
        return valorOriginal;
    }
    public void setValorOriginal(String valorOriginal) {
        this.valorOriginal = valorOriginal;
    }
    public String getValorAtual() {
        return valorAtual;
    }
    public void setValorAtual(String valorAtual) {
        this.valorAtual = valorAtual;
    }

}



