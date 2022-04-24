import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { switchMap, take } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  tenant: string;

  constructor(private authSrv: AuthService) {
    this.token = environment.adminToken;
    this.tenant = environment.adminTenant;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(take(1),switchMap(user=>{

      const newReq = request.clone({
        headers: request.headers.set('Authorization',`Bearer ` + this.token).set('X-TENANT-ID', this.tenant)
      })

      return next.handle(newReq)
    }));
  }
}

