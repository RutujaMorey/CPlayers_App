package com.stackroute.favouriteservice.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import com.stackroute.favouriteservice.dto.UserFavouritePlayerDTO;
import com.stackroute.favouriteservice.entity.UserFavouritePlayerEntity;
import com.stackroute.favouriteservice.exceptionhandlers.ResourceNotFoundException;
import com.stackroute.favouriteservice.repositories.UserFavouritePlayersRepository;

@Service
public class UserFavouritePlayersService {

	@Autowired
	private UserFavouritePlayersRepository userFavouritePlayersRepository;
	

	public List<UserFavouritePlayerEntity> getFavouritePlayersForUser(Integer userId) {

		List<UserFavouritePlayerEntity> savedUserFavoritePlayersList = userFavouritePlayersRepository
				.findAllById(userId);
		if (CollectionUtils.isEmpty(savedUserFavoritePlayersList)) {
			return new ArrayList<>();
		} else {
			return savedUserFavoritePlayersList;
		}
	}

	public List<UserFavouritePlayerEntity> addFavouritePlayersToList(UserFavouritePlayerDTO userFavouritePlayerDTO) {
		UserFavouritePlayerEntity userFavouritePlayerEntity = new UserFavouritePlayerEntity(
				userFavouritePlayerDTO.getId(), userFavouritePlayerDTO.getPid(), userFavouritePlayerDTO.getPname());
		List<UserFavouritePlayerEntity> updatedFavouriteList = new ArrayList<>();
		List<UserFavouritePlayerEntity> savedUserFavoritePlayersList = userFavouritePlayersRepository
				.findAllById(userFavouritePlayerDTO.getId());
		if (CollectionUtils.isEmpty(savedUserFavoritePlayersList)) {
			updatedFavouriteList.add(userFavouritePlayerEntity);
		} else {
			savedUserFavoritePlayersList.add(userFavouritePlayerEntity);
			updatedFavouriteList = savedUserFavoritePlayersList;
		}
		return (List<UserFavouritePlayerEntity>) userFavouritePlayersRepository.saveAll(updatedFavouriteList);
	}

	public UserFavouritePlayerEntity deleteFavouritePlayersToList(UserFavouritePlayerDTO userFavouritePlayerDTO)
			throws ResourceNotFoundException {
		UserFavouritePlayerEntity userFavouriteToDelete = userFavouritePlayersRepository
				.findByIdAndPid(userFavouritePlayerDTO.getId(), userFavouritePlayerDTO.getPid());
		if (ObjectUtils.isEmpty(userFavouriteToDelete)) {
			return null;
		} else {
			userFavouritePlayersRepository.delete(userFavouriteToDelete);
			return userFavouriteToDelete;
		}
	}
//
//	public UserFavouritePlayerEntity updateFavouritePlayersToList(UserFavouritePlayerDTO userFavouritePlayerDTO) {
//		UserFavouritePlayerEntity userFavouriteToUpdate = userFavouritePlayersRepository
//				.findByIdAndPid(userFavouritePlayerDTO.getId(), userFavouritePlayerDTO.getPid());
//		if (ObjectUtils.isEmpty(userFavouriteToUpdate)) {
//			return null;
//		} else {
//			userFavouriteToUpdate.setId(userFavouritePlayerDTO.getId());
//			userFavouriteToUpdate.setPid(userFavouritePlayerDTO.getPid());
//			userFavouritePlayersRepository.save(userFavouriteToUpdate);
//			return userFavouriteToUpdate;
//		}
//
//	}

}
