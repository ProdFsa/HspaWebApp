import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Sweetalert2Service } from '../services/sweetalert2.service';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, BsDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser!: string;
  constructor(private sweetAlert2: Sweetalert2Service) { }

  ngOnInit() {
  }

  loggedIn() {
    //once login stored token in local storage
    this.loggedinUser = localStorage.getItem('token')!;

    return this.loggedinUser;
    // return localStorage.getItem('token');
  }

  onLogout() {
    //once logout removed token from local storage
    localStorage.removeItem('token');
    this.sweetAlert2.success("You are logged out");

  }

}
