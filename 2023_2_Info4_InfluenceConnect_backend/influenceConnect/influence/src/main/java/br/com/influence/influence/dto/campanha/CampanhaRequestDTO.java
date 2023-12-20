package br.com.influence.influence.dto.campanha;

import java.util.List;

import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorRequestDTO;
import br.com.influence.influence.dto.empresa.EmpresaRequestDTO;


public class CampanhaRequestDTO extends CampanhaBaseDTO{
    
    private EmpresaRequestDTO empresa;
    private List<CampanhaInfluenciadorRequestDTO> campanhaInfluenciadores;
    
    public EmpresaRequestDTO getEmpresa() {
        return empresa;
    }
    public void setEmpresa(EmpresaRequestDTO empresa) {
        this.empresa = empresa;
    }
    public List<CampanhaInfluenciadorRequestDTO> getCampanhaInfluenciadores() {
        return campanhaInfluenciadores;
    }
    public void setCampanhaInfluenciadores(List<CampanhaInfluenciadorRequestDTO> campanhaInfluenciadores) {
        this.campanhaInfluenciadores = campanhaInfluenciadores;
    }

}
