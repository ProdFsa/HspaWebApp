import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //add authentication service for login user business logic

  authUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem('Users')) {
      UserArray = JSON.parse(localStorage.getItem('Users') || '[]');
    }
    //chek the user existence using arrow function/lamda expressions
    return UserArray.find((p: any) => p.userName === user.userName && p.password === user.password);
  }
}
