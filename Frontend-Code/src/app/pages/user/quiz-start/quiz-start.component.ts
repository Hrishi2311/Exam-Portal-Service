import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {

  qid: any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

  constructor(private location: LocationStrategy, private _route: ActivatedRoute, private question: QuestionService) { }




  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];

    this.loadQuestions();
  }


  loadQuestions() {
    this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
      
          this.timer = this.questions.length * 2 * 60;
        
        this.startTimer();

        console.log(data);


      },
      (error: any) => {
        Swal.fire('error', 'error while getting question', 'error');

      }
    )

  }


  preventBackButton() {
    history.pushState(null, "null", location.href);
    this.location.onPopState(() => {
      history.pushState(null, "null", location.href);
    });
  }



  submitQuiz() {
    //this.isSubmit=true;
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then(e => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} Min:${ss} Sec`;
  }

  evalQuiz() {

    this.question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2)) ;
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        this.isSubmit=true; 
        
      },
      (error:any)=>{
        Swal.fire('error', 'error while getting question', 'error');
       }
    )


    // this.isSubmit = true;
    // this.questions.forEach((q: { givenAnswer: any; answer: any; }) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
  }
  printPDF() {
    window.print();
  }

}
