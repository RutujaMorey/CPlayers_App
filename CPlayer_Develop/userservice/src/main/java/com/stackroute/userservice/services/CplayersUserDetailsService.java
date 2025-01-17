package com.stackroute.userservice.services;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.dto.NewUserDTO;
import com.stackroute.userservice.entity.AuthenticatedUsers;
import com.stackroute.userservice.entity.NewUserEntity;
import com.stackroute.userservice.repositories.AuthenticatedUserRepository;
import com.stackroute.userservice.repositories.NewUserRepository;

@Service
public class CplayersUserDetailsService implements UserDetailsService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticatedUserRepository authenticatedUserRepository;

	@Autowired
	private NewUserRepository newUserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AuthenticatedUsers authenticatedUser = authenticatedUserRepository.findByUsername(username);
		if (Objects.isNull(authenticatedUser)) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(authenticatedUser.getUsername(),
				authenticatedUser.getPassword(), new ArrayList<>());

	}

	public NewUserEntity saveNewUser(NewUserDTO newUserDTO) {
		NewUserEntity newUserEntity = new NewUserEntity(newUserDTO.getUserName(),
				passwordEncoder.encode(newUserDTO.getPassword()), newUserDTO.getFirstName(), newUserDTO.getLastName());
		return newUserRepository.save(newUserEntity);

	}

}
