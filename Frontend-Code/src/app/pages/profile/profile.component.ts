import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  User=<User>{};

  constructor(private login:LoginService){}


  ngOnInit(): void {

    this.User=this.login.getUser();
  //   this.login.getCurrentUser().subscribe((user:any)=>{
  //     this.User=user;
  //   },
  //   (error)=>{
  //     alert("error");
  //   }
  // )

  }


  


}
