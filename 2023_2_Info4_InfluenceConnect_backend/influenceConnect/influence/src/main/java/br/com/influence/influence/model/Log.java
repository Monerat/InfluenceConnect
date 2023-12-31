package br.com.influence.influence.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;

@Entity
@Table(name = "log")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idLog")
    private Long id;

    @Column(nullable = false)
    private EnumLog tipoAcao;

    @Column(nullable = false)
    private Date dataAcao;

    @Column(nullable = false)
    private EnumTipoEntidade tipoEntidade;

    @Column(columnDefinition = "text")
    private String valorOriginal;

    @Column(columnDefinition = "text")
    private String valorAtual;

    @ManyToOne
    @JoinColumn(name = "idPessoa", nullable = false)
    @JsonBackReference
    private Pessoa pessoa;
        
    public Log() {
        this.dataAcao = new Date();
    }

    public Log(Long id, EnumLog tipoAcao, EnumTipoEntidade tipoEntidade, String valorOriginal,
            String valorAtual) {
        this.id = id;
        this.tipoAcao = tipoAcao;
        this.dataAcao = new Date();
        this.tipoEntidade = tipoEntidade;
        this.valorOriginal = valorOriginal;
        this.valorAtual = valorAtual;
    }

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

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
 
}