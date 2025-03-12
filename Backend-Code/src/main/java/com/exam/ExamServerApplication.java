package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.entities.Roles;
import com.exam.entities.User;
import com.exam.entities.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;	

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Application Started..");
////
//		User user=new User();
//		
//		user.setfName("Hrishi");
//		user.setLname("Suryakar");
//		user.setUsername("Hrishi231100");
//		user.setPassword(bCryptPasswordEncoder.encode("Hrishi@123"));
//		user.setEmail("hrishi@gmail.com");
//		user.setProfile("default.png");
//		
//		Roles role=new Roles();
//		
//		role.setRoleId(1);	
//		role.setRoleName("ADMIN");
//		
//		
//		Set<UserRole> userRoleSet=new HashSet<>();
//		
//		UserRole userRole=new UserRole();		
//		
//		userRole.setRole(role);
//		userRole.setUser(user);
//		
//		
//		userRoleSet.add(userRole);
//		
//	User user1=	this.userService.createUser(user, userRoleSet);
//	
//	System.out.println(user1.getUsername());
//		
//		

	}

}
