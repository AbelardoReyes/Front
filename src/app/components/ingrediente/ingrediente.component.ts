import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  ingrediente: Ingrediente[] = [];
  suscription?: Subscription;
  eventSource = new EventSource(environment.URL_API+'/stream');
  constructor(
    private ingredienteService: IngredienteService
  ) { }
  ngOnInit() {
    this.getIngredientes();
    this.eventSource.onopen = () => {
      console.log('Conectado al event source');
      this.getIngredientes();
      console.log(event);
      this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
        this.getIngredientes();
      });
    };
    this.eventSource.onerror = (error) => {
      console.log('Error en el event source');
      console.log(error);
    };
    this.eventSource.addEventListener('new:ingrediente', (event) => {
      this.getIngredientes();
      console.log(event);
      this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
        this.getIngredientes();
      });
    }
    );
  }
  ngOnDestroy() {
    this.suscription?.unsubscribe();
    this.eventSource.close();
  }
  //Metodos
  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe(data => this.ingrediente = data);
  }
}
