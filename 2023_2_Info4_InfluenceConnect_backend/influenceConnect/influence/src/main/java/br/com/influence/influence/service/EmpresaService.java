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
import br.com.influence.influence.dto.empresa.EmpresaRequestDTO;
import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.model.Empresa;
import br.com.influence.influence.model.Image;
import br.com.influence.influence.model.Pessoa;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceConflict;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.EmpresaRepository;

@Service
public class EmpresaService {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private LogService logService;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ModelMapper mapper;

    // Create
    @Transactional
    public EmpresaResponseDTO adicionar(EmpresaRequestDTO empresaRequest) {
        Empresa empresaModel = mapper.map(empresaRequest, Empresa.class);
        tratamentoConflictCnpj(empresaModel);
        tratamentoErroBadRequest(empresaModel);

        if (empresaModel.getPessoa() == null) {
            empresaModel.setId(0l);
            empresaModel = empresaRepository.save(empresaModel);

            // Fazer Auditoria Create
            logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                    EnumTipoEntidade.EMPRESA, "",
                    logService.mapearObjetoParaString(empresaModel));

            return mapper.map(empresaModel, EmpresaResponseDTO.class);
        }

        if (empresaModel.getPessoa().getId() != null
                && empresaModel.getPessoa().getNome() == null
                && empresaModel.getPessoa().getCpf() == null
                && empresaModel.getPessoa().getEmail() == null
                && empresaModel.getPessoa().getSenha() == null
                && empresaModel.getPessoa().getEnderecos() == null) {

            pessoaService.obterPorId(empresaModel.getPessoa().getId());
            empresaModel.setId(0l);
            empresaModel = empresaRepository.save(empresaModel);

            // Fazer Auditoria Create
            logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                    EnumTipoEntidade.EMPRESA, "",
                    logService.mapearObjetoParaString(empresaModel));

