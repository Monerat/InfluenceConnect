package br.com.influence.influence.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import br.com.influence.influence.model.Campanha;
import br.com.influence.influence.model.CampanhaInfluenciador;
import br.com.influence.influence.model.Image;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.InsufficientBudgetException;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceConflict;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.CampanhaRepository;
import br.com.influence.influence.common.ChecarValores;
import br.com.influence.influence.dto.campanha.CampanhaRequestDTO;
import br.com.influence.influence.dto.campanha.CampanhaResponseDTO;
import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorRequestDTO;
import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorResponseDTO;

@Service
public class CampanhaService {

    @Autowired
    private CampanhaRepository campanhaRepository;

    @Autowired
    private LogService logService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CampanhaInfluenciadorService campanhaInfluenciadorService;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public CampanhaResponseDTO adicionar(CampanhaRequestDTO campanhaRequest) {
        Campanha campanhaModel = mapper.map(campanhaRequest, Campanha.class);
        tratamentoErroBadRequest(campanhaModel);
        empresaService.obterPorId(campanhaModel.getEmpresa().getId());

        if (campanhaRequest.getCampanhaInfluenciadores() == null) {
            campanhaModel.setId(0l);
            campanhaModel = campanhaRepository.save(campanhaModel);

            // Fazer Auditoria Create
            logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                    EnumTipoEntidade.CAMPANHA, "",
                    logService.mapearObjetoParaString(campanhaModel));

            return mapper.map(campanhaModel, CampanhaResponseDTO.class);
        }

        campanhaModel.setId(0l);
        campanhaModel = campanhaRepository.save(campanhaModel);
        campanhaModel = adicionarCampanhasInfluenciadores(campanhaRequest.getCampanhaInfluenciadores(), campanhaModel);

        campanhaModel = campanhaRepository.save(campanhaModel);

