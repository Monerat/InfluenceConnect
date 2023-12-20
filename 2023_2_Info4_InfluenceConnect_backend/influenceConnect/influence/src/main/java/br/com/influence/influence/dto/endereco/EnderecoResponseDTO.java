package br.com.influence.influence.dto.endereco;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;

public class EnderecoResponseDTO extends EnderecoBaseDTO {
    @JsonBackReference
    private PessoaResponseDTO pessoa;

    public PessoaResponseDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaResponseDTO pessoa) {
        this.pessoa = pessoa;
    }
   
}
