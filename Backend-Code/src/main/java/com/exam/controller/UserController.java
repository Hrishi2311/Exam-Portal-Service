package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entities.Roles;
import com.exam.entities.User;
import com.exam.entities.UserRole;
import com.exam.helper.UserFoundException;
import com.exam.service.UserService;

@CrossOrigin("*")
@RestController	
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	//creating user
	
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		
		
		user.setProfile("default.png");
		
			//encoding password with bCryptPasswordEncoder
		
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		
		Set<UserRole> roles=new HashSet<UserRole>();
		
		Roles role=new Roles();
		role.setRoleId(45);
		role.setRoleName("NORMAL");
		
		UserRole userRole=new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		
		roles.add(userRole);
		
		
		return userService.createUser(user, roles);
		
		
	}
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username ) {
		return userService.getUser(username);
		
	}
	
	
	//delete user by id
	@DeleteMapping("/{userRoleId}")
	public void deleteUser(@PathVariable("userRoleId") Long userRoleId) {
		
		this.userService.deleteUser(userRoleId);
		
		
	}
	
	@PutMapping("/{id}")
	public User updateUser(@RequestBody User user,Long id) {
		
		return this.userService.updateUser(user, id);
		
	}
//	@GetMapping("/users/all")
//	@Secured("ADMIN")
//	public ResponseEntity<?> getAllUsers()
//	{
//	return ResponseEntity.ok(this.userService.getClass());
//	}
//	@GetMapping("/admins/all")
//	@Secured("ADMIN")
//	public ResponseEntity<?> getAllAdmins()
//	{
//	return ResponseEntity.ok(this.userService.getClass());
//	}
	
	
	
	@ExceptionHandler(UserFoundException.class)
	public ResponseEntity<?> exceptionHandler(UserFoundException ex){
		return ResponseEntity.ok(ex.getMessage());
		
	}
	
	
	

}
