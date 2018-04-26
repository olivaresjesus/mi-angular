import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

import { ResaltarDirective } from '../directives/resaltar.directive';
import { ContarClicksDirective } from '../directives/contar-clicks.directive';
import {Routes,RouterModule} from "@angular/router";
import {DetalleComponent} from "./detalle/detalle.component";
import {LugaresComponent} from "./lugares/lugares.component";
import {ContactoComponent} from "./contacto/contacto.component";
import {CrearComponent} from "./crear/crear.component";
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";

import { LugaresService } from './services/lugares.service';
import { AutorizacionService } from './services/autorizacion.service';
import { MyGuard } from './services/my-guard.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {LinkifystrPipe} from "./pipes/linkifystr.pipe";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const firebaseConfig = {
    apiKey: "AIzaSyA-XXljXVI3U0DEcmqw0ejVj1Yhv3ph5NU",
    authDomain: "platzisquare-1519493935891.firebaseapp.com",
    databaseURL: "https://platzisquare-1519493935891.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "783312817162"
  };
  

const appRoustes: Routes =[
  {path:'', component: LugaresComponent},
  {path:'lugares', component: LugaresComponent},
  {path:'detalle/:id', component: DetalleComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'crear/:id', component: CrearComponent, canActivate:[MyGuard]},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvrEecdWFIRFsK5EIDWT5s0kZHKVX-89Q'
    }),
    RouterModule.forRoot(appRoustes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    BrowserAnimationsModule



  ],
  providers: [LugaresService, AutorizacionService, MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
