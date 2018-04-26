import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,state,style,transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations: [
    trigger('contenedorAnimable',[
            state('inicial', style({ opacity: 0, backgroundColor: 'green',  transform: 'rotate3d(0,0,0,0deg)' })),            
            state('final', style({   opacity: 1,   backgroundColor: 'yellow',   transform: 'rotate3d(5,10,20,30deg)' })),
            transition('inicial => final'  , animate(1000)),
            transition('final   => inicial', animate(500))
      ])
  ]
})
export class LugaresComponent {

  title = 'Niggas';
  lat:number = 10.478828;
  lng:number = -66.8080147;
  lugares   = null;
  state     = 'inicial';

  animar(){
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
  animacionInicia(e){
    console.log("Iniciado");
    console.log(e);
  }

  animacionTermina(e){
    console.log("Terminado");
    console.log(e);
  }

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute){

  	lugaresService.getLugares()
  		.subscribe((lugares) =>{
  			//debugger;
        this.lugares = lugares;
        //this.lugares = lugares.json(); si no usamos el .map tenemos que agregarle el metodo ".json()"

        var me = this;
        me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
        this.state = "final";
  		}, error => {
        console.log(error);
        alert("Tenemos algo de Dificultades, Disculpe las Molestias  " + error.statusText); 
      })
    //this.lugares = lugaresService.getLugares();
  }
}
