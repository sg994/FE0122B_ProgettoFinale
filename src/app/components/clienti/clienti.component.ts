import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GeneraleService } from 'src/app/generale.service';
import { Clienti } from 'src/app/models/clienti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss'],
})
export class ClientiComponent implements OnInit {
  form!: FormGroup;
  page!: number;
  pageSize!: number;
  response: any;
  arrClienti!: Clienti[];
  p!:number

  constructor(
    private generaleSrv: GeneraleService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.Carica();
    this.InizializzaForm();
  }
  Carica() {
    this.generaleSrv.GetClienti(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.arrClienti = c.content;
    });
  }
  InizializzaForm() {
    this.form = this.fb.group({
      Cerca: new FormControl(),
    });
  }
  CambiaPagina(p: number) {
    this.generaleSrv.GetClienti(p).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.arrClienti = c.content;
    });
  }
  counter(i: number) {
    return new Array(i);
  }

  confirmDelete(name: string, id: number, i: number) {
    if (confirm('Are you sure to delete ' + name)) {
      console.log('Implement delete functionality here');
      this.generaleSrv.Delete(id).subscribe((c) => {
        console.log(c);
        this.arrClienti.splice(i, 1);
      });
    }
  }
}
