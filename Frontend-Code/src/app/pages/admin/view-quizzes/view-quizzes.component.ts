import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

quizzes=[
  {
    qid:'',
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:'',
    category:{
      title:''
    }
  },
  
]

constructor(private quiz:QuizService){}


  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
        
      },
      (error:any)=>{
        Swal.fire('Error!!',"Error in loding in data",'error');
      }
    )
  }


  // delete quiz
  deleteQuiz(qid: any)
{

Swal.fire({
icon:'info',
title:'Are You Sure?',
confirmButtonText:'Delete',
showCancelButton:true
}).then(result=>{
if(result.isConfirmed)
{
this.quiz.deleteQuiz(qid).subscribe(
(data)=>{
this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
Swal.fire('Success','Successfully Deleted','success');
},
err=>{
Swal.fire('error','Something went wrong','error')
});
}

});
}





}
