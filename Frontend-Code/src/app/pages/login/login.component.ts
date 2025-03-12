
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginData=
{
username:'',
password:''
}
constructor(private login:LoginService ,
  private router:Router,
  private snack:MatSnackBar) { }

ngOnInit(): void {
}

formSubmit():void
{

  console.log("login button clicked");


if(this.loginData.username.trim()=='' || this.loginData==null)
{

this.snack.open("username is required..!!",'',{
    duration:3000
});
}
if(this.loginData.password.trim()==''||this.loginData==null)
{
    this.snack.open("password is required..!!",'',{
        duration:3000
    });
}

//request to server to generate token
this.login.generateToken(this.loginData)
.subscribe({
  next:(data:any)=>{
    console.log('success');
    console.log(data);
    
    //login 
    this.login.loginUser(data.token);

    this.login.getCurrentUser()   
    .subscribe({
      next:(user:any)=>{
        this.login.setUser(user);
        console.log(user);
        //redirect
        if (this.login.getUserRole() === 'ADMIN') {
            window.location.href='/admin'
            //this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
        } else if (this.login.getUserRole() === 'NORMAL') {
            //window.location.href='/user-dashboard/0'
           this.router.navigate(['user-dashboard/0']);
            //this.login.loginStatusSubject.next(true);

        } else {
              this.snack.open('User role is not recognized..!!', '', { duration: 3000 });

            this.login.logout();
            //this.router.navigate(['/home']);
            this.login.loginStatusSubject.next(true);


          }
      },error: (error) => {
        console.log('Error retrieving user:', error);
        this.snack.open('Failed to retrieve user..!!', '', { duration: 3000 });
      }
    })                     
  
  },
  error:(error)=>{
    console.log('error');
    console.log(error);
    this.snack.open("Invalid Details !! Try again",'',{
        duration:3000
    })
  }
})




  // this.login.generateToken(this.loginData).subscribe(
  //   (data:any)=>{
  //     console.log('success');
  //     console.log(data);


  //     this.login.loginUser(data.token);

  //     this.login.getCurrentUser().subscribe((user:any)=>{
  //       this.login.setUser(user);
  //       console.log(user);


  //       if(this.login.getUserRole()=='ADMIN'){

  //         this.router.navigate(['admin']);
  //         this.login.loginStatusSubject.next(true);
  //       }else if(this.login.getUserRole()=='NORMAL'){

  //         this.router.navigate(['user-dashboard']);
  //         this.login.loginStatusSubject.next(true);
  //       }else{
  //         this.login.logout();
  //       //  this.router.navigate(['/login']);
  //       }


  //     });      
  //   },
  //   (error)=>{
  //     console.log('Error !');
  //     console.log(error);
  //     this.snack.open('Invalid Details !! try again','',{
  //       duration:3000
  //     });
      
      
      
  //   }
    
  // );




 }

} 



