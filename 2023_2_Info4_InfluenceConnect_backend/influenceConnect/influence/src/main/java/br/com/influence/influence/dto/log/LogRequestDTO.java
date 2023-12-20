package br.com.influence.influence.dto.log;

import java.util.Date;

import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;

public class LogRequestDTO extends LogBaseDTO{
    private PessoaRequestDTO pessoa;

    public LogRequestDTO(EnumLog tipoAcao, EnumTipoEntidade tipoEntidade, String valorOriginal, String valorAtual,
            PessoaRequestDTO pessoa) {
        this.tipoAcao = tipoAcao;
        this.tipoEntidade = tipoEntidade;
        this.valorOriginal = valorOriginal;
        this.valorAtual = valorAtual;
        this.pessoa = pessoa;
        this.dataAcao = new Date();
    }

    public LogRequestDTO() {
    }

    public PessoaRequestDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaRequestDTO pessoa) {
        this.pessoa = pessoa;
    }
    
}
