package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    UserAuthService userAuthService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable(); //Spring Security tarafından oluşturulan tüm HTTP isteklerinde CSRF korumasını devre dışı bırakır.
        http.httpBasic().authenticationEntryPoint(new AutEntryPoint());

        http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated() //isteği için kimlik doğrulama gerektiren bir yetkilendirme kuralı tanımlar.
                .and()
                .authorizeHttpRequests().anyRequest().permitAll(); //tüm diğer istekler için herhangi bir yetkilendirme kuralı olmadığını belirtir
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }


}


