package com.stackroute.favouriteservice.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.dto.UserFavouritePlayerDTO;
import com.stackroute.favouriteservice.entity.UserFavouritePlayerEntity;
import com.stackroute.favouriteservice.exceptionhandlers.ResourceNotFoundException;
import com.stackroute.favouriteservice.services.UserFavouritePlayersService;

@RestController
@RequestMapping("/players")
public class FavouritePlayersController {

	@Autowired
	private UserFavouritePlayersService userFavouritePlayersService;

	@GetMapping("/favourites/{userid}")
	public ResponseEntity<List<UserFavouritePlayerEntity>> getFavouritePlayersForUser(@PathVariable("userid") Integer userId) {
		List<UserFavouritePlayerEntity> favouriteList = userFavouritePlayersService.getFavouritePlayersForUser(userId);
		return CollectionUtils.isEmpty(favouriteList) ? new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT)
				: new ResponseEntity<>(favouriteList, HttpStatus.OK);

	}

	@PostMapping("/add")
	public ResponseEntity<?> addFavouritePlayers(@RequestBody UserFavouritePlayerDTO userFavouritePlayerDTO) {
		List<UserFavouritePlayerEntity> favouriteList = userFavouritePlayersService
				.addFavouritePlayersToList(userFavouritePlayerDTO);
		return CollectionUtils.isEmpty(favouriteList) ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
				: new ResponseEntity<>(favouriteList, HttpStatus.CREATED);

	}

	@PostMapping("/delete")
	public ResponseEntity<?> deleteFavouritePlayers(@RequestBody UserFavouritePlayerDTO userFavouritePlayerDTO) throws ResourceNotFoundException {
		UserFavouritePlayerEntity deletedFavourite = userFavouritePlayersService
				.deleteFavouritePlayersToList(userFavouritePlayerDTO);
		return Objects.isNull(deletedFavourite) ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
				: new ResponseEntity<>(deletedFavourite, HttpStatus.OK);

	}

}
