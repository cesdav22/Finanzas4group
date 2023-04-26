import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,  
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,  
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule
  ]
})
export class SharedModule { }
