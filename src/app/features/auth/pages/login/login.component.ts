import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.userService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
        alert('Login successful');
        this.router.navigate(['/markets']);
      },
      error: (error) => {
        console.error('Login error', error);

        alert(error.error?.message || 'Unable to log in. Please try again');
      },
    });
  }
}
