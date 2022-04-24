import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Auth } from 'src/app/models/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form! : FormGroup;
  user! : Auth

  constructor(private authSrv: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.InizializzaForm()
  }
  carica(){
    console.log(this.form.value);
    this.user = this.form.value
    this.authSrv.registration(this.user).toPromise();
    this.router.navigate(['/login'])
  }



  InizializzaForm() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      roles: new FormControl(),
    });
    this.form.controls['username'].setValue('');
    this.form.controls['password'].setValue('');
  }

}
