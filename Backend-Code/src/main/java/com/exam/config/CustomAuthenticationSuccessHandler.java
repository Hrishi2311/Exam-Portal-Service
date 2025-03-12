package com.exam.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // Generate JWT token or perform any post-login actions
        String token = "YOUR_GENERATED_JWT_TOKEN"; // Replace with actual logic
        response.setContentType("application/json");
        response.getWriter().write("{ \"token\": \"" + token + "\" }");
    }
}
