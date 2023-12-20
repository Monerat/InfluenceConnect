package br.com.influence.influence.dto.redeSocial;

import br.com.influence.influence.dto.influenciador.InfluenciadorRequestDTO;

public class RedeSocialRequestDTO extends RedeSocialBaseDTO {
    
    private InfluenciadorRequestDTO influenciador;

    public InfluenciadorRequestDTO getInfluenciador() {
        return influenciador;
    }
    public void setInfluenciador(InfluenciadorRequestDTO influenciador) {
        this.influenciador = influenciador;
    }
    
}
