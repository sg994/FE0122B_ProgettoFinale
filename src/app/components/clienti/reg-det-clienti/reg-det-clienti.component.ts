import { Component, OnInit } from '@angular/core';
import { GeneraleService } from 'src/app/generale.service';
import { Clienti } from 'src/app/models/clienti';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Comune } from 'src/app/models/comune';
import { Provincie } from 'src/app/models/provincie';

@Component({
  selector: 'app-reg-det-clienti',
  templateUrl: './reg-det-clienti.component.html',
  styleUrls: ['./reg-det-clienti.component.scss'],
})
export class RegDetClientiComponent implements OnInit {
  form!: FormGroup;
  user!: Clienti;
  comune!: Comune[];
  comuni!: any;
  provincia!: Provincie[];
  province!: any;

  constructor(
    private generaleSrv: GeneraleService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.InizializzaForm();

  }

  regCliente() {
    this.user = this.form.value;
    this.generaleSrv.regClienti(this.user).toPromise();
    this.router.navigate(['/clienti']);
    console.log(this.form.value);
  }

  carComuni(c:number) {
     this.generaleSrv.caricaComuni(c).subscribe((res) => {
      this.comune = res.content;
    });
  }

  carProvince(p:number) {
     this.generaleSrv.caricaProvince(p).subscribe((res) => {
      this.provincia = res.content;
    });
  }
  InizializzaForm() {
    this.form = this.fb.group({
      ragioneSociale: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tipoCliente: new FormControl('', [Validators.required]),
      pec: new FormControl(''),
      telefono: new FormControl(''),
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      telefonoContatto: new FormControl(''),
      emailContatto: new FormControl('', [Validators.required]),
      indirizzoSedeOperativa: this.fb.group({
        via: new FormControl(''),
        civico: new FormControl(''),
        cap: new FormControl(''),
        localita: new FormControl(''),
        comune: this.fb.group({
          id: new FormControl('', Validators.required),
          nome: '',
          provincia: {},
        }),
      }),
    });
  }
}
