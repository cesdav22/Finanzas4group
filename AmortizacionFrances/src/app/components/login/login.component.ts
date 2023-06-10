import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import {UsersService} from "../dashboard/services/users.service";
import {User} from "../../interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  loading = false;
  newUser!: User;
  currentUser: User;
  users: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private formBuilder: FormBuilder, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private loginService : UsersService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.newUser={}as User;
    this.currentUser={}as User;

    this.dataSource = new MatTableDataSource<any>();
  }


  loginForm: FormGroup = this.formBuilder.group({
    email: ['', { validators: [Validators.required], updateOn: 'change'}],
    password: ['', {validators: [Validators.required ], updateOn: 'change'}]
  })

  ngOnInit(): void {
    this.getAllUsers()
    // console.log(this.users.find(this.users) => users.id === usuario);

  }
  ingresar() {
    console.log(this.form);
    const email = this.form.value.email;
    const password = this.form.value.password;

    // if (username == 'cesarFi' && password == 'admin123') {
    //   this.fakeLoading();
    // } else {
    //   this.error();
    //   this.form.reset();
    // }
  //test

    // if (username == this.users.find((username) => this.newUser.username == username && password == this.users.find((password) => this.newUser.password == password))) {
    //   this.fakeLoading();
    // } else {
    //   this.error();
    //   this.form.reset();
    // }

    const user = this.users.find(
        (u: User) => u.email === email && u.password === password
    );

    if (user) {
      this.fakeLoading();
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Credenciales inválidas');
      this.form.reset();
    }

  }
  error() {
    this._snackBar.open('Usuario o contraseña son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);

  }

  getUsers() {
    this.loginService.getAll().subscribe((response: any) => {
      this.newUser = response.find((a:any) => {
        this.currentUser = a;
        return a.email === this.form.value.email &&
            a.password === this.form.value.password
      })
    });
  }

  getAllUsers() {
    this.loginService.getAll().subscribe((response: any) => {
      this.users = response;
    });
  }




}
