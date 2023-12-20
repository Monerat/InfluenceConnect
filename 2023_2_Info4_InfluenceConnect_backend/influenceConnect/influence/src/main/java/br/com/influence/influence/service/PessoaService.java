package br.com.influence.influence.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;

import br.com.influence.influence.dto.empresa.EmpresaResponseDTO;
import br.com.influence.influence.dto.endereco.EnderecoRequestDTO;
import br.com.influence.influence.dto.endereco.EnderecoResponseDTO;
import br.com.influence.influence.dto.influenciador.InfluenciadorResponseDTO;
import br.com.influence.influence.dto.log.LogResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaLoginResponseDTO;
import br.com.influence.influence.dto.pessoa.PessoaRequestDTO;
import br.com.influence.influence.dto.pessoa.PessoaResponseDTO;
import br.com.influence.influence.model.Endereco;
import br.com.influence.influence.model.Pessoa;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceBadRequest;
import br.com.influence.influence.model.exceptions.ResourceConflict;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.PessoaRepository;
import br.com.influence.influence.security.JWTService;

@Service
public class PessoaService {

    private static final String BEARER = "Bearer ";

    @Autowired
    private PessoaRepository pessoaRepository;
    
    @Autowired
    private LogService logService;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Create
    @Transactional
    public PessoaResponseDTO adicionar(PessoaRequestDTO pessoaRequest) {
        Pessoa pessoaModel = mapper.map(pessoaRequest, Pessoa.class);

        tratamentoErroBadRequest(pessoaModel);
        String senha = passwordEncoder.encode(pessoaModel.getSenha());
        
        if (pessoaRequest.getEnderecos() == null) {
            pessoaModel.setSenha(senha);
            pessoaModel.setId(0l);
            pessoaModel = pessoaRepository.save(pessoaModel);

            // Fazer Auditoria Create
            logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
            EnumTipoEntidade.PESSOA, "",
            logService.mapearObjetoParaString(pessoaModel));

            return mapper.map(pessoaModel, PessoaResponseDTO.class);
        }

        List<EnderecoRequestDTO> enderecoRequest = pessoaRequest.getEnderecos();

        pessoaModel.setSenha(senha);
        pessoaModel.setId(0l);
        pessoaModel = pessoaRepository.save(pessoaModel);

        List<EnderecoResponseDTO> enderecos = adicionarEnderecos(enderecoRequest, pessoaModel);

        PessoaResponseDTO pessoaResponse = mapper.map(pessoaModel, PessoaResponseDTO.class);
        pessoaResponse.setEnderecos(enderecos);
        pessoaModel = mapper.map(pessoaResponse, Pessoa.class);

        pessoaModel = pessoaRepository.save(pessoaModel);

