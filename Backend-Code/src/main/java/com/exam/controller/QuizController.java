package com.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entities.exam.Category;
import com.exam.entities.exam.Quiz;
import com.exam.service.QuizService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizService quizService;

	// add quiz
	@PostMapping("/")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
		// Quiz quiz1=this.quizService.addQuiz(quiz);
	    //Quiz updatedQuiz = quizService.updateQuiz(quiz);

		return ResponseEntity.ok(quizService.addQuiz(quiz));
	}

	// update quiz
	@PutMapping("/")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(quizService.updateQuiz(quiz));
	}

	// get quiz
	@GetMapping("/")
	public ResponseEntity<?> getQuiz() {
		return ResponseEntity.ok(this.quizService.getQuizs());

	}

	// get single quiz
	@GetMapping("/{qid}")
	public Quiz quiz(@PathVariable("qid") Long qid) {

		return this.quizService.getQuiz(qid);
	}

	@DeleteMapping("/{qId}")
	public void deleteQuiz(@PathVariable("qId") Long qId) {
		quizService.deleteQuiz(qId);
	}

//@Repository
//public interface Quiz_Repo extends JpaRepository<Quiz, Long>{
//
//	@Modifying
//    @Transactional
//	@Query(value = "DELETE FROM quiz WHERE qid = ?1", nativeQuery = true)
//	public void deletdQuiz(Long qid);
//}
	
	
	@GetMapping("/category/{cid}")
	public List<Quiz> geQuizessOfCategory(@PathVariable("cid") Long cid){
		
		Category category=new Category();
		category.setCid(cid);
		return quizService.getQuizzesOfCategory(category);
	}
	
	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes(){
		
		return quizService.getActiveQuiz();
	}
	
	@GetMapping("/category/active/{cid}")
	public List<Quiz> getActiveQuizzes(@PathVariable("cid") Long cid){
		
		Category category=new Category();
		category.setCid(cid);
		return quizService.getActiveQuizzesOfCategory(category);
	}
	
	

}
