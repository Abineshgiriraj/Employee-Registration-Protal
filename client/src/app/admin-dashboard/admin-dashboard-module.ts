import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing-module';
import { AdminDashboard } from './admin-dashboard';
import { EmployeeFormModule } from '../employee-form/employee-form-module';


@NgModule({
  declarations: [
    AdminDashboard
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    EmployeeFormModule
  ]
})
export class AdminDashboardModule { }
