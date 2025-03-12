package com.exam.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.entities.User;
import com.exam.entities.UserRole;


public interface UserService {
	
	public User createUser(User user,Set<UserRole> userRoles) throws Exception  ;
	
	// get user by username
	public User getUser(String username);
	
	//delete user
	public void deleteUser(Long userRoleId);
	
	//update user
	public User updateUser(User user,Long id);


		
	
		
	

}
