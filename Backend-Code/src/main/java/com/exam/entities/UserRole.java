package com.exam.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class UserRole {

	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private  long userRoleId;

	 
	    @ManyToOne(fetch = FetchType.EAGER)
	    private  User user;

	    @ManyToOne
	    private  Roles role;

	    public Roles getRole() {
	        return role;
	    }

	    public void setRole(Roles role) {
	        this.role = role;
	    }

	    public long getUserRoleId() {
	        return userRoleId;
	    }

	    public void setUserRoleId(long userRoleId) {
	        this.userRoleId = userRoleId;
	    }

	    public User getUser() {
	        return user;
	    }

	    public void setUser(User user) {
	        this.user = user;
	    }
	
	    
	
	
}
