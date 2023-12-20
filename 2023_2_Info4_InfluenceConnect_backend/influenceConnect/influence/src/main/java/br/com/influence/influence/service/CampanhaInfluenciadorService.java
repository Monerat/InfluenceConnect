package br.com.influence.influence.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorRequestDTO;
import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorResponseDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialResponseDTO;
import br.com.influence.influence.model.CampanhaInfluenciador;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.CampanhaInfluenciadorRepository;

@Service
public class CampanhaInfluenciadorService {

    @Autowired
    private CampanhaInfluenciadorRepository campanhaInfluenciadorRepository;

    @Autowired
    private LogService logService;

    @Autowired
    private InfluenciadorService influenciadorService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public CampanhaInfluenciadorResponseDTO adicionar(CampanhaInfluenciadorRequestDTO campanhaInfluenciadorRequest) {
        CampanhaInfluenciador campanhaInfluenciadorModel = mapper.map(campanhaInfluenciadorRequest,
                CampanhaInfluenciador.class);
        tratamentoErroBadRequest(campanhaInfluenciadorModel);
        verificarRedeSocial(campanhaInfluenciadorModel.getIdRedeSocial(), influenciadorService.obterPorId(
            campanhaInfluenciadorModel.getInfluenciador().getId()));

        campanhaInfluenciadorModel = calcularTotalPublicacao(campanhaInfluenciadorModel);

        campanhaInfluenciadorModel.setId(0l);
        campanhaInfluenciadorModel = campanhaInfluenciadorRepository.save(campanhaInfluenciadorModel);

        // Fazer Auditoria Create
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                EnumTipoEntidade.CAMPANHAINFLUENCIADOR, "",
                logService.mapearObjetoParaString(campanhaInfluenciadorModel));

