import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}

    User=<User>{};

  baserUrl="http://localhost:8080"
  
  
//add user
public addUser(User:any){
return this.http.post(`${this.baserUrl}/user/`,User);


}

// Get all normal users
public getAllUsers(){
  console.log('Fetching all users...');
  return this.http.get(`${baseUrl}/user/users/all/`);
  }
  // Get all Admins users
  public getAllAdmins(){
  console.log('Fetching all users...');
  return this.http.get(`${baseUrl}/user/admins/all/`);
  }




}