        // Fazer Auditoria Create
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                EnumTipoEntidade.CAMPANHA, "",
                logService.mapearObjetoParaString(campanhaModel));

        return mapper.map(campanhaModel, CampanhaResponseDTO.class);
    }

    // Salvar a imagem em disco
    public ResponseEntity<String> salvarArquivo(Long id, MultipartFile perfil, MultipartFile feed1, MultipartFile feed2,
            MultipartFile feed3, MultipartFile background, String entidade) {
        CampanhaResponseDTO campanhaResponse = obterPorId(id);
        campanhaResponse.setCampanhaInfluenciadores(null);
        CampanhaRequestDTO campanhaRequest = mapper.map(campanhaResponse, CampanhaRequestDTO.class);

        String fileNamePerfil;
        String fileNameFeed1;
        String fileNameFeed2;
        String fileNameFeed3;
        String fileNameBackground;

        fileNamePerfil = id + "_" + entidade + "_perfil";
        fileNameFeed1 = id + "_" + entidade + "_Feed1";
        fileNameFeed2 = id + "_" + entidade + "_Feed2";
        fileNameFeed3 = id + "_" + entidade + "_Feed3";
        fileNameBackground = id + "_" + entidade + "_Background";

        try {
            if (perfil != null) {
                Image img = imageService.uploadImage(perfil, fileNamePerfil);
                campanhaRequest.setImgPerfil(img.getId());
            }

            if (feed1 != null) {
                Image img = imageService.uploadImage(feed1, fileNameFeed1);
                campanhaRequest.setImgFeed1(img.getId());
            }

            if (feed2 != null) {
                Image img = imageService.uploadImage(feed2, fileNameFeed2);
                campanhaRequest.setImgFeed2(img.getId());
            }

            if (feed3 != null) {
                Image img = imageService.uploadImage(feed3, fileNameFeed3);
                campanhaRequest.setImgFeed3(img.getId());
            }

            if (background != null) {
                Image img = imageService.uploadImage(background, fileNameBackground);
                campanhaRequest.setImgBackground(img.getId());
            }

            atualizar(id, campanhaRequest);

            return new ResponseEntity<>("{ \"mensagem\": \"Arquivos carregados com sucesso!\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "{ \"mensagem\": \"Ocorreu um erro ao carregar os arquivos, arquivos não foram carregados!\", HttpStatus.OK }",
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Adicionar Lista de campanhasInfluenciadores
    public Campanha adicionarCampanhasInfluenciadores(List<CampanhaInfluenciadorRequestDTO> campanhasInfluenciadores,
            Campanha campanhaModel) {
        List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadoresResponse = new ArrayList<>();

        for (CampanhaInfluenciadorRequestDTO campanhaInfluenciadorRequest : campanhasInfluenciadores) {
            CampanhaInfluenciador campanhaInfluenciadorModel = mapper.map(campanhaInfluenciadorRequest,
                    CampanhaInfluenciador.class);
            campanhaInfluenciadorModel.setCampanha(campanhaModel);
            campanhasInfluenciadoresResponse.add(campanhaInfluenciadorService
                    .adicionar(mapper.map(campanhaInfluenciadorModel, CampanhaInfluenciadorRequestDTO.class)));
        }

        CampanhaResponseDTO campanhaResponse = mapper.map(campanhaModel, CampanhaResponseDTO.class);
        campanhaResponse.setCampanhaInfluenciadores(campanhasInfluenciadoresResponse);
        campanhaModel = mapper.map(campanhaResponse, Campanha.class);
        campanhaModel = adicionarValorGasto(campanhaModel);

        return campanhaModel;
    }

    // Adicionar valorGasto
    public Campanha adicionarValorGasto(Campanha campanhaModel) {
        List<CampanhaInfluenciador> campanhasInfluenciadores = campanhaModel.getCampanhaInfluenciadores();
        Double valorGasto = 0.0;
        campanhaModel.setValorGasto(valorGasto);
        for (CampanhaInfluenciador campanhaInfluenciador : campanhasInfluenciadores) {
            valorGasto += campanhaInfluenciador.getValorGasto();
            if (campanhaModel.getOrcamento() < valorGasto) {
                throw new InsufficientBudgetException("Orçamento insuficiente");
            }
        }

        campanhaModel.setValorGasto(valorGasto);

        return campanhaModel;
    }

    // Adicionar novas campanhasInfluenciadores ou atualizar
    // campanhasInfluenciadores
    public Campanha atualizarCampanhasInfluenciadores(Campanha campanhaBase, Campanha campanhaModel) {

        CampanhaResponseDTO campanhaBaseResponse = mapper.map(campanhaBase, CampanhaResponseDTO.class);

        List<CampanhaInfluenciador> campanhasInfluenciadoresBase = campanhaBase.getCampanhaInfluenciadores();
        List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadoresResponse = new ArrayList<>();
        List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadoresResponseBase = campanhaBaseResponse
                .getCampanhaInfluenciadores();
        Boolean encontrou = false;

        for (CampanhaInfluenciador campanhaInfluenciadorModel : campanhaModel.getCampanhaInfluenciadores()) {
            encontrou = false;
            for (CampanhaInfluenciador campanhaInfluenciadorBase : campanhasInfluenciadoresBase) {
                encontrou = false;
                if (campanhaInfluenciadorBase.getInfluenciador().getId() == campanhaInfluenciadorModel
                        .getInfluenciador().getId()
                        && campanhaInfluenciadorBase.getIdRedeSocial() == campanhaInfluenciadorModel
                                .getIdRedeSocial()) {
                    encontrou = true;
                    ChecarValores.verificaValorLong(campanhaInfluenciadorModel.getQuantidade());
                    // verificar no front, pois pode ser que só um
                    // setQuantidade(campanhaInfluenciadorModel.getQuantidade()) seja o suficiente
                    CampanhaInfluenciadorResponseDTO campanhaInfluenciadorResponse;

                    campanhaInfluenciadorBase.setQuantidade(
                            campanhaInfluenciadorBase.getQuantidade() + campanhaInfluenciadorModel.getQuantidade());
                    campanhaInfluenciadorResponse = campanhaInfluenciadorService.atualizar(
                            campanhaInfluenciadorBase.getId(),
                            mapper.map(campanhaInfluenciadorBase, CampanhaInfluenciadorRequestDTO.class));

                    campanhasInfluenciadoresResponse.add(campanhaInfluenciadorResponse);
                    break;
                }
            }
            if (!encontrou) {
                campanhaInfluenciadorModel.setCampanha(campanhaModel);
                CampanhaInfluenciadorResponseDTO campanhaInfluenciadorResponse = campanhaInfluenciadorService
                        .adicionar(mapper.map(campanhaInfluenciadorModel, CampanhaInfluenciadorRequestDTO.class));
                campanhasInfluenciadoresResponse.add(campanhaInfluenciadorResponse);
                campanhasInfluenciadoresResponseBase.add(campanhaInfluenciadorResponse);

            }
        }

        Boolean encontrouNaBase = false;
        List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadoresResponseAndBase = new ArrayList<>();
        for (CampanhaInfluenciadorResponseDTO campanhaInfluenciadorResponseBase : campanhasInfluenciadoresResponseBase) {
            encontrouNaBase = false;
            for (CampanhaInfluenciadorResponseDTO campanhaInfluenciadorResponse : campanhasInfluenciadoresResponse) {
                encontrouNaBase = false;
                if (campanhaInfluenciadorResponseBase.getId() == campanhaInfluenciadorResponse.getId()) {
                    encontrouNaBase = true;
                    campanhasInfluenciadoresResponseAndBase.add(campanhaInfluenciadorResponse);
                    break;
                }
            }
            if (!encontrouNaBase) {
                campanhasInfluenciadoresResponseAndBase.add(campanhaInfluenciadorResponseBase);
            }
        }

        CampanhaResponseDTO campanhaResponse = mapper.map(campanhaModel, CampanhaResponseDTO.class);
        campanhaResponse.setCampanhaInfluenciadores(campanhasInfluenciadoresResponseAndBase);
        campanhaModel = mapper.map(campanhaResponse, Campanha.class);
        campanhaModel = adicionarValorGasto(campanhaModel);

        return campanhaModel;
    }

    // Read
    public List<CampanhaResponseDTO> obterTodos() {

        List<Campanha> campanhasModel = campanhaRepository.findAll();
        List<CampanhaResponseDTO> campanhaResponse = new ArrayList<>();

        for (Campanha campanha : campanhasModel) {
            campanhaResponse.add(mapper.map(campanha, CampanhaResponseDTO.class));
        }

        return campanhaResponse;
    }

    public CampanhaResponseDTO obterPorId(Long id) {

        Optional<Campanha> optionalCampanha = campanhaRepository.findById(id);

        if (optionalCampanha.isEmpty()) {
            throw new ResourceNotFound("Não existe na base uma campanha com o ID: " + id);
        }

        return mapper.map(optionalCampanha.get(), CampanhaResponseDTO.class);
    }

    // Update
    @Transactional
    public CampanhaResponseDTO atualizar(Long id, CampanhaRequestDTO campanhaRequest) {
        obterPorId(id);
        Campanha campanhaModel = mapper.map(campanhaRequest, Campanha.class);

        campanhaModel = tratamentoPut(id, campanhaModel);

        // Fazer Auditoria Update
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.CAMPANHA, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(campanhaModel));


        campanhaModel = campanhaRepository.save(campanhaModel);

        return mapper.map(campanhaModel, CampanhaResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        tratamentoConflictDelete(obterPorId(id));
        campanhaRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.CAMPANHA, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(Campanha campanhaModel) {

        if (campanhaModel.getNome() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Nome da Campanha, que é um campo que não pode ser nulo");
        }
        if (campanhaModel.getAtivo() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Status da Campanha, que é um campo que não pode ser nulo");
        }
        if (campanhaModel.getInicioCampanha() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a data de Inicio da Campanha, que é um campo que não pode ser nulo");
        }
        if (campanhaModel.getEncerramentoCampanha() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a data de Encerramento da Campanha, que é um campo que não pode ser nulo");
        }
        if (campanhaModel.getNicho() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Nicho da Campanha, que é um campo que não pode ser nulo");
        }
        if (campanhaModel.getOrcamento() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Orçamento da Campanha, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public Campanha tratamentoPut(Long id, Campanha campanhaModel) {
        Campanha campanhaBase = mapper.map(obterPorId(id), Campanha.class);
        
        if (campanhaModel.getOrcamento() != null && campanhaModel.getOrcamento() < campanhaBase.getOrcamento()){
            throw new ResourceBadRequest("Você não pode atualizar uma campanha com um Orçamento inferior ao que estava anteriormente.");
        }
        
        campanhaModel.setId(id);
        if (campanhaModel.getNome() == null) {
            campanhaModel.setNome(campanhaBase.getNome());
        }
        if (campanhaModel.getAtivo() == null) {
            campanhaModel.setAtivo(campanhaBase.getAtivo());
        }
        if (campanhaModel.getInicioCampanha() == null) {
            campanhaModel.setInicioCampanha(campanhaBase.getInicioCampanha());
        }
        if (campanhaModel.getEncerramentoCampanha() == null) {
            campanhaModel.setEncerramentoCampanha(campanhaBase.getEncerramentoCampanha());
        }
        if (campanhaModel.getOrcamento() == null) {
            campanhaModel.setOrcamento(campanhaBase.getOrcamento());
        }
        if (campanhaModel.getNicho() == null) {
            campanhaModel.setNicho(campanhaBase.getNicho());
        }
        if (campanhaModel.getImgPerfil() == null) {
            campanhaModel.setImgPerfil(campanhaBase.getImgPerfil());
        }
        if (campanhaModel.getImgFeed1() == null) {
            campanhaModel.setImgFeed1(campanhaBase.getImgFeed1());
        }
        if (campanhaModel.getImgFeed2() == null) {
            campanhaModel.setImgFeed2(campanhaBase.getImgFeed2());
        }
        if (campanhaModel.getImgFeed3() == null) {
            campanhaModel.setImgFeed3(campanhaBase.getImgFeed3());
        }
        if (campanhaModel.getImgBackground() == null) {
            campanhaModel.setImgBackground(campanhaBase.getImgBackground());
        }
        if (campanhaModel.getEmpresa() == null) {
            campanhaModel.setEmpresa(campanhaBase.getEmpresa());
        }
        if (campanhaModel.getCampanhaInfluenciadores() == null) {
            campanhaModel.setCampanhaInfluenciadores(campanhaBase.getCampanhaInfluenciadores());
        } else {
            campanhaModel = atualizarCampanhasInfluenciadores(campanhaBase, campanhaModel);
        }

        return campanhaModel;
    }

    // Tratamento se campanha nunca teve campanhas ela pode ser excluida
    public void tratamentoConflictDelete(CampanhaResponseDTO campanhaResponse) {
        List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadores = campanhaResponse.getCampanhaInfluenciadores();

        if (campanhasInfluenciadores.size() > 0) {
            throw new ResourceConflict("Você não pode excluir uma Campanha que já adicionou algum influenciador a ela");
        }
    }
}
