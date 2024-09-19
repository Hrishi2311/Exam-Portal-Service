import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/Services/category.service';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService){}

  categories=[];
quizData={
title:'',
description:'',
maxMarks:'',
numberOfQuestion:'',
active:true,
category:{
  cid:''
}
};
  
  



  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        //load category successfully..
        this.categories=data;
        console.log(data);
        
      },
      (error:any)=>{
        Swal.fire('Error!!','error in loding data from server','error');
      }
    )


  }
  addQuiz(){
  if(this.quizData.title.trim()==''|| this.quizData.title==null){

    this._snack.open("Title Required  !!",'',{
      duration:3000,
    });
    return;
  }       

  //validation..
  //call server..

  this._quiz.addQuiz(this.quizData).subscribe((data:any)=>{
    this.quizData.title='';
    this.quizData.description='';
    this.quizData.maxMarks='';
    this.quizData.numberOfQuestion='';
    this.quizData.active=false;
    this.quizData.category={cid:''};
    Swal.fire('success','Quiz has been added succesfully','success');
    },
    (error:any)=>{
    Swal.fire('Error','Something went wrong!!');
    })
    }
  



  }


