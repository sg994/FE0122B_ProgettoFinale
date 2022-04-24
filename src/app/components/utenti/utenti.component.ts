import { Component, OnInit } from '@angular/core';
import { GeneraleService } from 'src/app/generale.service';
import { Auth } from 'src/app/models/auth';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss'],
})
export class UtentiComponent implements OnInit {
  arrUser!: Auth[];

  response!: any;
  page!: number;
  pageSize!: number;

  constructor(private generaleSrv: GeneraleService) {}

  ngOnInit() {
    this.Carica();
  }

  Carica() {
    this.generaleSrv.GetUtenti(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.arrUser = c.content;
    });
  }

  CambiaPagina(p: number) {
    this.generaleSrv.GetUtenti(p).subscribe((res) => {
      this.response = res;
      this.arrUser = res.content;
    });
  }

  counter(i: number) {
    return new Array(i);
  }
}
