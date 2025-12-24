import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  employees: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  selectedEmployee: any = null;
  showViewModal: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.errorMessage = '';
    console.log('🔄 Starting to load employees...');
    
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('✅ API Response received:', data);
        console.log('📊 Response type:', typeof data);
        console.log('📊 Is Array?', Array.isArray(data));
        
        // Handle different response structures
        let employeesData = data;
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // If response is wrapped in an object, try common keys
          employeesData = data.data || data.results || data.employees || [];
        }
        
        this.employees = Array.isArray(employeesData) ? employeesData : [];
        this.loading = false;
        
        console.log('👥 Employees assigned:', this.employees.length);
        console.log('📋 Employees array:', this.employees);
        console.log('⏸️ Loading set to:', this.loading);
        
        // Force change detection
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error loading employees:', error);
        this.errorMessage = 'Failed to load employees. ' + (error.error?.detail || error.message);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedEmployee = null;
  }

  editEmployee(id: number) {
    this.router.navigate(['/admin-dashboard/edit', id]);
  }

  registerNewEmployee() {
    this.router.navigate(['/admin-dashboard/register']);
  }

  softDeleteEmployee(id: number) {
    if (confirm('Are you sure you want to soft delete this employee? The record will be hidden but not permanently deleted.')) {
      this.employeeService.softDeleteEmployee(id).subscribe({
        next: () => {
          this.successMessage = 'Employee soft deleted successfully.';
          // Remove from list or reload
          this.loadEmployees();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete employee: ' + (error.error?.detail || error.message);
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  trackByEmployeeId(index: number, employee: any): any {
    return employee.id || employee.employee_id || index;
  }
}
