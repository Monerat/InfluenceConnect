package br.com.influence.influence.dto.pessoa;

import java.util.List;

import br.com.influence.influence.dto.empresa.EmpresaRequestDTO;
import br.com.influence.influence.dto.endereco.EnderecoRequestDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorRequestDTO;
import br.com.influence.influence.dto.log.LogRequestDTO;


public class PessoaRequestDTO extends PessoaBaseDTO {
    
    private List<EnderecoRequestDTO> enderecos;
    private List<LogRequestDTO> logs;
    private List<InfluenciadorRequestDTO> influenciador;
    private List<EmpresaRequestDTO> empresas;
    
    public List<EnderecoRequestDTO> getEnderecos() {
        return enderecos;
    }
    public void setEnderecos(List<EnderecoRequestDTO> enderecos) {
        this.enderecos = enderecos;
    }
    public List<LogRequestDTO> getLogs() {
        return logs;
    }
    public void setLogs(List<LogRequestDTO> logs) {
        this.logs = logs;
    }
    public List<InfluenciadorRequestDTO> getInfluenciador() {
        return influenciador;
    }
    public void setInfluenciador(List<InfluenciadorRequestDTO> influenciador) {
        this.influenciador = influenciador;
    }
    public List<EmpresaRequestDTO> getEmpresas() {
        return empresas;
    }
    public void setEmpresas(List<EmpresaRequestDTO> empresas) {
        this.empresas = empresas;
    }
    
}
