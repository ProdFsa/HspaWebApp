import { Injectable } from '@angular/core';
import { User } from '../models/user';
//service has been created with our boiler plate code
//as per meta data this service has been provided in root
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  //add multiple users data without overwrite
  addUser(user: User) {
    let users: any[] = [];
    //if already users rxist then assign to that user
    if (localStorage.getItem('Users')) {
      //use JSON.parse to convert a string to JSON object here
      users = JSON.parse(localStorage.getItem('Users') || '[]');
      //... 3 dots statement here is means that this is a spread operator
      // allows elements of an array to expand, here we are adding a new element
      //to the existing array by using this spread operator (...),
      //this is what we are doing if user already exists
      users = [user, ...users];
    }
    else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
