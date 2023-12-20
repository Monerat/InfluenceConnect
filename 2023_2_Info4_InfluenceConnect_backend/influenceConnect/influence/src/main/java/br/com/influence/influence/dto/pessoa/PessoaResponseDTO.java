package br.com.influence.influence.dto.pessoa;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;
import br.com.influence.influence.dto.endereco.EnderecoResponseDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;
import br.com.influence.influence.dto.log.LogResponseDTO;

public class PessoaResponseDTO extends PessoaBaseDTO {
    
    private List<EnderecoResponseDTO> enderecos;
    private List<InfluenciadorResponseDTO> influenciadores;
    @JsonBackReference
    private List<LogResponseDTO> logs;
    private List<EmpresaResponseDTO> empresas;

    public List<EnderecoResponseDTO> getEnderecos() {
        return enderecos;
    }
    public void setEnderecos(List<EnderecoResponseDTO> enderecos) {
        this.enderecos = enderecos;
    }
    public List<InfluenciadorResponseDTO> getInfluenciadores() {
        return influenciadores;
    }
    public void setInfluenciadores(List<InfluenciadorResponseDTO> influenciadores) {
        this.influenciadores = influenciadores;
    }
    public List<LogResponseDTO> getLogs() {
        return logs;
    }
    public void setLogs(List<LogResponseDTO> logs) {
        this.logs = logs;
    }
    public List<EmpresaResponseDTO> getEmpresas() {
        return empresas;
    }
    public void setEmpresas(List<EmpresaResponseDTO> empresas) {
        this.empresas = empresas;
    }
    
}