package br.com.influence.influence.dto.campanhaInfluenciador;

import br.com.influence.influence.dto.campanha.CampanhaRequestDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorRequestDTO;

public class CampanhaInfluenciadorRequestDTO extends CampanhaInfluenciadorBaseDTO{

    private CampanhaRequestDTO campanha;
    private InfluenciadorRequestDTO influenciador;
    
    public CampanhaRequestDTO getCampanha() {
        return campanha;
    }
    public void setCampanha(CampanhaRequestDTO campanha) {
        this.campanha = campanha;
    }
    public InfluenciadorRequestDTO getInfluenciador() {
        return influenciador;
    }
    public void setInfluenciador(InfluenciadorRequestDTO influenciador) {
        this.influenciador = influenciador;
    }

}
