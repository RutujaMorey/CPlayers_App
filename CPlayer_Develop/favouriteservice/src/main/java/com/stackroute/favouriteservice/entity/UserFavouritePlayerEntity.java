package com.stackroute.favouriteservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "UserFavouritePlayer")
public class UserFavouritePlayerEntity {

	@Column
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer favouriteId;

	public UserFavouritePlayerEntity(Integer id, Integer pid, String pname) {
		super();
		this.id = id;
		this.pid = pid;
		this.pname = pname;
	}

	public UserFavouritePlayerEntity(Integer favouriteId, Integer id, Integer pid, String pname) {
		super();
		this.favouriteId = favouriteId;
		this.id = id;
		this.pid = pid;
		this.pname = pname;
	}

	public UserFavouritePlayerEntity() {
		super();
	}

	@Column(name = "userid")
	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	@Column(name = "playerid")
	private Integer pid;

	@Column(name = "playername")
	private String pname;

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

}