        // Fazer Auditoria Create
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.CREATE,
        EnumTipoEntidade.PESSOA, "",
        logService.mapearObjetoParaString(pessoaModel));

        return mapper.map(pessoaModel, PessoaResponseDTO.class);
    }

    //Adicionar por Empresa e por Influenciador
    @Transactional
    public PessoaResponseDTO adicionarEntidade(PessoaRequestDTO pessoaRequest) {
        Pessoa pessoaModel = mapper.map(pessoaRequest, Pessoa.class);

        tratamentoErroBadRequest(pessoaModel);
        String senha = passwordEncoder.encode(pessoaModel.getSenha());
        
        if (pessoaRequest.getEnderecos() == null) {
            pessoaModel.setSenha(senha);
            pessoaModel.setId(0l);
            pessoaModel = pessoaRepository.save(pessoaModel);

            return mapper.map(pessoaModel, PessoaResponseDTO.class);
        }

        List<EnderecoRequestDTO> enderecoRequest = pessoaRequest.getEnderecos();

        pessoaModel.setSenha(senha);
        pessoaModel.setId(0l);
        pessoaModel = pessoaRepository.save(pessoaModel);

        List<EnderecoResponseDTO> enderecos = adicionarEnderecos(enderecoRequest, pessoaModel);

        PessoaResponseDTO pessoaResponse = mapper.map(pessoaModel, PessoaResponseDTO.class);
        pessoaResponse.setEnderecos(enderecos);
        pessoaModel = mapper.map(pessoaResponse, Pessoa.class);

        pessoaModel = pessoaRepository.save(pessoaModel);

        return mapper.map(pessoaModel, PessoaResponseDTO.class);
    }

    // Adicionar uma lista de endereços
    private List<EnderecoResponseDTO> adicionarEnderecos(List<EnderecoRequestDTO> enderecosRequest,
            Pessoa pessoaModel) {

        List<EnderecoResponseDTO> adicionadas = new ArrayList<>();

        for (EnderecoRequestDTO enderecoRequest : enderecosRequest) {

            Endereco enderecoModel = mapper.map(enderecoRequest, Endereco.class);
            enderecoModel.setPessoa(pessoaModel);
            EnderecoResponseDTO enderecoResponse = enderecoService.adicionar(mapper.map(enderecoModel, EnderecoRequestDTO.class));
            adicionadas.add(enderecoResponse);
        }

        return adicionadas;
    }

    // Read
    public List<PessoaResponseDTO> obterTodos() {

        List<Pessoa> pessoasModel = pessoaRepository.findAll();

        List<PessoaResponseDTO> pessoaResponse = new ArrayList<>();

        for (Pessoa pessoa : pessoasModel) {
            pessoaResponse.add(mapper.map(pessoa, PessoaResponseDTO.class));
        }

        return pessoaResponse;
    }

    public PessoaResponseDTO obterPorId(Long id) {
        Optional<Pessoa> optionalPessoa = pessoaRepository.findById(id);

        if (optionalPessoa.isEmpty()) {
            throw new ResourceNotFound("Não existe na base uma pessoa com o ID: " + id);
        }

        return mapper.map(optionalPessoa.get(), PessoaResponseDTO.class);
    }

    public PessoaResponseDTO obterPorEmail(String email) {
        Optional<Pessoa> optionalPessoa = pessoaRepository.findByEmail(email);

        if (optionalPessoa.isEmpty()) {
            throw new ResourceNotFound("Não existe na base uma pessoa com o Email: " + email);
        }

        return mapper.map(optionalPessoa.get(), PessoaResponseDTO.class);
    }
    
    // Update
    @Transactional
    public PessoaResponseDTO atualizar(Long id, PessoaRequestDTO pessoaRequest) {
        obterPorId(id);
        Pessoa pessoaModel = mapper.map(pessoaRequest, Pessoa.class);
        
        pessoaModel = tratamentoPut(id, pessoaModel);
        
        String senha = passwordEncoder.encode(pessoaModel.getSenha());
        pessoaModel.setSenha(senha);

         // Fazer Auditoria Update
         logService.adicionar(logService.verificarPessoaLogada(), EnumLog.UPDATE,
                EnumTipoEntidade.PESSOA, 
                logService.mapearObjetoParaString(obterPorId(id)),
                logService.mapearObjetoParaString(pessoaModel));

        pessoaModel = pessoaRepository.save(pessoaModel);

        return mapper.map(pessoaModel, PessoaResponseDTO.class);
    }

    // Delete
    public void deletar(Long id) {
        tratamentoConflictDelete(obterPorId(id));
        pessoaRepository.deleteById(id);

        // Fazer Auditoria Delete
        logService.adicionar(logService.verificarPessoaLogada(), EnumLog.DELETE,
                EnumTipoEntidade.PESSOA, "", "");
    }

    // Logar
    public PessoaLoginResponseDTO logar(String email, String senha) {

        Optional<Pessoa> optPessoa = pessoaRepository.findByEmail(email);

        if (optPessoa.isEmpty()) {
            throw new BadCredentialsException("Usuário ou senha invalidos");
        }

        Authentication autenticacao = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, senha, Collections.emptyList()));

        
        SecurityContextHolder.getContext().setAuthentication(autenticacao);

        String token = BEARER + jwtService.gerarToken(autenticacao);

        PessoaResponseDTO pessoaResponse = obterPorEmail(email);

        return new PessoaLoginResponseDTO(token, pessoaResponse);
    }

    // quem sou eu
    public PessoaResponseDTO obterPessoaLogado() {

        if (!jwtService.isAuthenticated()) {
            throw new ResourceAccessException("Usuário não está authenticado!");
        }
        
        Pessoa pessoaModel = mapper.map(SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal(), Pessoa.class);

        pessoaModel.setLogs(null);
        pessoaModel.setEmpresas(null);
        pessoaModel.setEnderecos(null);
        pessoaModel.setInfluenciadores(null);

        return mapper.map(pessoaModel, PessoaResponseDTO.class);
    }

    // Tratamento de Erros
    // BadRequest
    public void tratamentoErroBadRequest(Pessoa pessoaModel) {

        if (pessoaModel.getNome() == null) {
            throw new ResourceBadRequest("Você não inseriu o nome da Pessoa, que é um campo que não pode ser nulo");
        }
        if (pessoaModel.getCpf() == null) {
            throw new ResourceBadRequest("Você não inseriu o CPF da Pessoa, que é um campo que não pode ser nulo");
        }
        if (pessoaModel.getRole() == null) {
            throw new ResourceBadRequest("Você não inseriu a Role da Pessoa, que é um campo que não pode ser nulo");
        }
        if (pessoaModel.getEmail() == null) {
            throw new ResourceBadRequest("Você não inseriu o Email da Pessoa, que é um campo que não pode ser nulo");
        }
        if (pessoaModel.getSenha() == null) {
            throw new ResourceBadRequest("Você não inseriu a Senha da Pessoa, que é um campo que não pode ser nulo");
        }
        
        if (pessoaRepository.findByCpf(pessoaModel.getCpf()).isPresent()) {
            throw new ResourceBadRequest("O CPF informado já está cadastrado no sistema");
        }

        if (pessoaRepository.findByEmail(pessoaModel.getEmail()).isPresent()) {
            throw new ResourceBadRequest("O email informado já está cadastrado no sistema");
        }
    }

    // Put com campos vazios
    public Pessoa tratamentoPut(Long id, Pessoa pessoaModel) {
        Pessoa pessoaBase = mapper.map(obterPorId(id), Pessoa.class);

        pessoaModel.setId(id);
        if (pessoaModel.getNome() == null) {
            pessoaModel.setNome(pessoaBase.getNome());
        }
        if (pessoaModel.getCpf() == null) {
            pessoaModel.setCpf(pessoaBase.getCpf());
        } else if (pessoaRepository.findByCpf(pessoaModel.getCpf()).isPresent()) {
            throw new ResourceBadRequest("O CPF informado já está cadastrado no sistema");
        }
        if (pessoaModel.getRole() == null) {
            pessoaModel.setRole(pessoaBase.getRole());
        }
        if (pessoaModel.getEmail() == null) {
            pessoaModel.setEmail(pessoaBase.getEmail());
        } else if (pessoaRepository.findByEmail(pessoaModel.getEmail()).isPresent()) {
            throw new ResourceBadRequest("O E-mail informado já está cadastrado no sistema");
        }
        if (pessoaModel.getSenha() == null) {
            pessoaModel.setSenha(pessoaBase.getSenha());
        }
        if (pessoaModel.getLogs() == null) {
            pessoaModel.setLogs(pessoaBase.getLogs());
        } else {
            throw new ResourceBadRequest("Você não pode atualizar logs na requisição de pessoa");
        }
        if (pessoaModel.getEnderecos() == null) {
            pessoaModel.setEnderecos(pessoaBase.getEnderecos());
        } else {
            throw new ResourceBadRequest("Você não pode atualizar enderecos na requisição de pessoa");
        }
        if (pessoaModel.getEmpresas() == null) {
            pessoaModel.setEmpresas(pessoaBase.getEmpresas());
        } 

        return pessoaModel;
    }

    public void tratamentoConflictDelete(PessoaResponseDTO pessoaResponseDTO){
        List<EnderecoResponseDTO> enderecoResponse =  pessoaResponseDTO.getEnderecos();
        List<LogResponseDTO> logResponse = pessoaResponseDTO.getLogs();
        List<EmpresaResponseDTO> empresaResponse = pessoaResponseDTO.getEmpresas();
        List<InfluenciadorResponseDTO> influenciadorResponse = pessoaResponseDTO.getInfluenciadores();


        if(enderecoResponse.size() > 0 || logResponse.size() > 0 || empresaResponse.size() > 0 || influenciadorResponse.size() > 0){
            throw new ResourceConflict("Você não pode excluir uma Pessoa que já cadastrou, Endereço ou Empresa ou Influenciador ou Log");
        }
    }
}
