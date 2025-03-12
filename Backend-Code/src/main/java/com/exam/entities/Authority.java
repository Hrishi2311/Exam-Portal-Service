package com.exam.entities;

import org.springframework.security.core.GrantedAuthority;

@SuppressWarnings("serial")
public class Authority implements GrantedAuthority {

	private String authority;
	
	 
	  public Authority(String authority) {
		// TODO Auto-generated constructor stub
		  this.authority= authority;
	}
	
	@Override
	public String getAuthority() {

		return this.authority;
		// TODO Auto-generated method stub
	}
	
	

}
