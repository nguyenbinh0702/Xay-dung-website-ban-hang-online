package vn.codegym.flightagency.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
//Created by: Quân
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private  Long accountId;
    private String name;
    private String accountName;
    private String photoURL;
    private Collection<? extends GrantedAuthority> authorities;

}


