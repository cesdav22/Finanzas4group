import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users.service";
import {User} from "../../interfaces/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // password2!: string;
  showPassword: boolean = false;

  loading = false;
  userData!: User;
  newUser!: User;


  registerForm: FormGroup = this.formBuilder.group({
    email: ['', {validators: [Validators.required], updatedOn: 'change'}],
    password: ['', {validators: [Validators.required], updatedOn: 'change'}],
    name: ['', {validators: [Validators.required], updatedOn: 'change'}],
    first_surname: ['', {validators: [Validators.required], updatedOn: 'change'}],
    second_surname: ['', {validators: [Validators.required], updatedOn: 'change'}],
    age: ['', {validators: [Validators.required], updatedOn: 'change'}],
    address: ['', {validators: [Validators.required], updatedOn: 'change'}],
    number_telephone: ['', {validators: [Validators.required], updatedOn: 'change'}],
    nationality: ['', {validators: [Validators.required], updatedOn: 'change'}],
    bonus_good_payer: [''],
  })



  constructor(private loginService: UsersService, private formBuilder: FormBuilder,private router: Router) {

    this.userData = {} as User;
    this.newUser={}as User;

  }

  ngOnInit(): void {
  }


  get email() {
    return this.registerForm.get('email');
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
  isChecked: boolean = false;
  toggleChecked() {
    this.isChecked = !this.isChecked;

  }
  addUser(){
    this.newUser.id = 0;
    this.newUser.email = this.registerForm.value.email;
    this.newUser.password = this.registerForm.value.password;
    this.newUser.name = this.registerForm.value.name;
    this.newUser.first_surname = this.registerForm.value.first_surname;
    this.newUser.second_surname = this.registerForm.value.second_surname;
    this.newUser.age = this.registerForm.value.age;
    this.newUser.address = this.registerForm.value.address;
    this.newUser.number_telephone = this.registerForm.value.number_telephone;
    this.newUser.nationality = this.registerForm.value.nationality;
    this.newUser.bonus_good_payer = this.isChecked;

    //data missing
    // this.newUser.email = this.registerForm.value.email;
    // this.newUser.password = this.registerForm.value.password;

    this.loginService.create(this.newUser).subscribe(response =>{})

    this.registerForm.reset();

    this.router.navigate(['login']);
  }

}












