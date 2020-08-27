package com.stackroute.userservice.repositories;

import org.springframework.data.repository.CrudRepository;

import com.stackroute.userservice.entity.NewUserEntity;

public interface NewUserRepository extends CrudRepository<NewUserEntity, String>{
	
	NewUserEntity findByUsername(String username);
}
