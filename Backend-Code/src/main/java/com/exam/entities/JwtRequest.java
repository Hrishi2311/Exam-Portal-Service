package com.exam.entities;

public class JwtRequest {
	
	
	String username;
	String Password;
	
	public JwtRequest()
	{
		
	}
	public JwtRequest(String username, String password) {
		super();
		this.username = username;
		Password = password;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	
	

}
