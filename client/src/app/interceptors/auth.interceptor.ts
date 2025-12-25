import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Endpoints that don't require authentication
  private publicEndpoints = [
    '/api/login/',
    '/api/register/',
    '/api/token/refresh/'
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if this is a public endpoint
    const isPublicEndpoint = this.publicEndpoints.some(endpoint => 
      req.url.includes(endpoint)
    );

    // Skip adding token for public endpoints
    if (isPublicEndpoint) {
      return next.handle(req);
    }

    // Get token from localStorage
    const token = localStorage.getItem('access_token');

    // If token exists, add it to the request headers
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    // If no token, proceed with original request (will fail with 401, which is expected)
    return next.handle(req);
  }
}




