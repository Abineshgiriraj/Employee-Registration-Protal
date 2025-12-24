import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeFormRoutingModule } from './employee-form-routing-module';
import { EmployeeForm } from './employee-form';


@NgModule({
  declarations: [
    EmployeeForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeFormRoutingModule
  ],
  exports: [
    EmployeeForm
  ]
})
export class EmployeeFormModule { }
