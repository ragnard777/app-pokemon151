import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, AfterViewInit {

  pokemonesSubscription: Subscription;
  paginacion;
  displayedColumns: string[] = ['name', 'url','eliminar']
  datasource: any;
  selection = new SelectionModel<any>(true, []);
  resetPokemon = [];
  datasourceCopia: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.listarNombresDePokemones();
  }


  listarNombresDePokemones() {
    this.pokemonesSubscription = this._pokemonService.validarPokemones().subscribe(resp => {
      this.inicializacionDeVariables(resp);
      this.setearPaginator();
    });
  }

  eliminarPokemon(nombre) {
    this.datasource.data.forEach((element,i) => {
      if(element.name.indexOf(nombre) !== -1){
        this.datasource.data.splice(i,1);
        console.log("this.datasource.data eliminado", this.datasource.data);
        this.datasource = new MatTableDataSource<Element>(this.datasource.data);
        setTimeout(() => {
          this.datasource.paginator = this.paginator;
        });
      }
    });
 }

 buscarPokemon(nombrePokemon){
  if(nombrePokemon !==""){
    let result = this.datasource.data.filter(item => item.name.indexOf(nombrePokemon) !== -1);
    this.datasource = new MatTableDataSource<Element>(result);
    setTimeout(() => {
      this.datasource.paginator = this.paginator;
    });
  }else{
    this.datasource = new MatTableDataSource<Element>(this.resetPokemon);
    setTimeout(() => {
      this.datasource.paginator = this.paginator;
    });
  }
 }

  ngAfterViewInit(): void {
    this.setearPaginator();
  }

  setearPaginator() {
    this.datasource.paginator = this.paginator;
  }

  inicializacionDeVariables(resp){
    this.paginacion = resp.paginacion;
    this.datasource = new MatTableDataSource<any>(resp.pokemones);
    this.resetPokemon = resp.pokemones;
  }

  ngOnDestroy() {
    if (this.pokemonesSubscription) {
      this.pokemonesSubscription.unsubscribe();
    }
  }

}