            return mapper.map(empresaModel, EmpresaResponseDTO.class);
        }

        empresaModel = adicionarPessoa(empresaRequest.getPessoa(), empresaModel);
        empresaModel.setId(0l);
        empresaModel = empresaRepository.save(empresaModel);

         // Fazer Auditoria Create
            logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
                    EnumTipoEntidade.EMPRESA, "",
                    logService.mapearObjetoParaString(empresaModel));

        return mapper.map(empresaModel, EmpresaResponseDTO.class);
    }

    // Adicionar uma Pessoa
    private Empresa adicionarPessoa(PessoaRequestDTO pessoaRequest, Empresa empresaModel) {
        Pessoa pessoaModel = mapper.map(pessoaRequest, Pessoa.class);

        PessoaResponseDTO pessoaResponse = pessoaService
                .adicionarEntidade(mapper.map(pessoaModel, PessoaRequestDTO.class));
        pessoaModel = mapper.map(pessoaResponse, Pessoa.class);
        empresaModel.setPessoa(pessoaModel);

        return empresaModel;
    }

    // Salvar a imagem em disco
    @Transactional
    public ResponseEntity<String> salvarArquivo(Long id, MultipartFile perfil, MultipartFile feed1, MultipartFile feed2,
            MultipartFile feed3, MultipartFile background, String entidade) {

        EmpresaResponseDTO empresaResponse = obterPorId(id);
        EmpresaRequestDTO empresaRequest = mapper.map(empresaResponse, EmpresaRequestDTO.class);

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
                empresaRequest.setImgPerfil(img.getId());
            }

            if (feed1 != null) {
                Image img = imageService.uploadImage(feed1, fileNameFeed1);
                empresaRequest.setImgFeed1(img.getId());
            }

            if (feed2 != null) {
                Image img = imageService.uploadImage(feed2, fileNameFeed2);
                empresaRequest.setImgFeed2(img.getId());
            }

            if (feed3 != null) {
                Image img = imageService.uploadImage(feed3, fileNameFeed3);
                empresaRequest.setImgFeed3(img.getId());
            }

            if (background != null) {
                Image img = imageService.uploadImage(background, fileNameBackground);
                empresaRequest.setImgBackground(img.getId());
            }

            atualizar(id, empresaRequest);

            return new ResponseEntity<>("{ \"mensagem\": \"Arquivos carregados com sucesso!\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "{ \"mensagem\": \"Ocorreu um erro ao carregar os arquivos, arquivos não foram carregados!\"}",
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Read
    public List<EmpresaResponseDTO> obterTodos() {

        List<Empresa> enderecosModel = empresaRepository.findAll();

        List<EmpresaResponseDTO> empresaResponse = new ArrayList<>();

        for (Empresa empresa : enderecosModel) {
            empresaResponse.add(mapper.map(empresa, EmpresaResponseDTO.class));
        }

        return empresaResponse;
    }

    public EmpresaResponseDTO obterPorId(Long id) {
        Optional<Empresa> optionalEmpresa = empresaRepository.findById(id);

        if (optionalEmpresa.isEmpty()) {
            throw new ResourceNotFound("Não existe na base uma empresa com o ID: " + id);
        }

        return mapper.map(optionalEmpresa.get(), EmpresaResponseDTO.class);
    }

    public EmpresaResponseDTO obterCampanhas() {
        PessoaResponseDTO pessoaResponse = pessoaService.obterPorId(pessoaService.obterPessoaLogado().getId());
        EmpresaResponseDTO empresaResponse = obterPorId(pessoaResponse.getEmpresas().get(0).getId());
        
        return (empresaResponse);
    }

    public PessoaResponseDTO obterPessoa(Long id) {

        List<PessoaResponseDTO> pessoasResponse = pessoaService.obterTodos();

        for(PessoaResponseDTO pessoaResponse : pessoasResponse) {
            if(!pessoaResponse.getEmpresas().isEmpty()) {
                for(EmpresaResponseDTO empresaResponse : pessoaResponse.getEmpresas()) {
                    if(empresaResponse.getId() == id) {
                        return pessoaResponse;
                    }
                }
            }
        }

        throw new ResourceNotFound("Não existe na base uma empresa com ID: " + id);
    }

    // Update
    @Transactional
    public EmpresaResponseDTO atualizar(Long id, EmpresaRequestDTO empresaRequest) {
        obterPorId(id);
        Empresa empresaModel = mapper.map(empresaRequest, Empresa.class);
        tratamentoConflictCnpj(empresaModel);
        empresaModel = tratamentoPut(id, empresaModel);

        // Fazer Auditoria Update
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.EMPRESA, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(empresaModel));

        empresaModel = empresaRepository.save(empresaModel);

        return mapper.map(empresaModel, EmpresaResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        tratamentoConflictDelete(obterPorId(id));
        empresaRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.EMPRESA, "", "");
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(Empresa empresaModel) {

        if (empresaModel.getNome() == null) {
            throw new ResourceBadRequest("Você não inseriu o Nome da Empresa, que é um campo que não pode ser nulo");
        }
        if (empresaModel.getAtivo() == null) {
            throw new ResourceBadRequest("Você não inseriu o Status da Empresa, que é um campo que não pode ser nulo");
        }
        if (empresaModel.getCnpj() == null) {
            throw new ResourceBadRequest("Você não inseriu o CNPJ da Empresa, que é um campo que não pode ser nulo");
        }
        if (empresaModel.getSegmento() == null) {
            throw new ResourceBadRequest(
                    "Você não inseriu o Segmento da Empresa, que é um campo que não pode ser nulo");
        }
    }

    // Put com campos vazios
    public Empresa tratamentoPut(Long id, Empresa empresaModel) {
        Empresa empresaBase = mapper.map(obterPorId(id), Empresa.class);

        empresaModel.setId(id);
        if (empresaModel.getNome() == null) {
            empresaModel.setNome(empresaBase.getNome());
        }
        if (empresaModel.getAtivo() == null) {
            empresaModel.setAtivo(empresaBase.getAtivo());
        }
        if (empresaModel.getCnpj() == null) {
            empresaModel.setCnpj(empresaBase.getCnpj());
        }
        if (empresaModel.getSegmento() == null) {
            empresaModel.setSegmento(empresaBase.getSegmento());
        }
        if (empresaModel.getImgPerfil() == null) {
            empresaModel.setImgPerfil(empresaBase.getImgPerfil());
        }
        if (empresaModel.getImgFeed1() == null) {
            empresaModel.setImgFeed1(empresaBase.getImgFeed1());
        }
        if (empresaModel.getImgFeed2() == null) {
            empresaModel.setImgFeed2(empresaBase.getImgFeed2());
        }
        if (empresaModel.getImgFeed3() == null) {
            empresaModel.setImgFeed3(empresaBase.getImgFeed3());
        }
        if (empresaModel.getImgBackground() == null) {
            empresaModel.setImgBackground(empresaBase.getImgBackground());
        }
        if (empresaModel.getPessoa() == null) {
            empresaModel.setPessoa(empresaBase.getPessoa());
        }
        if (empresaModel.getCampanhas() == null) {
            empresaModel.setCampanhas(empresaBase.getCampanhas());
        }

        return empresaModel;
    }

    // Tratamento CNPJ igual a algum já cadastrado
    public void tratamentoConflictCnpj(Empresa empresaModel) {
        Optional<Empresa> optionalEmpresa = empresaRepository.findByCnpj(empresaModel.getCnpj());

        if (optionalEmpresa.isPresent()) {
            throw new ResourceConflict("Você inseriu um CNPJ que já existe na base");
        }
    }

    // Tratamento se Empresa nunca teve campanhas ela pode ser excluida
    public void tratamentoConflictDelete(EmpresaResponseDTO empresaResponse) {
        List<CampanhaResponseDTO> campanhas = empresaResponse.getCampanhas();

        if (campanhas.size() > 0) {
            throw new ResourceConflict("Você não pode excluir uma Empresa que já criou alguma campanha");
        }
    }
}
