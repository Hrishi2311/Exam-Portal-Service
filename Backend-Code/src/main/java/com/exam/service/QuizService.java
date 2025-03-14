package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.entities.exam.Category;
import com.exam.entities.exam.Quiz;

public interface QuizService  {
	
	public Quiz addQuiz(Quiz quiz);
	
	public Quiz updateQuiz(Quiz quiz);
	
	public Set<Quiz> getQuizs();
	
	public Quiz getQuiz(Long quizId );
	
	public void deleteQuiz(Long quizId);
	
	public List<Quiz> getQuizzesOfCategory(Category category);
	
	public List<Quiz> getActiveQuiz();
	
	public List<Quiz> getActiveQuizzesOfCategory(Category c);

}
