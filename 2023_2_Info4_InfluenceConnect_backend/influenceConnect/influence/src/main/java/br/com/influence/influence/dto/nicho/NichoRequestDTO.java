package br.com.influence.influence.dto.nicho;

import java.util.List;

import br.com.influence.influence.dto.influenciador.InfluenciadorRequestDTO;

public class NichoRequestDTO extends NichoBaseDTO {
    
    private List<InfluenciadorRequestDTO> influenciadores;

    public List<InfluenciadorRequestDTO> getInfluenciadores() {
        return influenciadores;
    }
    public void setInfluenciadores(List<InfluenciadorRequestDTO> influenciadores) {
        this.influenciadores = influenciadores;
    }

}
