import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Fatture } from 'src/app/models/fatture';
import { GeneraleService } from 'src/app/generale.service';

@Component({
  selector: 'app-fatture-clienti',
  templateUrl: './fatture-clienti.component.html',
  styleUrls: ['./fatture-clienti.component.scss']
})
export class FattureClientiComponent implements OnInit {
  idCliente!: number;
	page!: number;
	pageSize!: number;
	response: any;
	fatture!: Fatture[];

  constructor(	private generaleSrv: GeneraleService,
		private router: Router,
		private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
			this.idCliente = +params['id'];
			console.log(this.idCliente);
			this.Carica();
		});
  }
  Carica() {
		if (this.idCliente) {
			this.generaleSrv.GetByCliente(this.idCliente, 0).subscribe(c => {
				console.log(c);
				this.response = c;
				this.fatture = c.content;
			});
		}
		else {
			this.generaleSrv.GetAll(0).subscribe(c => {
				console.log(c);
				this.response = c;
				this.fatture = c.content;
			});
		}
	}

	CambiaPagina(p: number) {
		if (this.idCliente) {
			this.generaleSrv.GetByCliente(this.idCliente, p).subscribe(c => {
				console.log(c);
				this.response = c;
				this.fatture = c.content;
			});
		}
		else {
			this.generaleSrv.GetAll(p).subscribe(c => {
				console.log(c);
				this.response = c;
				this.fatture = c.content;
			});
		}
	}
	counter(i: number) {
		return new Array(i);
	}

	confirmDelete(name: number, id: number, i: number) {
		if (confirm("Are you sure to delete " + name)) {
			console.log("Implement delete functionality here");
			this.generaleSrv.Delete(id).subscribe(c => {
				console.log(c);
				this.fatture.splice(i, 1);
			});
		}
	}

}



