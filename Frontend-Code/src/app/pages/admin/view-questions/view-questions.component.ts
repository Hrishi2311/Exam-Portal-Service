import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

qId=0;
qTitle:any;


questions=[{
  quesId:'',
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
  quiz:{
  qid:'',
  title:'',
  }
  }];

constructor(
  private _route:ActivatedRoute, private _service:QuestionService
){}

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    // console.log(this.qId);
    // console.log(this.qTitle); 
    this._service.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error:any)=>{
        console.log(error);
        
      }
    )
    


  }

  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are You Sure,Do you want to delete this question'
      }).then(result=>{
      if(result.isConfirmed)
      {
      this._service.deleteQuestions(quesId).subscribe(
      (data:any)=>{
      Swal.fire("Successfully","Question has been deleted",'success');
      this.questions=this.questions.filter((q)=>q.quesId!=quesId);
      },
      (error:any)=>{
      Swal.fire('Error','Something went wrong','error');
      });
      }
      });
  }

}
