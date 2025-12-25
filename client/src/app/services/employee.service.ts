import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8000/api/employees/';

  constructor(private http: HttpClient) { }

  // AuthInterceptor automatically adds Authorization header to all requests
  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}list/`);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create/`, employeeData);
  }

  updateEmployee(id: number, employeeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, employeeData);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  softDeleteEmployee(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/disable/`, {});
  }

  getInactiveEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}inactive/`);
  }

  restoreEmployee(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/restore/`, {});
  }
}
