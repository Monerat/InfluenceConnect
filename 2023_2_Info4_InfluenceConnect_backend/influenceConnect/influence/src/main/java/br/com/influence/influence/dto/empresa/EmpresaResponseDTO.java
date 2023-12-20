package br.com.influence.influence.dto.empresa;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.campanha.CampanhaResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;

public class EmpresaResponseDTO extends EmpresaBaseDTO{
    @JsonBackReference
    private PessoaResponseDTO pessoa;
    private List<CampanhaResponseDTO> campanhas;
    
    public PessoaResponseDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaResponseDTO pessoa) {
        this.pessoa = pessoa;
    }
    public List<CampanhaResponseDTO> getCampanhas() {
        return campanhas;
    }
    public void setCampanhas(List<CampanhaResponseDTO> campanhas) {
        this.campanhas = campanhas;
    } 
   
}
