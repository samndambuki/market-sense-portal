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

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password;

    this.userService.login(email).subscribe({
      next: (users) => {
        if (users.length === 0) {
          alert('Invalid email or password');
          return;
        }

        const user = users[0];

        if (user.password !== password) {
          alert('Invalid email or password');
          return;
        }

        alert('login successful');

        this.router.navigate(['/markets']);
      },
      error: (error) => {
        console.error(error);
        alert(error);
      },
    });
  }
}
