import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  
  qid=0;
  quiz: any;
  categories: any;
  constructor( private router:Router,private _snack:MatSnackBar ,private route:ActivatedRoute,private _quiz:QuizService,private _category:CategoryService){ }
  
  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
   // alert(this.qid);
   this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
      
    },
    (error:any)=>{
      console.log(error);
      

    }
   );
   this._category.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },
    (error:any)=>{
      alert("error in loding in cagtegories");
    }
   )

  }

  updateData(){

 if(this.quiz.title.trim()==''|| this.quiz.title==null||this.quiz.description==''||this.quiz.description==null){
  this._snack.open("Title Required  !!",'',{
    duration:3000,
  });
  return;
  }

  this._quiz.updateQuiz(this.quiz).subscribe(
    (data:any)=>{
      Swal.fire('Success','Quiz has been updated','success').then((e)=>{
        this.router.navigate(['admin/quizzes'])
      })
    },
    (error:any)=>{
      Swal.fire('Error','Something went wrong','error');
    }
  )





  }




}
