package br.com.influence.influence.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.influence.influence.common.ChecarValores;
import br.com.influence.influence.dto.log.LogResponseDTO;
import br.com.influence.influence.model.Log;
import br.com.influence.influence.model.Pessoa;
import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.ResourceObjectMapper;
import br.com.influence.influence.model.exceptions.ResourceNotFound;
import br.com.influence.influence.repository.LogRepository;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private ModelMapper modelMapper;

    // CRUD

    // Create
    @Transactional
    public LogResponseDTO adicionar(Pessoa pessoa, EnumLog tipoAcao,
            EnumTipoEntidade tipoEntidade, String valorOriginal, String valorAtual) {
        
        Log log = new Log();
        // Setar valores que a gente puxou
        log.setId(0l);
        log.setTipoAcao(tipoAcao);
        log.setTipoEntidade(tipoEntidade);
        log.setValorAtual(valorAtual);
        log.setValorOriginal(valorOriginal);
        log.setPessoa(pessoa);
        // log.setDataAcao(new Date());
        Log savedLog = logRepository.save(log);

        return modelMapper.map(savedLog, LogResponseDTO.class);
    }

    // Read
    public List<LogResponseDTO> obterTodos() {
        List<Log> logs = logRepository.findAll();
        return logs.stream()
                .map(log -> modelMapper.map(log, LogResponseDTO.class))
                .collect(Collectors.toList());
    }

    public LogResponseDTO obterPorId(Long id) {
        ChecarValores.verificaValorLong(id);
        Optional<Log> log = logRepository.findById(id);

        if (log.isEmpty()) {
            throw new ResourceNotFound("Nenhum registro encontrado para o ID: " + id);
        }
        
        return modelMapper.map(log.get(), LogResponseDTO.class);
    }

    // Fazer o Mapper
    public String mapearObjetoParaString(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        String objectString = new String();

        try {
            objectString = objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new ResourceObjectMapper("Erro ao tentar mapear o seguinte Objeto : " + object + " para String");
        }

        return objectString;
    }

    public Pessoa verificarPessoaLogada() {
        return (Pessoa) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}