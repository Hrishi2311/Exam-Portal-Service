import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  User=<User>{};

  constructor(private userService:UserService,
              private snackbar:MatSnackBar,
              private router:Router
  ){}

  
  ngOnInit(): void {
    
  }



  onSubmit(){
    if(this.User.username==''|| this.User==null)
    {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Username is Required!',
    })
    return;
    }
    //adduser:userService
    this.userService.addUser(this.User).subscribe((data)=>{
    //success
    // this.User.fName='';
    // this.User.lname='';
    // this.User.email='';
    // this.User.username='';
    // this.User.password='';
    // this.User.phone='';
    
    Swal.fire('Success','You have succesfully registered','success');
    this.router.navigate(['/login']);
    //end
    },
    err=>{
    //error
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Username is already Exist,please try another Username!',
    })
    //end
    });























    // .subscribe({
    //   next:(data:any)=>{
    //     console.log(data);
    //     Swal.fire(' Successfully done','User id is '+ data.id,'success');
    //     // alert('success');
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //     // alert('SOMETHING WENT WROG');
    //     this.snackbar.open("Somthing Went Wrong..",'',{
    //       duration:3000
    //     })
    //   }
    // }); 
  
  
  }

  resetForm(form:NgForm):void{
    form.reset();
  }

}
