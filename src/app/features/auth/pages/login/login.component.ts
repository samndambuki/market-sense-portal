import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  showPassword = false;
  isSubmitting = false;
  loginError = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    // Hide the sign-in error as soon as the user starts correcting it
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) this.loginError = '';
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.loginError = '';

    const credentials = this.loginForm.getRawValue();

    this.userService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
        this.isSubmitting = false;
        this.notificationService.showSuccess('Welcome back!');
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login error', error);
        this.isSubmitting = false;

        if (error.status === 401) {
          this.loginError =
            'That email and password don’t match. Check them and try again.';
        } else if (error.status === 0) {
          this.loginError =
            'Can’t reach the server. Check your internet connection and try again.';
        } else {
          this.loginError =
            'Something went wrong on our side. Try again in a moment.';
        }
      },
    });
  }
}
