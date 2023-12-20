package br.com.influence.influence.dto.log;

import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;

public class LogResponseDTO extends LogBaseDTO{
    
    private PessoaResponseDTO pessoa;

    public PessoaResponseDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaResponseDTO pessoa) {
        this.pessoa = pessoa;
    }
    
}
