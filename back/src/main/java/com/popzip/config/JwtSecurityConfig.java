package com.popzip.config;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.popzip.security.JwtFilter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtFilter jwtFilter;

    // JwtFilter를 Security로직에 필터를 등록
    @Override
    public void configure(HttpSecurity http) {
        // Security 로직에 필터를 등록
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}