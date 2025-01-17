package com.stackroute.userservice.controllers;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.dto.AuthenticatedUserResponse;
import com.stackroute.userservice.dto.NewUserDTO;
import com.stackroute.userservice.dto.UserDTO;
import com.stackroute.userservice.services.CplayersUserDetailsService;
import com.stackroute.userservice.services.TokenGeneratorUtil;

@RequestMapping("/user")
@RestController
@CrossOrigin
public class AuthenticateUserController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CplayersUserDetailsService cplayersUserDetailsService;

	@Autowired
	private TokenGeneratorUtil tokenGeneratorUtil;

	@PostMapping(value = "/login")
	public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) throws Exception {
		authenticate(userDTO.getUserName(), userDTO.getPassword());
		final UserDetails userDetails = cplayersUserDetailsService.loadUserByUsername(userDTO.getUserName());
		String token = tokenGeneratorUtil.generateToken(userDetails);
		return Objects.nonNull(token) ? new ResponseEntity<>(new AuthenticatedUserResponse(token), HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	@PostMapping(value = "/signup")
	public ResponseEntity<?> saveUser(@RequestBody NewUserDTO newUserDTO) throws Exception {
		return ResponseEntity.ok(cplayersUserDetailsService.saveNewUser(newUserDTO));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

}
