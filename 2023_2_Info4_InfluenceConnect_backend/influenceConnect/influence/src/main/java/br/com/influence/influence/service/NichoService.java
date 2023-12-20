package br.com.influence.influence.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;
import br.com.influence.influence.dto.nicho.NichoRequestDTO;
import br.com.influence.influence.dto.nicho.NichoResponseDTO;
import br.com.influence.influence.model.Nicho;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceConflict;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.NichoRepository;

@Service
public class NichoService {

    @Autowired
    private NichoRepository nichoRepository;

    @Autowired
    private LogService logService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public NichoResponseDTO adicionar(NichoRequestDTO nichoRequest) {
        Nicho nichoModel = mapper.map(nichoRequest, Nicho.class);

        tratamentoErroBadRequest(nichoModel);

        if (nichoRepository.findByNome(nichoModel.getNome()).isPresent()) {
            return mapper.map(nichoRepository.findByNome(nichoModel.getNome()).get(), NichoResponseDTO.class);
        }

        nichoModel.setId(0l);
        nichoModel = nichoRepository.save(nichoModel);

        // Fazer Auditoria Create
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                EnumTipoEntidade.NICHO, "",
                logService.mapearObjetoParaString(nichoModel));

        return mapper.map(nichoModel, NichoResponseDTO.class);
    }

    @Transactional
    public NichoResponseDTO adicionarPublic(NichoRequestDTO nichoRequest) {
        Nicho nichoModel = mapper.map(nichoRequest, Nicho.class);

        tratamentoErroBadRequest(nichoModel);

        if (nichoRepository.findByNome(nichoModel.getNome()).isPresent()) {
            return mapper.map(nichoRepository.findByNome(nichoModel.getNome()).get(), NichoResponseDTO.class);
        }

        nichoModel.setId(0l);
        nichoModel = nichoRepository.save(nichoModel);

        return mapper.map(nichoModel, NichoResponseDTO.class);
    }

    // Read
    public List<NichoResponseDTO> obterTodos() {

        List<Nicho> nichosModel = nichoRepository.findAll();

        List<NichoResponseDTO> nichoResponse = new ArrayList<>();

        for (Nicho nicho : nichosModel) {
            nichoResponse.add(mapper.map(nicho, NichoResponseDTO.class));
        }

        return nichoResponse;
    }

    public NichoResponseDTO obterPorId(Long id) {
        
        Optional<Nicho> optionalNicho = nichoRepository.findById(id);

        if (optionalNicho.isEmpty()) {
            throw new ResourceNotFound("Não existe na base um nicho com o ID: " + id);
        }

        return mapper.map(optionalNicho.get(), NichoResponseDTO.class);
    }

    // Update
    @Transactional
    public NichoResponseDTO atualizar(Long id, NichoRequestDTO nichoRequest) {
        obterPorId(id);
        Nicho nichoModel = mapper.map(nichoRequest, Nicho.class);
        nichoModel = tratamentoPut(id, nichoModel);

         // Fazer Auditoria Update
         logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.NICHO, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(nichoModel));

        nichoModel = nichoRepository.save(nichoModel);

        return mapper.map(nichoModel, NichoResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        tratamentoConflictDelete(obterPorId(id));
        nichoRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.NICHO, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(Nicho nichoModel) {

        if (nichoModel.getNome() == null) {
            throw new ResourceBadRequest("Você não inseriu o nome do Nicho, que é um campo que não pode ser nulo");
        }
        if (nichoModel.getDescricao() == null) {
            throw new ResourceBadRequest("Você não inseriu o descrição do Nicho, que é um campo que não pode ser nulo");
        }
        if (nichoModel.getFaixaEtaria() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a faixa etária do Nicho, que é um campo que não pode ser nulo");
        }
        if (nichoModel.getGenero() == null) {
            throw new ResourceBadRequest("Você não inseriu o genero do nicho, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public Nicho tratamentoPut(Long id, Nicho nichoModel) {
        Nicho nichoBase = mapper.map(obterPorId(id), Nicho.class);

        nichoModel.setId(id);
        if (nichoModel.getNome() == null) {
            nichoModel.setNome(nichoBase.getNome());
        }
        if (nichoModel.getDescricao() == null) {
            nichoModel.setDescricao(nichoBase.getDescricao());
        }
        if (nichoModel.getFaixaEtaria() == null) {
            nichoModel.setFaixaEtaria(nichoBase.getFaixaEtaria());
        }
        if (nichoModel.getGenero() == null) {
            nichoModel.setGenero(nichoBase.getGenero());
        }
        if (nichoModel.getInfluenciadores() == null) {
            nichoModel.setInfluenciadores(nichoBase.getInfluenciadores());
        }
        return nichoModel;
    }

    public void tratamentoConflictDelete(NichoResponseDTO nichoResponse){
        List<InfluenciadorResponseDTO> influenciadorResponse =  nichoResponse.getInfluenciadores();

        if(influenciadorResponse.size() > 0){
            throw new ResourceConflict("Você não pode excluir um Nicho que existem influenciadores associados a ele");
        }
    }
}
