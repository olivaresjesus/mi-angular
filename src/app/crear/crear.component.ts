import { Component } from '@angular/core';
import { LugaresService } from "../services/lugares.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
	lugar:any = {};
	id:any = null;

	constructor(private lugaresService: LugaresService, private route: ActivatedRoute){
		this.id = this.route.snapshot.params['id'];
		console.log(this.id);
		if(this.id != 'new'){
			this.lugaresService.getLugar(this.id)
			.valueChanges().subscribe( (lugar) => {   //aui en la funcion "getLugar" del archivo "lugares.service.ts" para poder usar "suscribe"
			 //tube que quitarle ".database.ref" y agregar object ya que no puede suscribirse a  una referencia pero si a un objeto
				this.lugar = lugar;
			});
		}
	}

	guargarLugar(){
		var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
		this.lugaresService.obtenerGeoData(direccion).subscribe((result) =>{
			//debugger;
			this.lugar.lat = result.json().results[0].geometry.location.lat;
			this.lugar.lng = result.json().results[0].geometry.location.lng;
			this.lugar.id = Date.now();

			if (this.id != "new") {
				this.lugaresService.editarLugar(this.lugar);
				alert("Negocio Editado con Éxito!");
			}else{
				this.lugar.id = Date.now();
				this.lugaresService.guardarLugar(this.lugar);
				alert("Negocio Guardado con Éxito!");
			}

			this.lugaresService.guardarLugar(this.lugar);
			alert("Negocio Guardado con Éxitos");
			this.lugar = {};			
		});
	}
}
