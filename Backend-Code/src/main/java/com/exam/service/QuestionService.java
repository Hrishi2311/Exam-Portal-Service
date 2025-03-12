package com.exam.service;

import java.util.Set;

import com.exam.entities.exam.Questions;
import com.exam.entities.exam.Quiz;

public interface QuestionService {

	public Questions addQuestion(Questions questions);

	public Questions updateQuestion(Questions questions);

	public Set<Questions> getQuestion();

	public Questions getQuestion(Long quesId);

	public Set<Questions> getQuestionsOfQuiz(Quiz quiz);

	public void deleteQuestion(Long qid);

	public Questions get(Long questionsId);
}
