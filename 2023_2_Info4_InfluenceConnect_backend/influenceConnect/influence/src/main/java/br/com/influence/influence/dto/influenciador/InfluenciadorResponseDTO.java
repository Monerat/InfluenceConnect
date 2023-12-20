package br.com.influence.influence.dto.influenciador;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.nicho.NichoResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialResponseDTO;
import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorResponseDTO;

public class InfluenciadorResponseDTO extends InfluenciadorBaseDTO{
    @JsonBackReference
    private PessoaResponseDTO pessoa;
    private NichoResponseDTO nicho;
    @JsonBackReference
    private List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadores;
    private List<RedeSocialResponseDTO> redesSociais;
    
    public PessoaResponseDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaResponseDTO pessoa) {
        this.pessoa = pessoa;
    }
    public NichoResponseDTO getNicho() {
        return nicho;
    }
    public void setNicho(NichoResponseDTO nicho) {
        this.nicho = nicho;
    }
    public List<CampanhaInfluenciadorResponseDTO> getCampanhasInfluenciadores() {
        return campanhasInfluenciadores;
    }
    public void setCampanhasInfluenciadores(List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadores) {
        this.campanhasInfluenciadores = campanhasInfluenciadores;
    }
    public List<RedeSocialResponseDTO> getRedesSociais() {
        return redesSociais;
    }
    public void setRedesSociais(List<RedeSocialResponseDTO> redesSociais) {
        this.redesSociais = redesSociais;
    } 
    
}
