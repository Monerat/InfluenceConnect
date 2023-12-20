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

import br.com.influence.influence.dto.campanha.CampanhaResponseDTO;
import br.com.influence.influence.dto.campanhaInfluenciador.CampanhaInfluenciadorResponseDTO;
import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorRequestDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;
import br.com.influence.influence.dto.nicho.NichoRequestDTO;
import br.com.influence.influence.dto.nicho.NichoResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialRequestDTO;
import br.com.influence.influence.dto.redeSocial.RedeSocialResponseDTO;
import br.com.influence.influence.model.Image;
import br.com.influence.influence.model.Influenciador;
import br.com.influence.influence.model.Nicho;
import br.com.influence.influence.model.Pessoa;
import br.com.influence.influence.model.RedeSocial;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.Enum.EnumTipoUsuario;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceConflict;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.InfluenciadorRepository;

@Service
public class InfluenciadorService {

    @Autowired
    private InfluenciadorRepository influenciadorRepository;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private NichoService nichoService;

    @Autowired
    private RedeSocialService redeSocialService;

    @Autowired
    private LogService logService;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public InfluenciadorResponseDTO adicionar(InfluenciadorRequestDTO influenciadorRequest) {
        Influenciador influenciadorModel = mapper.map(influenciadorRequest, Influenciador.class);

        tratamentoErroBadRequest(influenciadorModel);

        PessoaRequestDTO pessoaRequest = influenciadorRequest.getPessoa();
        NichoRequestDTO nichoRequest = influenciadorRequest.getNicho();
        List<RedeSocialRequestDTO> redeSocialRequest = influenciadorRequest.getRedesSociais();

        influenciadorModel = adicionarPessoa(pessoaRequest, influenciadorModel);
        influenciadorModel = adicionarNicho(nichoRequest, influenciadorModel);
        influenciadorModel.setId(0l);
        influenciadorModel = influenciadorRepository.save(influenciadorModel);

        influenciadorModel = adicionarRedesSociais(redeSocialRequest, influenciadorModel);
        influenciadorModel = influenciadorRepository.save(influenciadorModel);

        // Fazer Auditoria Create
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                EnumTipoEntidade.INFLUENCIADOR, "",
                logService.mapearObjetoParaString(influenciadorModel));

