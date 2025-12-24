import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard';
import { EmployeeForm } from '../employee-form/employee-form';

const routes: Routes = [
  { path: '', component: AdminDashboard },
  { path: 'edit/:id', component: EmployeeForm },
  { path: 'register', component: EmployeeForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
