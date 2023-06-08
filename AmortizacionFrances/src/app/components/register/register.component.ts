import { Component, OnInit } from '@angular/core';
import {UsersService} from "../dashboard/services/users.service";
import {User} from "../../interfaces/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  userData!: User;
  newUser!: User;


  registerForm: FormGroup = this.formBuilder.group({
    username: ['', {validators: [Validators.required], updatedOn: 'change'}],
    password: ['', {validators: [Validators.required], updatedOn: 'change'}],
  })



  constructor(private loginService: UsersService, private formBuilder: FormBuilder,private router: Router) {

    this.userData = {} as User;
    this.newUser={}as User;

  }

  ngOnInit(): void {
  }


  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);

  }

  addUser(){
    this.newUser.id=0;
    this.newUser.username = this.registerForm.value.username;
    this.newUser.password = this.registerForm.value.password;

    this.loginService.create(this.newUser).subscribe(response =>{})

    this.registerForm.reset();

    this.router.navigate(['login']);
  }

}