        return mapper.map(influenciadorModel, InfluenciadorResponseDTO.class);
    }

    @Transactional
    public InfluenciadorResponseDTO adicionarPublic(InfluenciadorRequestDTO influenciadorRequest) {
        Influenciador influenciadorModel = mapper.map(influenciadorRequest, Influenciador.class);

        tratamentoErroBadRequest(influenciadorModel);

        PessoaRequestDTO pessoaRequest = influenciadorRequest.getPessoa();
        NichoRequestDTO nichoRequest = influenciadorRequest.getNicho();
        List<RedeSocialRequestDTO> redeSocialRequest = influenciadorRequest.getRedesSociais();

        influenciadorModel = adicionarPessoa(pessoaRequest, influenciadorModel);
        influenciadorModel = adicionarNichoPublic(nichoRequest, influenciadorModel);
        influenciadorModel.setId(0l);
        influenciadorModel = influenciadorRepository.save(influenciadorModel);

        influenciadorModel = adicionarRedesSociaisPublic(redeSocialRequest, influenciadorModel);
        influenciadorModel = influenciadorRepository.save(influenciadorModel);

        return mapper.map(influenciadorModel, InfluenciadorResponseDTO.class);
    }
    // Adicionar um Nicho
    private Influenciador adicionarNicho(NichoRequestDTO nichoRequest, Influenciador influenciadorModel) {
        Nicho nichoModel = mapper.map(nichoRequest, Nicho.class);

        NichoResponseDTO nichoResponse = nichoService.adicionar(mapper.map(nichoModel, NichoRequestDTO.class));
        nichoModel = mapper.map(nichoResponse, Nicho.class);
        influenciadorModel.setNicho(nichoModel);

        return influenciadorModel;
    }

    // Adicionar um Nicho Public
    private Influenciador adicionarNichoPublic(NichoRequestDTO nichoRequest, Influenciador influenciadorModel) {
        Nicho nichoModel = mapper.map(nichoRequest, Nicho.class);

        NichoResponseDTO nichoResponse = nichoService.adicionarPublic(mapper.map(nichoModel, NichoRequestDTO.class));
        nichoModel = mapper.map(nichoResponse, Nicho.class);
        influenciadorModel.setNicho(nichoModel);

        return influenciadorModel;
    }

    // Adicionar uma Pessoa
    private Influenciador adicionarPessoa(PessoaRequestDTO pessoaRequest, Influenciador influenciadorModel) {
        Pessoa pessoaModel = mapper.map(pessoaRequest, Pessoa.class);

        pessoaModel.setRole(EnumTipoUsuario.INFLUENCIADOR);
        PessoaResponseDTO pessoaResponse = pessoaService
                .adicionarEntidade(mapper.map(pessoaModel, PessoaRequestDTO.class));
        pessoaModel = mapper.map(pessoaResponse, Pessoa.class);
        influenciadorModel.setPessoa(pessoaModel);

        return influenciadorModel;
    }

    // Adicionar uma lista de rede social
    private Influenciador adicionarRedesSociais(List<RedeSocialRequestDTO> redesSociaisRequest,
            Influenciador influenciadorModel) {

        List<RedeSocialResponseDTO> adicionadas = new ArrayList<>();

        for (RedeSocialRequestDTO redeSocialRequest : redesSociaisRequest) {
            RedeSocial redeSocialModel = mapper.map(redeSocialRequest, RedeSocial.class);
            redeSocialModel.setInfluenciador(influenciadorModel);
            adicionadas.add(redeSocialService.adicionar(mapper.map(redeSocialModel, RedeSocialRequestDTO.class)));
        }
        
        InfluenciadorResponseDTO influenciadorResponse = mapper.map(influenciadorModel, InfluenciadorResponseDTO.class);
        influenciadorResponse.setRedesSociais(adicionadas);

        return mapper.map(influenciadorResponse, Influenciador.class);
    }

    // Adicionar uma lista de rede social public
    private Influenciador adicionarRedesSociaisPublic(List<RedeSocialRequestDTO> redesSociaisRequest,
            Influenciador influenciadorModel) {

        List<RedeSocialResponseDTO> adicionadas = new ArrayList<>();

        for (RedeSocialRequestDTO redeSocialRequest : redesSociaisRequest) {
            RedeSocial redeSocialModel = mapper.map(redeSocialRequest, RedeSocial.class);
            redeSocialModel.setInfluenciador(influenciadorModel);
            adicionadas.add(redeSocialService.adicionarPublic(mapper.map(redeSocialModel, RedeSocialRequestDTO.class)));
        }
        
        InfluenciadorResponseDTO influenciadorResponse = mapper.map(influenciadorModel, InfluenciadorResponseDTO.class);
        influenciadorResponse.setRedesSociais(adicionadas);

        return mapper.map(influenciadorResponse, Influenciador.class);
    }

    // Salvar a imagem em disco
    public ResponseEntity<String> salvarArquivo(Long id, MultipartFile perfil, MultipartFile feed1, MultipartFile feed2,
            MultipartFile feed3, MultipartFile background, String entidade) {

        InfluenciadorResponseDTO influenciadorResponse = obterPorId(id);
        InfluenciadorRequestDTO influenciadorRequest = mapper.map(influenciadorResponse, InfluenciadorRequestDTO.class);

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
                influenciadorRequest.setImgPerfil(img.getId());
            }

            if (feed1 != null) {
                Image img = imageService.uploadImage(feed1, fileNameFeed1);
                influenciadorRequest.setImgFeed1(img.getId());
            }

            if (feed2 != null) {
                Image img = imageService.uploadImage(feed2, fileNameFeed2);
                influenciadorRequest.setImgFeed2(img.getId());
            }

            if (feed3 != null) {
                Image img = imageService.uploadImage(feed3, fileNameFeed3);
                influenciadorRequest.setImgFeed3(img.getId());
            }

            if (background != null) {
                Image img = imageService.uploadImage(background, fileNameBackground);
                influenciadorRequest.setImgBackground(img.getId());
            }

            atualizar(id, influenciadorRequest);

            return new ResponseEntity<>("{ \"mensagem\": \"Arquivos carregados com sucesso!\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "{ \"mensagem\": \"Ocorreu um erro ao carregar os arquivos, arquivos não foram carregados!\"}",
                    HttpStatus.BAD_REQUEST);
        }

    }

    // Read
    public List<InfluenciadorResponseDTO> obterTodos() {

        List<Influenciador> influenciadorsModel = influenciadorRepository.findAll();
        List<InfluenciadorResponseDTO> influenciadorResponse = new ArrayList<>();

        for (Influenciador influenciador : influenciadorsModel) {
            influenciadorResponse.add(mapper.map(influenciador, InfluenciadorResponseDTO.class));
        }

        return influenciadorResponse;
    }

    public List<InfluenciadorResponseDTO> obterTodosAtivos() {

        List<Influenciador> influenciadorsModel = influenciadorRepository.findAll();
        List<InfluenciadorResponseDTO> influenciadorResponse = new ArrayList<>();

        for (Influenciador influenciador : influenciadorsModel) {
            if(influenciador.getAtivo()){
                 influenciadorResponse.add(mapper.map(influenciador, InfluenciadorResponseDTO.class));
            }
        }

        return influenciadorResponse;
    }

    public PessoaResponseDTO obterPessoa(Long id) {

        List<PessoaResponseDTO> pessoasResponse = pessoaService.obterTodos();

        for(PessoaResponseDTO pessoaResponse : pessoasResponse) {
            if(!pessoaResponse.getInfluenciadores().isEmpty()) {
                for(InfluenciadorResponseDTO InfluenciadorResponse : pessoaResponse.getInfluenciadores()) {
                    if(InfluenciadorResponse.getId() == id) {
                        return pessoaResponse;
                    }
                }
            }
        }

        throw new ResourceNotFound("Não existe na base uma pessoa cadastrada referente ao influenciador com ID: " + id);
    }

    public InfluenciadorResponseDTO obterPorId(Long id) {

        Optional<Influenciador> optionalInfluenciador = influenciadorRepository.findById(id);

        if (optionalInfluenciador.isEmpty()) {
            throw new ResourceNotFound("Não existe na base um influenciador com o ID: " + id);
        }

        return mapper.map(optionalInfluenciador.get(), InfluenciadorResponseDTO.class);
    }

    public InfluenciadorResponseDTO obterPorIdAtivo(Long id) {

        Optional<Influenciador> optionalInfluenciador = influenciadorRepository.findById(id);

        if (optionalInfluenciador.isEmpty()) {
            throw new ResourceNotFound("Não existe na base um influenciador com o ID: " + id);
        }
        if (optionalInfluenciador.get().getAtivo()) {
            return mapper.map(optionalInfluenciador.get(), InfluenciadorResponseDTO.class);
        } else {
            throw new ResourceBadRequest("O Influenciador com id " + id + " está inativo");
        }
        
    }

    public List<EmpresaResponseDTO> obterEmpresas() {

        PessoaResponseDTO pessoaResponse = pessoaService.obterPorId(pessoaService.obterPessoaLogado().getId());
        InfluenciadorResponseDTO influenciadorResponse = pessoaService.obterPorId(pessoaResponse.getId())
                .getInfluenciadores().get(0);
        List<EmpresaResponseDTO> empresasResponse = empresaService.obterTodos();
        List<EmpresaResponseDTO> empresasInfluenciador = new ArrayList<>();
        Boolean encontrou = false;

        for (EmpresaResponseDTO empresaResponse : empresasResponse) {
            encontrou = false;
            if (empresaResponse.getCampanhas() != null) {
                for (CampanhaResponseDTO campanhaResponse : empresaResponse.getCampanhas()) {
                    if (campanhaResponse.getCampanhaInfluenciadores() != null) {
                        for (CampanhaInfluenciadorResponseDTO campanhaInfluenciadorResponse : campanhaResponse
                                .getCampanhaInfluenciadores()) {
                            if (campanhaInfluenciadorResponse.getInfluenciador().getId() == influenciadorResponse
                                    .getId()) {
                                encontrou = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (encontrou) {
                empresasInfluenciador.add(obterCampanhas(influenciadorResponse.getId(), empresaResponse));
            }
        }
        if(empresasInfluenciador.size()==0){
            throw new   ResourceNotFound("Você não foi contratado para nenhuma empresa ainda.");
        }
        return empresasInfluenciador;
    }

    private EmpresaResponseDTO obterCampanhas(Long id, EmpresaResponseDTO empresaResponse) {

        List<CampanhaResponseDTO> campanhasEncontradas = new ArrayList<>();
        Boolean encontrou = false;

        for (CampanhaResponseDTO campanhaResponse : empresaResponse.getCampanhas()) {
            List<CampanhaInfluenciadorResponseDTO> campanhasInfluenciadoresEncontrados = new ArrayList<>();
            encontrou = false;
            for (CampanhaInfluenciadorResponseDTO campanhaInfluenciadorResponse : campanhaResponse
                    .getCampanhaInfluenciadores()) {
                if (campanhaInfluenciadorResponse.getInfluenciador().getId() == id) {
                    campanhasInfluenciadoresEncontrados.add(campanhaInfluenciadorResponse);
                    encontrou = true;
                }
            } 
            if(encontrou) {
                campanhaResponse.setCampanhaInfluenciadores(campanhasInfluenciadoresEncontrados);
                campanhasEncontradas.add(campanhaResponse);
            }
        }

        empresaResponse.setCampanhas(campanhasEncontradas);

        return empresaResponse;
    }

    // Update
    @Transactional
    public InfluenciadorResponseDTO atualizar(Long id, InfluenciadorRequestDTO influenciadorRequest) {
        obterPorId(id);
        Influenciador influenciadorModel = mapper.map(influenciadorRequest, Influenciador.class);

        influenciadorModel = tratamentoPut(id, influenciadorModel);

        // Fazer Auditoria Update
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.INFLUENCIADOR, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(influenciadorModel));


        influenciadorModel = influenciadorRepository.save(influenciadorModel);

        return mapper.map(influenciadorModel, InfluenciadorResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        tratamentoConflictDelete(obterPorId(id));
        influenciadorRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.INFLUENCIADOR, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(Influenciador influenciadorModel) {
        if (influenciadorModel.getAtivo() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu Se o Influenciador está ativo ou não, que é um campo que não pode ser nulo");
        }
        if (influenciadorModel.getNomeFantasia() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Nome Fantasia da Influenciador, que é um campo que não pode ser nulo");
        }
        if (influenciadorModel.getPessoa() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu a Pessoa do Influenciador, que é um campo que não pode ser nulo");
        }
        if (influenciadorModel.getNicho() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Nicho do Influenciador, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public Influenciador tratamentoPut(Long id, Influenciador influenciadorModel) {
        Influenciador influenciadorBase = mapper.map(obterPorId(id), Influenciador.class);

        influenciadorModel.setId(id);
        if (influenciadorModel.getAtivo() == null) {
            influenciadorModel.setAtivo(influenciadorBase.getAtivo());
        }
        if (influenciadorModel.getNomeFantasia() == null) {
            influenciadorModel.setNomeFantasia(influenciadorBase.getNomeFantasia());
        }
        if (influenciadorModel.getImgPerfil() == null) {
            influenciadorModel.setImgPerfil(influenciadorBase.getImgPerfil());
        }
        if (influenciadorModel.getImgFeed1() == null) {
            influenciadorModel.setImgFeed1(influenciadorBase.getImgFeed1());
        }
        if (influenciadorModel.getImgFeed2() == null) {
            influenciadorModel.setImgFeed2(influenciadorBase.getImgFeed2());
        }
        if (influenciadorModel.getImgFeed3() == null) {
            influenciadorModel.setImgFeed3(influenciadorBase.getImgFeed3());
        }
        if (influenciadorModel.getImgBackground() == null) {
            influenciadorModel.setImgBackground(influenciadorBase.getImgBackground());
        }
        if (influenciadorModel.getPessoa() == null) {
            influenciadorModel.setPessoa(influenciadorBase.getPessoa());
        }
        if (influenciadorModel.getNicho() == null) {
            influenciadorModel.setNicho(influenciadorBase.getNicho());
        } 
        if (influenciadorModel.getCampanhasInfluenciadores() == null) {
            influenciadorModel.setCampanhasInfluenciadores(influenciadorBase.getCampanhasInfluenciadores());
        } 
        if (influenciadorModel.getRedesSociais() == null) {
            influenciadorModel.setRedesSociais(influenciadorBase.getRedesSociais());
        }

        return influenciadorModel;
    }

    public void tratamentoConflictDelete(InfluenciadorResponseDTO influenciadorResponse) {
        List<RedeSocialResponseDTO> redesSociais = influenciadorResponse.getRedesSociais();
        List<CampanhaInfluenciadorResponseDTO> campanhaInfluenciadorResponse = influenciadorResponse
                .getCampanhasInfluenciadores();

        if (redesSociais.size() > 0 || campanhaInfluenciadorResponse.size() > 0) {
            throw new ResourceConflict("Você não pode excluir um Influenciador que já cadastrou Redes Sociais");
        }
    }
}
