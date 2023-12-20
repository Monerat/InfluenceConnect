package br.com.influence.influence.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.influence.influence.model.Enum.EnumTipoUsuario;

@Entity
@Table(name = "pessoa")
public class Pessoa implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPessoa")
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private EnumTipoUsuario role;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @OneToMany(mappedBy = "pessoa")
    private List<Log> logs;

    @OneToMany(mappedBy = "pessoa")
    private List<Endereco> enderecos;
    
    @OneToMany(mappedBy = "pessoa")
    private List<Influenciador> influenciadores;

    @OneToMany(mappedBy = "pessoa")
    private List<Empresa> empresas;
    
    public Pessoa() {
    }

    public Pessoa(Long id) {
        this.id = id;
    }

    public Pessoa(Long id, String nome, String cpf, EnumTipoUsuario role, String email, String senha, Log log,
            Endereco endereco, Influenciador influenciador, Empresa empresa) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.role = role;
        this.email = email;
        this.senha = senha;
        this.logs = new ArrayList<>();
        this.logs.add(log);
        this.enderecos = new ArrayList<>();
        this.enderecos.add(endereco);
        this.influenciadores = new ArrayList<>();
        this.influenciadores.add(influenciador);
        this.empresas = new ArrayList<>();
        this.empresas.add(empresa);
    }

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

    public List<Log> getLogs() {
        return logs;
    }

    public void setLogs(List<Log> logs) {
        this.logs = logs;
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public List<Influenciador> getInfluenciadores() {
        return influenciadores;
    }

    public void setInfluenciadores(List<Influenciador> influenciadores) {
        this.influenciadores = influenciadores;
    }

    public List<Empresa> getEmpresas() {
        return empresas;
    }

    public void setEmpresas(List<Empresa> empresas) {
        this.empresas = empresas;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = new ArrayList<>();
        roles.add(role.toString());

        // Converter a lista de role em uma lista de Authorities
        return roles.stream()
                .map(perf -> new SimpleGrantedAuthority(perf))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return getSenha();
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}