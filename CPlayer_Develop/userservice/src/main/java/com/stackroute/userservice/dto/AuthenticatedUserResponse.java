package com.stackroute.userservice.dto;

import java.io.Serializable;

public class AuthenticatedUserResponse implements Serializable {

	private static final long serialVersionUID = 3317513310353981636L;
	private final String authenticationToken;


	public String getAuthenticationToken() {
		return authenticationToken;
	}


	public AuthenticatedUserResponse(String token) {
		this.authenticationToken = token;
	}

}
