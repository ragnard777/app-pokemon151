import { Injectable } from '@angular/core';
import { CuPokemonService } from '../caso-de-uso/cu-pokemon.service';
import {Pokemon} from '../models/Pokemon';
import { Observable } from 'rxjs';
import { UtilsService } from '../shared/utils.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _cuPokemon:CuPokemonService, private utils:UtilsService) { }

  validarPokemones():Observable<any>{
    return new Observable((observer) => {
      let respuesta: any;
      this._cuPokemon.obtenerPokemones().subscribe(resp => {
          let arreglado = this.utils.ordenarArray(resp.results);
          respuesta = { estado: "ok", pokemones:  arreglado, paginacion: resp.results.length };
          console.log("respuesta ", respuesta);
          observer.next(respuesta);
          observer.complete();
    });
  })
  }

}
