package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entities.User;
import com.exam.entities.UserRole;
import com.exam.helper.UserFoundException;
import com.exam.repo.RolesRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRpository;

	@Autowired
	private RolesRepository roleRepository;

//	@Override
//	public User createUser(User user, Set<UserRole> userRoles) throws RuntimeException {
//		for (UserRole ur : userRoles) {
//			if (!roleRepository.existsByRoleName(ur.getRole().getRoleName())) {
//				roleRepository.save(ur.getRole());
//			}
//
//		}
//
//		user.setUserRoles(userRoles);
//
//		if (!userRpository.existsByUsername(user.getUsername())) {
//			return userRpository.save(user);
//		} else {
//			return userRpository.findByUsername(user.getUsername());
//		}
//	}

	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userRpository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userRoleId) {
		// TODO Auto-generated method stub
		this.userRpository.deleteById(userRoleId);

	}

	@Override
	public User updateUser(User user, Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {

		User local = this.userRpository.findByUsername(user.getUsername());
		if (local != null) {
			System.out.println("User Alerady Exsist..");
			throw new UserFoundException();
			 
		} else {

			for (UserRole ur : userRoles) {

				roleRepository.save(ur.getRole());
			}

			user.getUserRoles().addAll(userRoles);
		User savedUser =userRpository.save(user);

		return savedUser;
		}

	}
//
//	
//	//getting user by username
//	@Override
//	public User getUser(String username) {
//		return this.userRpository.findByUsername(username);
//	}
//
//
//	@Override
//	public void deleteUser(Long userRoleId) {
//		// TODO Auto-generated method stub
//	 this.userRpository.deleteById(userRoleId);
//	
//	}
//
//
//	@Override
//	public User updateUser(User user, Long id) {
//		// TODO Auto-generated method stub
//		return this.updateUser(user, id);
//	}

}
