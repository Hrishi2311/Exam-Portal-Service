import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
   return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);

  }
  public getQuestionsOfQuizForTest(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
 
   }

  public addQuestions(questions:any){
    
    return this.http.post(`${baseUrl}/question/`,questions);

  }

  public deleteQuestions(quesId:any){

    return this.http.delete(`${baseUrl}/question/${quesId}`);

  }

  public evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions)

  }

}
