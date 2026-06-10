import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['', Validators.required],
  });

  constructor(private userService: UserService) {}

  register() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    console.log(this.registerForm.errors);

    console.log('clicked register button');
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const password = this.registerForm.value.password!;
    const confirmPassword = this.registerForm.value.confirmPassword!;
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    const user = {
      fullName: this.registerForm.value.fullName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      role: this.registerForm.value.role!,
    };

    this.userService.register(user).subscribe({
      next: (response) => {
        console.log('response', response);
        alert('user created');
        this.registerForm.reset();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
