package com.stackroute.favouriteservice.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.favouriteservice.entity.UserFavouritePlayerEntity;

@Repository
public interface UserFavouritePlayersRepository extends CrudRepository<UserFavouritePlayerEntity, Integer>{
	List<UserFavouritePlayerEntity> findAllById(Integer userid);
	UserFavouritePlayerEntity findByIdAndPid(Integer userid, Integer playerId);
	
	
	

}
