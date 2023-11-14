package com.popzip.security;


import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popzip.entity.User;
import com.popzip.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // DB에서 유저정보를 가져온다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    		User user = userRepository.findByUserId(username);
    		if(user!=null) {
    			return createUserDetails(user);
    		}else {
    			return (UserDetails) new UsernameNotFoundException(username + " 존재하지 않는 username 입니다.");
    		}
    }

    // DB에서 조회한 user 정보를 기반으로 UserDetails의 구현체인
    // User (org.springframework.security.core.userdetails.User) 를 생성하여 return 한다.
    private UserDetails createUserDetails(User user) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole().toString());

        return new org.springframework.security.core.userdetails.User(
                user.getUserId(),
                user.getUPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}