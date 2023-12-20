package br.com.influence.influence.dto.empresa;

import java.util.List;

import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.dto.campanha.CampanhaRequestDTO;

public class EmpresaRequestDTO extends EmpresaBaseDTO{
    
    private PessoaRequestDTO pessoa;
    private List<CampanhaRequestDTO> campanhas;
    
    public PessoaRequestDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaRequestDTO pessoa) {
        this.pessoa = pessoa;
    }
    public List<CampanhaRequestDTO> getCampanhas() {
        return campanhas;
    }
    public void setCampanhas(List<CampanhaRequestDTO> campanhas) {
        this.campanhas = campanhas;
    }

}
