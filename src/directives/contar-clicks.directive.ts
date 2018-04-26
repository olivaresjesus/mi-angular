import {Directive, HostListener, HostBinding} from "@angular/core";
@Directive({
	selector: 'li[contar-clicks]'	
}) // la "li"  antes de los corchetes es para indicar que solo va a funcionar con los hipervinculos.
/*
@Directive({
	selector: 'a[contar-clicks]'	
}) // la "a"  antes de los corchetes es para indicar que solo va a funcionar con los hipervinculos.
*/

export class ContarClicksDirective{
	clickN = 0;

	@HostBinding('style.opacity') opacity: number = .1;

	@HostListener('click', ['$event.target']) onclick(btn){ //recibe tres para metros: el evento, un arreglo y el evento a disparar
		console.log('a', btn, "numero de clicks;", this.clickN++);
		this.opacity += .1;
	} 
}