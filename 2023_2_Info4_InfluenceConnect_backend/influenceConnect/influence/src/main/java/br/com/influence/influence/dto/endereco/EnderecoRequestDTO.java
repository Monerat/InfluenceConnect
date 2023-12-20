package br.com.influence.influence.dto.endereco;

import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;

public class EnderecoRequestDTO extends EnderecoBaseDTO {

    private PessoaRequestDTO pessoa;

    public PessoaRequestDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaRequestDTO pessoa) {
        this.pessoa = pessoa;
    }

}
