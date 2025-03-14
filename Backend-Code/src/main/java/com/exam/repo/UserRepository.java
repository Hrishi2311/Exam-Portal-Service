package com.exam.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.exam.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	 public User findByUsername(String username);
	 
//	 public boolean existsByUsername(String username);
	    Optional<User> findByEmail(String email);

	 
	
	

}
