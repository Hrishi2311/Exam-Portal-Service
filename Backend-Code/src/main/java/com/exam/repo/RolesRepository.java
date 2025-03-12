package com.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exam.entities.Roles;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
	
	public boolean existsByRoleName(String name);

}
