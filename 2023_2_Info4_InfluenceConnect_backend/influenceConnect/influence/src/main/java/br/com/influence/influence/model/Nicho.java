package br.com.influence.influence.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import br.com.influence.influence.model.Enum.EnumFaixaEtaria;
import br.com.influence.influence.model.Enum.EnumGenero;

@Entity
@Table(name = "nicho")
public class Nicho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idNicho")
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private EnumFaixaEtaria faixaEtaria;

    @Column(nullable = false)
    private EnumGenero genero;

    @OneToMany(mappedBy = "nicho")
    private List<Influenciador> influenciadores;
    
    public Nicho() {
    }

    public Nicho(Long id) {
        this.id = id;
    }

    public Nicho(Long id, String nome, String descricao, EnumFaixaEtaria faixaEtaria, EnumGenero genero,
            Influenciador influenciador) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.faixaEtaria = faixaEtaria;
        this.genero = genero;
        this.influenciadores = new ArrayList<>();
        this.influenciadores.add(influenciador);
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public EnumFaixaEtaria getFaixaEtaria() {
        return faixaEtaria;
    }

    public void setFaixaEtaria(EnumFaixaEtaria faixaEtaria) {
        this.faixaEtaria = faixaEtaria;
    }

    public EnumGenero getGenero() {
        return genero;
    }

    public void setGenero(EnumGenero genero) {
        this.genero = genero;
    }

    public List<Influenciador> getInfluenciadores() {
        return influenciadores;
    }

    public void setInfluenciadores(List<Influenciador> influenciadores) {
        this.influenciadores = influenciadores;
    }
    
}