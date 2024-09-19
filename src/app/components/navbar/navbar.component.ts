import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


    isLoggedeIn=false;
    user:any;
 
  constructor(public login:LoginService,private router:Router) { }
  
  ngOnInit(): void {
    this.isLoggedeIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedeIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
          });


  
  
  }
  
  public logout()
  {
  this.login.logout();
   //window.location.reload();
   this.router.navigate(['/login']);
  this.login.loginStatusSubject.next(false);
  }
  

}
