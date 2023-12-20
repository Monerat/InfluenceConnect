package br.com.influence.influence.dto.pessoa;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.influence.influence.deserializer.EnumTipoUsuarioDeserializer;
import br.com.influence.influence.deserializer.LongDeserializer;
import br.com.influence.influence.model.Enum.EnumTipoUsuario;

public abstract class PessoaBaseDTO {

    @JsonDeserialize(using = LongDeserializer.class)
    private Long id;
    private String nome;
    private String cpf;
    @JsonDeserialize(using = EnumTipoUsuarioDeserializer.class)
    private EnumTipoUsuario role;
    private String email;
    private String senha;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    public EnumTipoUsuario getRole() {
        return role;
    }
    public void setRole(EnumTipoUsuario role) {
        this.role = role;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    
}
