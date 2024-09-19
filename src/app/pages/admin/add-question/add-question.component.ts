import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import { SlashCommand } from 'ckeditor5-premium-features';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor=ClassicEditor;

  qId: any;
  qTitle: any;
  questions = {
    quizzes: {
      qid: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };
  constructor(private _route: ActivatedRoute, private _questions: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.questions.quizzes['qid'] = this.qId;
  }

  formSubmit() {

    if (this.questions.content == null || this.questions.content.trim() == '') {
      Swal.fire("Error", "Please Fill Content", "error");
      return
    }
    if (this.questions.option1.trim() == '' || this.questions.option1 == null) {
      Swal.fire("Error", "Please Fill option1", "error");
      return
    }
    if (this.questions.option2.trim() == '' || this.questions.option2 == null) {
      Swal.fire("Error", "Please Fill option2", "error");
      return
    }
    if (this.questions.answer.trim() == '' || this.questions.answer == null) {
      Swal.fire("Error", "Please Fill answer", "error");
      return
    }



    this._questions.addQuestions(this.questions).subscribe(
      (data: any) => {
        this.questions.content = '';
        this.questions.option1 = '';
        this.questions.option2 = '';
        this.questions.option3 = '';
        this.questions.option4 = '';
        this.questions.answer = '';
        Swal.fire('sucess','Question Added','success');

      },
      (error:any)=>{
        Swal.fire('error','error to adding question','error');
      }
    )
  }

}
