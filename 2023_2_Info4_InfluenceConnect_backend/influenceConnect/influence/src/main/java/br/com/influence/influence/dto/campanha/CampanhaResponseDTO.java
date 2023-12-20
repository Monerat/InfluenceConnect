package br.com.influence.influence.dto.campanha;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorResponseDTO;
import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;

public class CampanhaResponseDTO extends CampanhaBaseDTO{
    
    @JsonBackReference
    private EmpresaResponseDTO empresa;
    private List<CampanhaInfluenciadorResponseDTO> campanhaInfluenciadores;
    
    public EmpresaResponseDTO getEmpresa() {
        return empresa;
    }
    public void setEmpresa(EmpresaResponseDTO empresa) {
        this.empresa = empresa;
    }
    public List<CampanhaInfluenciadorResponseDTO> getCampanhaInfluenciadores() {
        return campanhaInfluenciadores;
    }
    public void setCampanhaInfluenciadores(List<CampanhaInfluenciadorResponseDTO> campanhaInfluenciadores) {
        this.campanhaInfluenciadores = campanhaInfluenciadores;
    }
    
}
