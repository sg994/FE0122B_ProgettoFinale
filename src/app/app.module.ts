import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { FattureComponent } from './components/fatture/fatture.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { RegDetClientiComponent } from './components/clienti/reg-det-clienti/reg-det-clienti.component';
import { ModClienteComponent } from './components/clienti/mod-cliente/mod-cliente.component';
import { DettaglioFattureComponent } from './components/fatture/dettaglio-fatture/dettaglio-fatture.component';
import { FattureClientiComponent } from './components/clienti/fatture-clienti/fatture-clienti/fatture-clienti.component';


const route: Route[] = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "utenti",
    component: UtentiComponent, canActivate:[AuthGuard]
  },
  {
    path: "fatture",
    component: FattureComponent, canActivate:[AuthGuard]
  },
  {
    path: "clienti",
    component: ClientiComponent, canActivate:[AuthGuard]
  },
  {
    path: "regClienti",
    component: RegDetClientiComponent, canActivate:[AuthGuard]
  },
  {
    path: "modClienti/:id",
    component: ModClienteComponent, canActivate:[AuthGuard]
  },
  {
    path: "detFatture/:id",
    component: DettaglioFattureComponent, canActivate:[AuthGuard]
  },
  { path: 'detFatture/:id/:idCliente', component: DettaglioFattureComponent, canActivate: [AuthGuard] },
  {path: 'fatturaCliente/:id', component: FattureClientiComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UtentiComponent,
    FattureComponent,
    ClientiComponent,
    RegDetClientiComponent,
    ModClienteComponent,
    DettaglioFattureComponent,
    FattureClientiComponent
    // LoginComponent,
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    RouterModule.forRoot(route),
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
