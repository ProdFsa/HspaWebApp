import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(private authService: AuthService,
    private sweetalert2Service: Sweetalert2Service,
    private router: Router
  ) {

  }
  //added login functionality
  onLogin(loginForm: NgForm) {
    //for testing purpose
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      //stored the username as token here in our local storage
      localStorage.setItem('token', token.userName);
      this.sweetalert2Service.success("Login sucessfull");
      //once login then page redirect to the base url  (navbar/sidebar page)
      this.router.navigate(['/']);
    }
    else {
      this.sweetalert2Service.error("User Id or Password is wrong");
    }
  }
  //once login is successful then login button should disappear and
  //  logout button should display inplace
  //added logout functionality in nav-bar
  //once login is sucessful then navigate to nav-bar/side-bar page

  //adding drop downs for logic functionality for performing user different operations
  //using ngx-bootstrap insteda of jquery we can use this package and which is compatible
  //with bootstrap for angular


}
