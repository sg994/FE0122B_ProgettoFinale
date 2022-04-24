import { Component, OnInit } from '@angular/core';
import { GeneraleService } from 'src/app/generale.service';
import { Clienti } from 'src/app/models/clienti';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Comune } from 'src/app/models/comune';
import { Provincie } from 'src/app/models/provincie';


@Component({
  selector: 'app-mod-cliente',
  templateUrl: './mod-cliente.component.html',
  styleUrls: ['./mod-cliente.component.scss']
})
export class ModClienteComponent implements OnInit {
  form!: FormGroup
  cliente!: Clienti
  id!: number


	province!: Provincie[];
	comuni!: Comune[];
	tipiclienti!: any[];

  constructor( private generaleSrv: GeneraleService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

    cSalva(DatiForm: { value: { indirizzoSedeOperativa: { comune: Comune; }; }; }) {
      console.log(0);
      console.log(DatiForm.value);

      this.comuni.forEach(item => {
        if (item.id == DatiForm.value.indirizzoSedeOperativa.comune.id) {
          DatiForm.value.indirizzoSedeOperativa.comune = item;
        }
      })
      console.log(DatiForm.value);


      this.generaleSrv.SaveCliente(this.id, DatiForm.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['/clienti']);
      });
    }


  ngOnInit(): void {
    console.log('ngOnInit');
		this.route.params.subscribe(params => {
			this.id = +params['id'];
			console.log(this.id);
			this.InizializzaForm();
			this.Carica();
		});
  }

  InizializzaForm() {
		console.log('InizializzaForm');
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
					id: new FormControl ('', Validators.required),
					nome: '',
					provincia: {}
				})
			}),
		});
	}

	Carica() {
		if (this.id !== 0) {
			this.generaleSrv.GetByIdCliente(this.id).subscribe(
				data => {
					console.log(data);
					this.cliente = data;
					this.form.patchValue({
						ragioneSociale: this.cliente.ragioneSociale,
						partitaIva: this.cliente.partitaIva,
						email: this.cliente.email,
						tipoCliente: this.cliente.tipoCliente,
						pec: this.cliente.pec,
						telefono: this.cliente.telefono,
						nomeContatto: this.cliente.nomeContatto,
						cognomeContatto: this.cliente.cognomeContatto,
						telefonoContatto: this.cliente.telefonoContatto,
						emailContatto: this.cliente.emailContatto,
						indirizzoSedeOperativa: {
							via: this.cliente.indirizzoSedeOperativa.via,
							civico: this.cliente.indirizzoSedeOperativa.civico,
							cap: this.cliente.indirizzoSedeOperativa.cap,
							localita: this.cliente.indirizzoSedeOperativa.localita
						},
					})
				}
			)
		}
		this.generaleSrv.GetProv(0).subscribe(res => this.province = res.content)
		this.generaleSrv.GetComuni(0).subscribe(res => this.comuni = res.content)
		this.generaleSrv.GetTipiClienti().subscribe(res => this.tipiclienti = res)
	}
}
