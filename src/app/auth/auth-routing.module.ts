import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { AuthModule } from './auth.module';


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],

})
export class AuthRoutingModule { }
