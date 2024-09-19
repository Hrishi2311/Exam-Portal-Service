import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent  implements OnInit{

  qid:any;
  quizzes:any;


  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private router:Router){}


  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    // console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.quizzes=data;
        
      },
      (error:any)=>{
        Swal.fire('error','Error while get quiz','error');

      }
    )
    
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to Start the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info'
      }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      this.router.navigate(['/start/'+this.qid]);
      } 
      })
  }

  

}
