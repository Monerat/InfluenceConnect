package br.com.influence.influence.dto.campanhaInfluenciador;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.campanha.CampanhaResponseDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;

public class CampanhaInfluenciadorResponseDTO extends CampanhaInfluenciadorBaseDTO{

    @JsonBackReference
    private CampanhaResponseDTO campanha;
    private InfluenciadorResponseDTO influenciador;
    
    public CampanhaResponseDTO getCampanha() {
        return campanha;
    }
    public void setCampanha(CampanhaResponseDTO campanha) {
        this.campanha = campanha;
    }
    public InfluenciadorResponseDTO getInfluenciador() {
        return influenciador;
    }
    public void setInfluenciador(InfluenciadorResponseDTO influenciador) {
        this.influenciador = influenciador;
    }
    
}
