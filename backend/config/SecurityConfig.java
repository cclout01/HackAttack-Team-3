package com.hackattackt3.backend.config;
//created security config to allow unauthenticated access to GET /positions and GET /positions/{id} endpoints, while requiring authentication for all other endpoints. Also configured OAuth2 login with Google and set up logout functionality.
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/positions").permitAll()
                .requestMatchers(HttpMethod.GET, "/positions/*").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("http://localhost:5173/auth/callback", true)
            )
            .logout(logout -> logout
                .logoutSuccessUrl("http://localhost:5173")
            );
        return http.build();
    }
}