package br.com.influence.influence.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.influence.influence.repository.PessoaRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Metodo que vai obter dinamicamente o usuario no banco pelo username, que np
        // nosso caso é o e-mail.
        return pessoaRepository.findByEmail(username).get();
    }

    public UserDetails obterUsuarioPeloId(Long id) {
        return pessoaRepository.findById(id).get();
    }

}
