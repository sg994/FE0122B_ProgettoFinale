import { Component, OnInit } from '@angular/core';
import { GeneraleService } from 'src/app/generale.service';
import { Fatture } from 'src/app/models/fatture';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent implements OnInit {
  idCliente!: number;
  page!: number;
  pageSize!: number;
  response: any;
  fatture!: Fatture[];

  constructor(
    private generaleSrv: GeneraleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idCliente = +params['id'];
      console.log(this.idCliente);
      this.Carica();
    });
  }

  Carica() {
    if (this.idCliente) {
      this.generaleSrv.GetByCliente(this.idCliente, 0).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.generaleSrv.GetAll(0).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }

  CambiaPagina(p: number) {
    if (this.idCliente) {
      this.generaleSrv.GetByCliente(this.idCliente, p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.generaleSrv.GetAll(p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  cancella(name: number, id: number, i: number) {
		if (confirm("cancellare fattura " + name)) {
			console.log("Implement delete functionality here");
			this.generaleSrv.cancellaFattura(id).subscribe(c => {
				console.log(c);
				this.fatture.splice(i, 1);
			});
		}
	}


}

