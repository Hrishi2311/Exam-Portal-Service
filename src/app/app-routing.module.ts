import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './Services/admin.guard';
import { normalGuard } from './Services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
   path:'signup',component:SignupComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'admin',component:DashboardComponent,canActivate:[adminGuard],children:[
      {
        path:'',component:WelcomeComponent,
      },
      {
        path:'profile',component:ProfileComponent,
      },
      {
        path:'categories',component:ViewCategoriesComponent
      },
      {
        path:'addcategory',component:AddCategoryComponent
      },
      {
        path:'quizzes',component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',component:AddQuizComponent
      },
      {
        path:'quiz/:qid',component:UpdateQuizComponent
      },
      {
        path:'view-questions/:qid/:title',component:ViewQuestionsComponent
      },
      {
        path:'add-question/:qid:/:title',component:AddQuestionComponent
      },
    ],

  },
  {
    path:'user-dashboard',component:UserDashboardComponent,canActivate:[normalGuard],
    children:[
      {
        path:':catId',component:LoadQuizComponent
      },
      {
        path:'instructions/:qid',component:InstructionsComponent
      },
      
    ]
  },
  {
    path:'start/:qid',component:QuizStartComponent,canActivate:[normalGuard]
  },
  
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
