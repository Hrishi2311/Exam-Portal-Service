package com.exam.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.exam.Questions;
import com.exam.entities.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Questions, Long> {

	Set<Questions> findByQuiz(Quiz quiz);
	
	

}
