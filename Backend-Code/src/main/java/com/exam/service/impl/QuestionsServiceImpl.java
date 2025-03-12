package com.exam.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entities.exam.Questions;
import com.exam.entities.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;

@Service
public class QuestionsServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public Questions addQuestion(Questions questions) {
		// TODO Auto-generated method stub
		return questionRepository.save(questions);
	}

	@Override
	public Questions updateQuestion(Questions questions) {
		// TODO Auto-generated method stub
		return questionRepository.save(questions);
	}

	@Override
	public Set<Questions> getQuestion() {
		// TODO Auto-generated method stub
		return new HashSet<>(questionRepository.findAll());
	}

	@Override
	public Questions getQuestion(Long qid) {
		// TODO Auto-generated method stub
		return questionRepository.findById(qid).get();
	}

	@Override
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long qesId) {
		// TODO Auto-generated method stub
		Questions questions = new Questions();
		questions.setQuesId(qesId);
		questionRepository.delete(questions);

	}
//	
//	public Questions get(Long qid) {	
//		 
//		return questionRepository.findById(qid).get();
//		
//		
//	}

	
	
	@SuppressWarnings("deprecation")
	public Questions get(Long questionId) {
		return this.questionRepository.getOne(questionId);
	}
}
