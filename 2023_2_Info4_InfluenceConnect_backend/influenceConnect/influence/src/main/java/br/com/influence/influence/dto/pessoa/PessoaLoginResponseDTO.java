package br.com.influence.influence.dto.pessoa;

public class PessoaLoginResponseDTO {
    
    private String token;
    private PessoaResponseDTO pessoa;

    public PessoaLoginResponseDTO(String token, PessoaResponseDTO pessoa) {
        this.token = token;
        this.pessoa = pessoa;
    }

    public PessoaLoginResponseDTO() {
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public PessoaResponseDTO getPessoa() {
        return pessoa;
    }
    public void setPessoa(PessoaResponseDTO pessoa) {
        this.pessoa = pessoa;
    }
    
}
