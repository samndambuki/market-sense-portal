import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
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
  showPassword = false;
  showConfirmPassword = false;

  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required],
    },
    { validators: [this.passwordsMismatchValidator] },
  );

  constructor(private userService: UserService) {}

  isSubmitting = false;

  get passwordValue(): string {
    return this.registerForm.controls['password'].value ?? '';
  }

  get passwordChecks(): { label: string; met: boolean }[] {
    const v = this.passwordValue;
    return [
      { label: 'At least 6 characters', met: v.length >= 6 },
      { label: 'One uppercase letter', met: /[A-Z]/.test(v) },
      { label: 'One number', met: /\d/.test(v) },
      { label: 'One symbol', met: /[^A-Za-z0-9]/.test(v) },
    ];
  }

  get passwordStrength(): number {
    return this.passwordChecks.filter((c) => c.met).length;
  }

  get strengthLabel(): string {
    return ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][
      this.passwordStrength
    ];
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

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
        this.isSubmitting = false;
        console.log('response', response);
        alert('user created successfully');
        console.log('user created');
        this.registerForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error(error);
      },
    });
  }

  passwordsMismatchValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
