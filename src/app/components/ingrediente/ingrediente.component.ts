import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  ingrediente: Ingrediente[] = [];
  suscription?: Subscription;

  constructor(


    private ingredienteService: IngredienteService,) { }
  ngOnInit(): void {
    this.getIngredientes();
    this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
      this.getIngredientes();
    });
  }
  //Metodos
  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe(data => this.ingrediente = data);
  }
}
