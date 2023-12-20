package br.com.influence.influence.dto.nicho;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;

public class NichoResponseDTO extends NichoBaseDTO{
    
    @JsonBackReference
    private List<InfluenciadorResponseDTO> influenciadores;

    public List<InfluenciadorResponseDTO> getInfluenciadores() {
        return influenciadores;
    }
    public void setInfluenciadores(List<InfluenciadorResponseDTO> influenciadores) {
        this.influenciadores = influenciadores;
    }

}
