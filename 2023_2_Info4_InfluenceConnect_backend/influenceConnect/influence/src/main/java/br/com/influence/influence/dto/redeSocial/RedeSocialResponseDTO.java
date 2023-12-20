package br.com.influence.influence.dto.redeSocial;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;

public class RedeSocialResponseDTO extends RedeSocialBaseDTO {
   
    @JsonBackReference
    private InfluenciadorResponseDTO influenciador;

    public InfluenciadorResponseDTO getInfluenciador() {
        return influenciador;
    }
    public void setInfluenciador(InfluenciadorResponseDTO influenciador) {
        this.influenciador = influenciador;
    }

}
