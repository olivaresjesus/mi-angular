import  {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth/auth";
import {Router}  from "@angular/router";
import * as firebase from 'firebase/app';

@Injectable()
export class AutorizacionService{

	constructor(private angularFireAuth: AngularFireAuth, private router:Router){ //esta libreria permite hacer todas las operaciones de autenticaion con firebase
		this.isLogged();
	}

	public facebookLogin(){
		this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
			.then( (result)=>{
				alert('User log with Facebook!');
				console.log(result);
				this.router.navigate(['lugares']);
			}).catch((error)=>{
				console.log(error);
			});
	}

	public login = (email, password) =>{
		console.log("Metodo de login");
		this.angularFireAuth.auth.signInWithEmailAndPassword(email,password)
			.then( (response) => {
				alert('Usuario Loggeado con éxito!');
				console.log(response);
				this.router.navigate(['lugares']);
			})
			.catch((error)=>{
				alert('Un error ha ocurrido');
				console.log(error);
			})
	}

	public registro = (email, password) =>{

		this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
			.then( (response) => {
				alert('Usuario Registrado con éxito!');
				console.log(response);
			})
			.catch((error)=>{
				alert('Un error ha ocurrido');
				console.log(error);
			})
	}

	public isLogged(){
		return this.angularFireAuth.authState;
	}

	public logout(){
		this.angularFireAuth.auth.signOut();
		alert("Session cerrada");		
		this.router.navigate(['lugares']);
	}
}
