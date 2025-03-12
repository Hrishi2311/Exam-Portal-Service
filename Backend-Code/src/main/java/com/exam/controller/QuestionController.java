package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entities.exam.Questions;
import com.exam.entities.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {
	@Autowired
	private QuestionService questionService;
	@Autowired
	private QuizService quizService;

	// add question
	@PostMapping("/")
	public ResponseEntity<Questions> addQuestion(@RequestBody Questions questions) {
		Questions question1 = this.questionService.addQuestion(questions);
		return ResponseEntity.ok(question1);
	}

	// update question
	@PutMapping("/")
	public ResponseEntity<Questions> upadateQuestion(@RequestBody Questions questions) {
		return ResponseEntity.ok(this.questionService.updateQuestion(questions));
	}

	// get All questions of quiz id any
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid) {
		Quiz quiz = this.quizService.getQuiz(qid);
		Set<Questions> questions = quiz.getQuestions();
		List<Questions> list = new ArrayList(questions);
		int numberOfQuestions = Integer.parseInt(quiz.getNumberOfQuestion());
		if (list.size() > numberOfQuestions)
			;
		{
			list = list.subList(0, Math.min(numberOfQuestions, list.size()));
		}
		
		list.forEach((q)->{
			q.setAnswer("");
		});
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}

	// get All questions
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("qid") Long qid) {
		Quiz quiz = new Quiz();
		quiz.setQid(qid);
		Set<Questions> questions = this.questionService.getQuestionsOfQuiz(quiz);
		return ResponseEntity.ok(questions);
	}

	// get single question
	@GetMapping("/{quesId}")
	public Questions get(@PathVariable("quesId") Long quesId) {
		return this.questionService.getQuestion(quesId);
	}

	// delete question
	@DeleteMapping("/{qId}")
	public void deleteQuetion(@PathVariable("qId") Long qId) {
		this.questionService.deleteQuestion(qId);
	}

	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Questions> questions) {

		double marksGot = 0;
		int correctAnswers = 0;
		int attempted = 0;

		System.out.println(questions);

		for (Questions q : questions) {
			// System.out.println(q.getGivenAnswer());
			// q.getQuesId();
			// single questions
			Questions questions1 = this.questionService.get(q.getQuesId());
			if (questions1.getAnswer().equals(q.getGivenAnswer())) {

				correctAnswers++;

				double marksSingle=Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
				
				marksGot+=marksSingle;
			}
			if (q.getGivenAnswer() != null ) {
				attempted++;

			}

		}
		
		Map<Object,Object> map=Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted);
		

		return ResponseEntity.ok(map);
	}

}
