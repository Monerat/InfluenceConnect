package br.com.influence.influence.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.influence.influence.dto.redeSocial.RedeSocialRequestDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialResponseDTO;
import br.com.influence.influence.model.RedeSocial;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.RedeSocialRepository;

@Service
public class RedeSocialService {

    @Autowired
    private RedeSocialRepository redeSocialRepository;

    @Autowired
    private LogService logService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public RedeSocialResponseDTO adicionar(RedeSocialRequestDTO redeSocialRequest) {
        RedeSocial redeSocialModel = mapper.map(redeSocialRequest, RedeSocial.class);

        tratamentoErroBadRequest(redeSocialModel);

        redeSocialModel.setId(0l);
        redeSocialModel = redeSocialRepository.save(redeSocialModel);

        // Fazer Auditoria Create
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                EnumTipoEntidade.REDESOCIAL, "",
                logService.mapearObjetoParaString(redeSocialModel));

        return mapper.map(redeSocialModel, RedeSocialResponseDTO.class);
    }

    @Transactional
    public RedeSocialResponseDTO adicionarPublic(RedeSocialRequestDTO redeSocialRequest) {
        RedeSocial redeSocialModel = mapper.map(redeSocialRequest, RedeSocial.class);

        tratamentoErroBadRequest(redeSocialModel);

        redeSocialModel.setId(0l);
        redeSocialModel = redeSocialRepository.save(redeSocialModel);

        return mapper.map(redeSocialModel, RedeSocialResponseDTO.class);
    }

    // Read
    public List<RedeSocialResponseDTO> obterTodos() {

        List<RedeSocial> redeSocialsModel = redeSocialRepository.findAll();
        List<RedeSocialResponseDTO> redeSocialResponse = new ArrayList<>();

        for (RedeSocial redeSocial : redeSocialsModel) {
            redeSocialResponse.add(mapper.map(redeSocial, RedeSocialResponseDTO.class));
        }

        return redeSocialResponse;
    }

    public RedeSocialResponseDTO obterPorId(Long id) {
        Optional<RedeSocial> optionalRedeSocial = redeSocialRepository.findById(id);

        if (optionalRedeSocial.isEmpty()) {
            throw new ResourceNotFound("Não existe na base um redeSocial com o ID: " + id);
        }

        return mapper.map(optionalRedeSocial.get(), RedeSocialResponseDTO.class);
    }

    // Update
    @Transactional
    public RedeSocialResponseDTO atualizar(Long id, RedeSocialRequestDTO redeSocialRequest) {
        obterPorId(id);
        RedeSocial redeSocialModel = mapper.map(redeSocialRequest, RedeSocial.class);

        redeSocialModel = tratamentoPut(id, redeSocialModel);

        // Fazer Auditoria Update
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.REDESOCIAL, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(redeSocialModel));

        redeSocialModel = redeSocialRepository.save(redeSocialModel);

        return mapper.map(redeSocialModel, RedeSocialResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        obterPorId(id);
        redeSocialRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.REDESOCIAL, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(RedeSocial redeSocialModel) {
        
        if (redeSocialModel.getNomeRede() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o nome da Rede Social, que é um campo que não pode ser nulo");
        }
        if (redeSocialModel.getArroba() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Arroba do influencer na Rede Social, que é um campo que não pode ser nulo");
        }
        if (redeSocialModel.getLink() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Link da Rede Social, que é um campo que não pode ser nulo");
        }
        if (redeSocialModel.getCustoPubli() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Custo da Publicação na Rede Social, que é um campo que não pode ser nulo");
        }
        if (redeSocialModel.getQuantidadeSeguidores() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a quantidade de seguidores do influenciador na Rede Social, que é um campo que não pode ser nulo");
        }
        if (redeSocialModel.getTaxaEngajamento() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a taxa de engajamento do influenciador na Rede Social, que é um campo que não pode ser nulo");
        }
        if (redeSocialModel.getRegiaoAtuacao() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a Regiao de atuação do influenciador na Rede Social, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public RedeSocial tratamentoPut(Long id, RedeSocial redeSocialModel) {
        RedeSocial redeSocialBase = mapper.map(obterPorId(id), RedeSocial.class);

        redeSocialModel.setId(id);
        if (redeSocialModel.getNomeRede() == null) {
            redeSocialModel.setNomeRede(redeSocialBase.getNomeRede());
        }
        if (redeSocialModel.getArroba() == null) {
            redeSocialModel.setArroba(redeSocialBase.getArroba());
        }
        if (redeSocialModel.getLink() == null) {
            redeSocialModel.setLink(redeSocialBase.getLink());
        }
        if (redeSocialModel.getCustoPubli() == null) {
            redeSocialModel.setCustoPubli(redeSocialBase.getCustoPubli());
        }
        if (redeSocialModel.getQuantidadeSeguidores() == null) {
            redeSocialModel.setQuantidadeSeguidores(redeSocialBase.getQuantidadeSeguidores());
        }
        if (redeSocialModel.getTaxaEngajamento() == null) {
            redeSocialModel.setTaxaEngajamento(redeSocialBase.getTaxaEngajamento());
        }
        if (redeSocialModel.getRegiaoAtuacao() == null) {
            redeSocialModel.setRegiaoAtuacao(redeSocialBase.getRegiaoAtuacao());
        }
        if (redeSocialModel.getInfluenciador() == null) {
            redeSocialModel.setInfluenciador(redeSocialBase.getInfluenciador());
        }

        return redeSocialModel;
    }
}
