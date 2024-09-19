
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import baseUrl from './helper';
import { Router } from '@angular/router';


@Injectable({
providedIn: 'root'
})
export class LoginService {

constructor(private http:HttpClient,private router: Router) { }

public loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

//current user:which is loggedin
public getCurrentUser()
{
return this.http.get(`${baseUrl}/current-user`);
}
//generate token
public generateToken(loginData:any)
{
return this.http.post(`${baseUrl}/generate-token`,loginData);
}

//login user:set token in localstorage
public loginUser(token: any)
{
localStorage.setItem('token',token);
return true;
}

// isLoggedIn(): boolean {
//   // Check the actual login status, e.g., by checking if a token exists in localStorage
//   return !!localStorage.getItem('token');
// }


//isLogin:user is logged in or not
public isLoggedIn():boolean
{
let tokenStr=localStorage.getItem("token");
if(tokenStr==undefined||tokenStr==''||tokenStr==null)
{
return false;
}
else
{
return true;
}
}
//logout : remove token from local storage
public logout()
{
localStorage.removeItem('token');
localStorage.removeItem('user');
//this.router.navigate(['/login']);
return true;
}
//get token
public getToken()
{
return localStorage.getItem('token');
}
//Set userdetails
public setUser(user: any)
{
localStorage.setItem('user',JSON.stringify(user));
}
//getUser
public getUser()
{
let userStr=localStorage.getItem("user");
if(userStr!=null)
{
return JSON.parse(userStr);
}
else
{
this.logout();
//this.router.navigate(['/login']);
return null;
}
}
//get UserRole
public getUserRole()
{
let user=this.getUser();
return user.authorities[0].authority;
}
}
