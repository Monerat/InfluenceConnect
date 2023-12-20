package br.com.influence.influence.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "influenciador")
public class Influenciador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idInfluenciador")
    private Long id;

    @Column(nullable = false)
    private Boolean ativo;

    @Column(nullable = false)
    private String nomeFantasia;

    private Long imgPerfil;
    private Long imgFeed1;
    private Long imgFeed2;
    private Long imgFeed3;
    private Long imgBackground;

    @ManyToOne
    @JoinColumn(name = "idPessoa", nullable = false)
    @JsonBackReference
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "idNicho", nullable = false)
    @JsonBackReference
    private Nicho nicho;

    @OneToMany(mappedBy = "influenciador")
    private List<CampanhaInfluenciador> campanhasInfluenciadores;

    @OneToMany(mappedBy = "influenciador")
    private List<RedeSocial> redesSociais;
    
    public Influenciador(Long id) {
        this.id = id;
    }
    
    public Influenciador() {
    }

    
    public Influenciador(Long id, Boolean ativo, String nomeFantasia, Pessoa pessoa, Nicho nicho,
            CampanhaInfluenciador CampanhaInfluenciador, RedeSocial RedeSocial) {
        this.id = id;
        this.ativo = ativo;
        this.nomeFantasia = nomeFantasia;
        this.pessoa = pessoa;
        this.nicho = nicho;
        this.campanhasInfluenciadores = new ArrayList<>();
        this.campanhasInfluenciadores.add(CampanhaInfluenciador);
        this.redesSociais = new ArrayList<>();
        this.redesSociais.add(RedeSocial);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public Long getImgPerfil() {
        return imgPerfil;
    }

    public void setImgPerfil(Long imgPerfil) {
        this.imgPerfil = imgPerfil;
    }

    public Long getImgFeed1() {
        return imgFeed1;
    }

    public void setImgFeed1(Long imgFeed1) {
        this.imgFeed1 = imgFeed1;
    }

    public Long getImgFeed2() {
        return imgFeed2;
    }

    public void setImgFeed2(Long imgFeed2) {
        this.imgFeed2 = imgFeed2;
    }

    public Long getImgFeed3() {
        return imgFeed3;
    }

    public void setImgFeed3(Long imgFeed3) {
        this.imgFeed3 = imgFeed3;
    }

    public Long getImgBackground() {
        return imgBackground;
    }

    public void setImgBackground(Long imgBackground) {
        this.imgBackground = imgBackground;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Nicho getNicho() {
        return nicho;
    }

    public void setNicho(Nicho nicho) {
        this.nicho = nicho;
    }

    public List<CampanhaInfluenciador> getCampanhasInfluenciadores() {
        return campanhasInfluenciadores;
    }

    public void setCampanhasInfluenciadores(List<CampanhaInfluenciador> campanhasInfluenciadores) {
        this.campanhasInfluenciadores = campanhasInfluenciadores;
    }

    public List<RedeSocial> getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(List<RedeSocial> redesSociais) {
        this.redesSociais = redesSociais;
    }
    
}