import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registreForm = new FormGroup({
    //fullName
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),

    //email
    email: new FormControl('', [Validators.required, Validators.email]),

    //password
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),

    //role
    role: new FormControl('ANALYST', [Validators.required]),
  });

  register() {}
}
