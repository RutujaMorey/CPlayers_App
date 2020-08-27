package com.stackroute.favouriteservice.dto;

import lombok.Data;

@Data
public class UserFavouritePlayerDTO {
	
	private Integer pid;
	
	private Integer id;
	
	private String pname;

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
