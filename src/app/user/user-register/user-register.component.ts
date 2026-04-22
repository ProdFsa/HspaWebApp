import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';
// import Swal from 'sweetalert2';
import { Sweetalert2Service } from '../../services/sweetalert2.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {


  //FormGroup is class and organize related formcontrols in a form, we can say just wrapper around
  //collection multiple form controls and it helps to track the values and validation status of each
  //control added under this class

  registrationForm!: FormGroup;
  user!: User;
  userSubmitted!: boolean;
  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private sweetAlert2: Sweetalert2Service) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    //within this we can instanciated registrationForm with new FormGroup, formgroup takes input as javascript object
    //we added inbuilt validation attributes in tdf in html only,
    //but in reactive approach we do not add validation attributes in html template
    //instead angular provides validators in component only as an argument
    //where PK is default value    userName: new FormControl('PK', Validators.required)
    // across the fielss validation so this is called crossfield validation
    //finally we can implement cross field validation using custom validators
    //we do not have any inbuilt validators in angular to compare two fields
    // we need to define our custom validator, and custom validator is nothing but a function
    //that shoulf have an argument of any control type and it should return a validator, this is using FormGroup
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl('', Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required),
    //   mobile: new FormControl('', [Validators.required, Validators.maxLength(10)])
    // }, this.passwordMatchingValidator);
    //   this.registrationForm.controls['userName'].setValue('default value');// rf for synchronous nature
    this.createRegisrearionForm();
  }
  createRegisrearionForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchingValidator });
  }
  //--------------------------
  //FormBuilder : helpewr class provided by angularthat makes it easy to build reactive forms
  //create a registrationform method, adding form level validators is little different
  //need to add jvascript object here


  //--------------------------------------

  //custom validator function for cross field validation, and someone calling this function
  // should be able to pass control in this, here we are use at formgroup level
  //formgroup as a type and second it should return validator
  //validators should either return null if condition is valid, or it should return javascript object
  //with key and value if condition is not valid

  // passwordMatchingValidator(fg: FormGroup): Validators | null {
  //   return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null :
  //     { notmatched: true }

  // }

  // passwordMatchingValidatior(fg: FormGroup): { [key: string]: boolean } | null {
  //   return fg.get('password')?.value === fg.get('confirmPassword')?.value
  //     ? null
  //     : { notmatched: true };
  // }

  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null : { notmatched: true };
    //   //if both are true return null else return javascript object
    //   // now we can pass this function as an argument and anguylar automatically
    //   //pass formgroup in this function
    //   //when inbuilt validators do not fullfill our requirements then we can go with
    //   //custom validators
  }

  //angular provides getter method that we can use in componentand reduces validation error 
  //logic in html template, these arespecial kind of functions prefic with get and 
  //restriction is we can't have argument within it and it must return some value
  //get methods for all of formcontrols
  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    //storing data in application->local storage
    //validate form at onsubmit
    if (this.registrationForm.valid) {
      // this.user = Object.assign(this.user, this.registrationForm.value); // this is not correct approach i rwbps
      //this.user is json object, if we want convert this into string then use json.stringfy method
      //to store and retrive in our application
      //convert this json object to string  we can use JSON.stringfy
      //this is single user data storage in the browser, if add one more this will 
      //overwrite
      // localStorage.setItem('Users', JSON.stringify(this.user));
      //this.userService.addUser(this.user);
      this.userService.addUser(this.userData());
      //if we want the new user added the last of the array then
      this.registrationForm.reset();
      //after saving the data if we want makes values false like all error msg's then
      this.userSubmitted = false;
      //sweetalert2 msg notifications, wrap sweetalert2 in service 
      this.sweetAlert2.success('Congrats, you are successfully registered');
    } else {
      this.sweetAlert2.error('Kindly provide the required fields');
    }
  }
  //adding a new method to map the form values in our domain model

  //add multiple users data without overwrite
  userData(): User {
    // also intialize the data here only
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
      //this.userName is getter method in the below one
    }

  }


  // addUser(user: any) {
  //   let users: any[] = [];
  //   //if already users rxist then assign to that user
  //   if (localStorage.getItem('Users')) {
  //     //use JSON.parse to convert a string to JSON object here
  //     users = JSON.parse(localStorage.getItem('Users') || '[]');
  //     //... 3 dots statement here is means that this is a spread operator
  //     // allows elements of an array to expand, here we are adding a new element
  //     //to the existing array by using this spread operator (...),
  //     //this is what we are doing if user already exists
  //     users = [user, ...users];
  //   }
  //   else {
  //     users = [user];
  //   }
  //   localStorage.setItem('Users', JSON.stringify(users));
  // }



}
