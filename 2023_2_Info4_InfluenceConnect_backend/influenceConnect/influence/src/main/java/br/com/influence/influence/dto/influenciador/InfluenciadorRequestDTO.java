package br.com.influence.influence.dto.influenciador;

import java.util.List;

import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorRequestDTO;
import br.com.influence.influence.dto.nicho.NichoRequestDTO;
import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialRequestDTO;

public class InfluenciadorRequestDTO extends InfluenciadorBaseDTO {
    
    private PessoaRequestDTO pessoa;
    private NichoRequestDTO nicho;
    private List<CampanhaInfluenciadorRequestDTO> campanhasInfluenciadores;
    private List<RedeSocialRequestDTO> redesSociais;
    
    public PessoaRequestDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaRequestDTO pessoa) {
        this.pessoa = pessoa;
    }
    public NichoRequestDTO getNicho() {
        return nicho;
    }
    public void setNicho(NichoRequestDTO nicho) {
        this.nicho = nicho;
    }
    public List<CampanhaInfluenciadorRequestDTO> getCampanhasInfluenciadores() {
        return campanhasInfluenciadores;
    }
    public void setCampanhasInfluenciadores(List<CampanhaInfluenciadorRequestDTO> campanhasInfluenciadores) {
        this.campanhasInfluenciadores = campanhasInfluenciadores;
    }
    public List<RedeSocialRequestDTO> getRedesSociais() {
        return redesSociais;
    }
    public void setRedesSociais(List<RedeSocialRequestDTO> redesSociais) {
        this.redesSociais = redesSociais;
    }
    
}