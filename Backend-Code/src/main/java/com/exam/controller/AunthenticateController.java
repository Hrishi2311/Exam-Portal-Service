package com.exam.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
  import org.springframework.web.bind.annotation.RestController;

import com.exam.config.JwtUtils;
import com.exam.entities.JwtRequest;
import com.exam.entities.JwtResponse;
import com.exam.entities.User;
import com.exam.helper.UserNotFoundException;
import com.exam.service.impl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AunthenticateController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private JwtUtils jwtUtils;

	// generate token

	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {

		try {

			this.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

		} catch (UserNotFoundException	 e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new Exception("user not found...");

		}
		// authenticate
		UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());

		String token=this.jwtUtils.generateToken(userDetails);
		
		return ResponseEntity.ok(new JwtResponse(token));	
	}

	private void authenticate(String username, String password) throws Exception {

		try {

			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

		} catch (DisabledException e) {
			// TODO: handle exception
			throw new Exception("User Disabled " + e.getMessage());

		} catch (BadCredentialsException e) {
			throw new Exception("Invalid Creadientials " + e.getMessage());

		}

	}
	
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		
		
		return ((User)this.userDetailsServiceImpl.loadUserByUsername(principal.getName()));
		
		
		
		
		
	}
	
	
	
}
