package br.com.influence.influence.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.influence.influence.dto.endereco.EnderecoRequestDTO;
import br.com.influence.influence.dto.endereco.EnderecoResponseDTO;
import br.com.influence.influence.model.Endereco;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.EnderecoRepository;

@Service
public class EnderecoService {
    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private LogService logService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public EnderecoResponseDTO adicionar(EnderecoRequestDTO enderecoRequest) {
        Endereco enderecoModel = mapper.map(enderecoRequest, Endereco.class);

        tratamentoErroBadRequest(enderecoModel);

        enderecoModel.setId(0l);
        enderecoModel = enderecoRepository.save(enderecoModel);

        // Fazer Auditoria Create

        return mapper.map(enderecoModel, EnderecoResponseDTO.class);
    }

    // Read
    public List<EnderecoResponseDTO> obterTodos() {

        List<Endereco> enderecosModel = enderecoRepository.findAll();

        List<EnderecoResponseDTO> enderecoResponse = new ArrayList<>();

        for (Endereco endereco : enderecosModel) {
            enderecoResponse.add(mapper.map(endereco, EnderecoResponseDTO.class));
        }

        return enderecoResponse;
    }

    public EnderecoResponseDTO obterPorId(Long id) {
        Optional<Endereco> optionalEndereco = enderecoRepository.findById(id);

        if (optionalEndereco.isEmpty()) {
            throw new ResourceNotFound("Não existe na base um endereco com o ID: " + id);
        }

        return mapper.map(optionalEndereco.get(), EnderecoResponseDTO.class);
    }

    // Update
    @Transactional
    public EnderecoResponseDTO atualizar(Long id, EnderecoRequestDTO enderecoRequest) {
        obterPorId(id);
        Endereco enderecoModel = mapper.map(enderecoRequest, Endereco.class);
        enderecoModel = tratamentoPut(id, enderecoModel);

         // Fazer Auditoria Update
         logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.ENDERECO, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(enderecoModel));

        enderecoModel = enderecoRepository.save(enderecoModel);

        return mapper.map(enderecoModel, EnderecoResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        obterPorId(id);
        enderecoRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.ENDERECO, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(Endereco enderecoModel) {

        if (enderecoModel.getTipoEndereco() == null) {
            throw new ResourceBadRequest("Você não inseriu o tipo do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getCep() == null) {
            throw new ResourceBadRequest("Você não inseriu o CEP do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getTipoLogradouro() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o tipo Logradouro do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getLogradouro() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Logradouro Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getNumero() == null) {
            throw new ResourceBadRequest("Você não inseriu numero do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getComplemento() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o complemento do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getBairro() == null) {
            throw new ResourceBadRequest("Você não inseriu o Bairro do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getCidade() == null) {
            throw new ResourceBadRequest("Você não inseriu a Cidade do Endereço, que é um campo que não pode ser nulo");
        }
        if (enderecoModel.getEstado() == null) {
            throw new ResourceBadRequest("Você não inseriu o Estado do Endereço, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public Endereco tratamentoPut(Long id, Endereco enderecoModel) {
        Endereco enderecoBase = mapper.map(obterPorId(id), Endereco.class);

        enderecoModel.setId(id);
        if (enderecoModel.getTipoEndereco() == null) {
            enderecoModel.setTipoEndereco(enderecoBase.getTipoEndereco());
        }
        if (enderecoModel.getCep() == null) {
            enderecoModel.setCep(enderecoBase.getCep());
        }
        if (enderecoModel.getTipoLogradouro() == null) {
            enderecoModel.setTipoLogradouro(enderecoBase.getTipoLogradouro());
        }
        if (enderecoModel.getLogradouro() == null) {
            enderecoModel.setLogradouro(enderecoBase.getLogradouro());
        }
        if (enderecoModel.getNumero() == null) {
            enderecoModel.setNumero(enderecoBase.getNumero());
        }
        if (enderecoModel.getComplemento() == null) {
            enderecoModel.setComplemento(enderecoBase.getComplemento());
        }
        if (enderecoModel.getBairro() == null) {
            enderecoModel.setBairro(enderecoBase.getBairro());
        }
        if (enderecoModel.getCidade() == null) {
            enderecoModel.setCidade(enderecoBase.getCidade());
        }
        if (enderecoModel.getEstado() == null) {
            enderecoModel.setEstado(enderecoBase.getEstado());
        }
        if (enderecoModel.getPessoa() == null) {
            enderecoModel.setPessoa(enderecoBase.getPessoa());
        }
        
        return enderecoModel;
    }
}
