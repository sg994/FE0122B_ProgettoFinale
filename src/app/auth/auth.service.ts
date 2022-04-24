import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase = environment.pathApi;
  private authSubj = new BehaviorSubject<null | Auth>(null);

  user$ = this.authSubj.asObservable();



  constructor(private http: HttpClient, private router:Router) { }

  login(data: { username: string; password: string }) {
    return this.http.post<Auth>(`${this.urlBase}/api/auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        // this.autoLogout(data)
      })
    );
  }

  registration(data:any){
    return this.http.post(`${this.urlBase}/api/auth/signup`, data)
  }

  logout(){
    this.authSubj.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/'])

  }

  getUtenteLog():boolean{
    return localStorage.getItem('user')!= null
      }
}
