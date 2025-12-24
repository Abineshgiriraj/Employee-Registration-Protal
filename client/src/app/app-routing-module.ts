import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { userGuard } from './guards/user-guard';
import { adminGuard } from './guards/admin-guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { 
    path: 'employee-form', 
    loadChildren: () => import('./employee-form/employee-form-module').then(m => m.EmployeeFormModule),
    canActivate: [userGuard]
  },
  { 
    path: 'admin-dashboard', 
    loadChildren: () => import('./admin-dashboard/admin-dashboard-module').then(m => m.AdminDashboardModule),
    canActivate: [adminGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
