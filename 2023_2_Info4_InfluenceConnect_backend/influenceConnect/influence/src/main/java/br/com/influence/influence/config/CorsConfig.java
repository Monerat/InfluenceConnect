// package br.com.influence.influence.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**").allowedOrigins("*") // ou "*" para permitir de qualquer origem
//                 .allowedMethods("GET", "POST", "PUT", "DELETE")
//                 .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization").maxAge(3600); 
//     }
// }