        return mapper.map(campanhaInfluenciadorModel, CampanhaInfluenciadorResponseDTO.class);
    }

    // Calcular o valorGasto da CampanhaInfluenciador
    public CampanhaInfluenciador calcularTotalPublicacao(CampanhaInfluenciador campanhaInfluenciador) {

        InfluenciadorResponseDTO influenciadorResponse = influenciadorService
                .obterPorId(campanhaInfluenciador.getInfluenciador().getId());
        List<RedeSocialResponseDTO> redesSociaisResponse = influenciadorResponse.getRedesSociais();
        
        campanhaInfluenciador.setValorGasto(0.0);
        for (RedeSocialResponseDTO redeSocialResponse : redesSociaisResponse) {
            if (redeSocialResponse.getId() == campanhaInfluenciador.getIdRedeSocial()) {
                Double subTotal = campanhaInfluenciador.getQuantidade() * redeSocialResponse.getCustoPubli();
                campanhaInfluenciador.setValorGasto(subTotal);
                return campanhaInfluenciador;
            }
        }

        return campanhaInfluenciador;
    }

    // Verificar se o idRedeSocial pertence ao Influenciador
    public RedeSocialResponseDTO verificarRedeSocial(Long idRedeSocial, InfluenciadorResponseDTO influenciadorResponse) {

        for(RedeSocialResponseDTO redeSocialResponse : influenciadorResponse.getRedesSociais()) {
            if(redeSocialResponse.getId().equals(idRedeSocial)) {
                return redeSocialResponse;
            }
        }

        throw new ResourceNotFound("Esse Influenciador não possui uma Rede Social com o ID: " + idRedeSocial); 
    }

    // Read
    public List<CampanhaInfluenciadorResponseDTO> obterTodos() {

        List<CampanhaInfluenciador> campanhasInfluenciadoresModel = campanhaInfluenciadorRepository.findAll();
        List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadoresResponse = new ArrayList<>();

        for (CampanhaInfluenciador campanha : campanhasInfluenciadoresModel) {
            campanhasInfluenciadoresResponse.add(mapper.map(campanha, CampanhaInfluenciadorResponseDTO.class));
        }

        return campanhasInfluenciadoresResponse;
    }

    public CampanhaInfluenciadorResponseDTO obterPorId(Long id) {
        Optional<CampanhaInfluenciador> optionalCampanhaInfluenciador = campanhaInfluenciadorRepository.findById(id);

        if (optionalCampanhaInfluenciador.isEmpty()) {
            throw new ResourceNotFound("Não existe na base uma CampanhaInfluenciador com o id: " + id);
        }
        return mapper.map(optionalCampanhaInfluenciador.get(), CampanhaInfluenciadorResponseDTO.class);
    }

    // Update
    @Transactional
    public CampanhaInfluenciadorResponseDTO atualizar(Long id,
            CampanhaInfluenciadorRequestDTO campanhaInfluenciadorRequest) {
        obterPorId(id);
        CampanhaInfluenciador campanhaInfluenciadorModel = mapper.map(campanhaInfluenciadorRequest, CampanhaInfluenciador.class);
        
        verificarRedeSocial(campanhaInfluenciadorModel.getIdRedeSocial(), influenciadorService.obterPorId(
            campanhaInfluenciadorModel.getInfluenciador().getId()));
        campanhaInfluenciadorModel = tratamentoPut(id, campanhaInfluenciadorModel);
        campanhaInfluenciadorModel = calcularTotalPublicacao(campanhaInfluenciadorModel);

         // Fazer Auditoria Update
         logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.CAMPANHAINFLUENCIADOR, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(campanhaInfluenciadorModel));

        campanhaInfluenciadorModel = campanhaInfluenciadorRepository.save(campanhaInfluenciadorModel);

        return mapper.map(campanhaInfluenciadorModel, CampanhaInfluenciadorResponseDTO.class);
    }

    public void deletar(Long id) {
        obterPorId(id);
        campanhaInfluenciadorRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.CAMPANHAINFLUENCIADOR, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(CampanhaInfluenciador campanhaInfluenciadorModel) {

        if (campanhaInfluenciadorModel.getQuantidade() == null) {
            throw new ResourceBadRequest(  
                    "Você não inseriu a Quantidade de Publicações da Relacao Campanha-Influenciador, que é um campo que não pode ser nulo");
        }
        if (campanhaInfluenciadorModel.getIdRedeSocial() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o ID da Rede Social da Relacao Campanha-Influenciador, que é um campo que não pode ser nulo");
        }
        if (campanhaInfluenciadorModel.getInfluenciador() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o ID do Influenciador da Relacao Campanha-Influenciador, que é um campo que não pode ser nulo");
        }
        if (campanhaInfluenciadorModel.getCampanha() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o ID da Campanha da Relacao Campanha-Influenciador, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public CampanhaInfluenciador tratamentoPut(Long id, CampanhaInfluenciador campanhaInfluenciadorModel) {
        CampanhaInfluenciador campanhaInfluenciadorBase = mapper.map(obterPorId(id), CampanhaInfluenciador.class);

        campanhaInfluenciadorModel.setId(id);
        if (campanhaInfluenciadorModel.getValorGasto() == null) {
            campanhaInfluenciadorModel.setValorGasto(campanhaInfluenciadorBase.getValorGasto());
        }
        if (campanhaInfluenciadorModel.getQuantidade() == null) {
            campanhaInfluenciadorModel.setQuantidade(campanhaInfluenciadorBase.getQuantidade());
        }
        if (campanhaInfluenciadorModel.getIdRedeSocial() == null) {
            campanhaInfluenciadorModel.setIdRedeSocial(campanhaInfluenciadorBase.getIdRedeSocial());
        }
        if (campanhaInfluenciadorModel.getInfluenciador() == null) {
            campanhaInfluenciadorModel.setInfluenciador(campanhaInfluenciadorBase.getInfluenciador());
        }
        if (campanhaInfluenciadorModel.getCampanha() == null) {
            campanhaInfluenciadorModel.setCampanha(campanhaInfluenciadorBase.getCampanha());
        }
        
        return campanhaInfluenciadorModel;
    }
}
