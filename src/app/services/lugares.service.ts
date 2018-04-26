import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database/database";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()

export class LugaresService{
    API_ENDPOINT ="https://platzisquare-1519493935891.firebaseio.com";
    lugares:any = [
    { id: 1,      edad:18,      nombre:"Alejandro",      active: false,      cercania: 1,      distancia: 10,       plan: 'pagado'  ,  descripcion: "descripcion1"  },
    { id: 2,      edad:25,      nombre:"María",          active: false,      cercania: 1,      distancia: 1.8,      plan: 'gratuito',  descripcion: "descripcion2"  },
    { id: 3,      edad:14,      nombre:"Laura",          active: true,       cercania: 2,      distancia: 5,        plan: 'pagado'  ,  descripcion: "descripcion3"  },
    { id: 4,      edad:18,      nombre:"jesus",          active: false,      cercania: 3,      distancia: 10,       plan: 'gratuito',  descripcion: "descripcion4"  },
    { id: 5,      edad:25,      nombre:"ernesto",        active: false,      cercania: 3,      distancia: 35,       plan: 'pagado'  ,  descripcion: "descripcion5"  },
    { id: 6,      edad:14,      nombre:"ana",            active: true,       cercania: 3,      distancia: 120,      plan: 'pagado'  ,  descripcion: "descriocion6"  }
  ];

  constructor(private afDB:AngularFireDatabase, private http: Http){

  }

   public getLugares(){
      //return this.lugares;
   	  //return this.afDB.list('lugares/');
      return this.http.get(this.API_ENDPOINT+"/.json").map((resultado) => {  //si no me agarra el metodo "map" hay que agregar la siguiente importación "import 'rxjs/add/operator/map';"
        const data = resultado.json().lugares;
        return data;
      });
   }

   public buscarLugar(id){
		return this.lugares.filter( (lugar)  => {
			return lugar.id == id
		})[0] || null ;
	}

  public guardarLugar(lugar){
    console.log(lugar);
    //this.afDB.database.ref('lugares/1').set(lugar);
    //this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    const headers = new Headers({"Content-Type":"application/json"});
    //headers.append('Content-Type', 'application/json');
    //const options = new RequestOptions({headers: headers});
    return this.http.post(this.API_ENDPOINT+"/lugares.json", lugar, {headers:headers});
  }

  public editarLugar(lugar){
    console.log(lugar);
    //this.afDB.database.ref('lugares/1').set(lugar);
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
  }

  public obtenerGeoData(direccion){
    //http://maps.google.com/maps/api/geocode/json?address=78-43+diagonal+70f,+Bogota,Colombia
    return this.http.get("http://maps.google.com/maps/api/geocode/json?address="+direccion);
  }

  public getLugar(id){
    return this.afDB.object('lugares/'+id);
  }
}