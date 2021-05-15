package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.repository.AccountRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

//Created by: Quân
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
       Account account = accountRepository.findByEmailAndStatusIsTrue(s);
       if(account == null){
           throw new UsernameNotFoundException("User not found");
       }
        String email = account.getEmail();
        String password = account.getPassword();
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        String role = account.getRole();
        grantedAuthorities.add(new SimpleGrantedAuthority(role));
        return new org.springframework.security.core.userdetails.User(email, password, grantedAuthorities);
    }
}
