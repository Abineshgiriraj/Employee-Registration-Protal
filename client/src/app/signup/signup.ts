import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      this.authService.signup(this.signupForm.value).subscribe({
        next: () => {
          this.loading = false;
          // Redirect to login on success
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          if (error.error && error.error.username) {
            this.errorMessage = 'Username already exists.';
          } else if (error.error && error.error.email) {
            this.errorMessage = 'Email already exists.';
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get f() { return this.signupForm.controls; }
}
