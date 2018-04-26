import {Directive, OnInit, ElementRef, Renderer2, Input} from "@angular/core";
//LO PUEDO IMPORTAR DE LA MANERA DE ARRIBA Ó ESCRIBIENDO LAS DOS LINEAS DE ABAJO YA QUE LOS CUATRO VIENEN DE "@angular/core"
//import {Directive} from "@angular/core";
//import {OnInit} from "@angular/core";
//import {ElementRef} from "@angular/core";
//import {Renderer2} from "@angular/core";

@Directive({
	selector: '[resaltar]'
})

export class ResaltarDirective implements OnInit{ //si implemento OnInit Obligatoriamente lo tengo que implementar dentro de la clase.
	constructor(private elRef: ElementRef, private renderer: Renderer2){

	}
	@Input('resaltar') plan : string = '';
	ngOnInit(){
		if(this.plan === 'pagado'){
			this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'black'); // Recibe 3 parametros , el elemento nativo, el atributo y el valor a aplicar
			this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
		}

	}
}