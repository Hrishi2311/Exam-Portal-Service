import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;

  constructor(private route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {

   // this.catId=this.route.snapshot.params['catId'];
    this.route.params.subscribe((params)=>{
      this.catId=params['catId'];
     // console.log(this.catId);
      if(this.catId==0)
        {
         // console.log("load all the quiz");
          
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error:any)=>{
            console.log(error);
            Swal.fire('error','error while loding quiz','error');
          }
        )
        }
        
        else
        {
          //console.log("load specific quiz");
          
        this._quiz.getActiveQuizzesOfCategories(this.catId).subscribe((data:any)=>{
        this.quizzes=data;
        },(err:any)=>{
        alert("something went wrong")
        });
          }
        
         });
  }

}
