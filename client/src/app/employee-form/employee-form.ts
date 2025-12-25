import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  employeeId: number | null = null; // Database ID

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    this.employeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      employment_type: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if we are in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployeeData(this.employeeId);
      }
    });
  }

  loadEmployeeData(id: number) {
    this.loading = true;
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.loading = false;
        this.employeeForm.patchValue(data);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load employee data.';
        console.error(error);
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const employeeData = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Employee updated successfully.';
          setTimeout(() => {
            this.router.navigate(['/admin-dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to update employee. ' + (error.error?.detail || JSON.stringify(error.error));
        }
      });
    } else {
      // Create Mode - Allow both admin and regular users to create
      this.employeeService.createEmployee(employeeData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Employee registered successfully.';
          // If accessed from admin dashboard, redirect back
          const role = this.authService.getRole();
          if (role === 'ADMIN') {
            setTimeout(() => {
              this.router.navigate(['/admin-dashboard']);
            }, 1500);
          } else {
            this.employeeForm.reset();
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to register employee. ' + (error.error?.detail || JSON.stringify(error.error));
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
