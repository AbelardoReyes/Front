import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  ingrediente: Ingrediente[] = [];
  suscription?: Subscription;
  myToken = localStorage.getItem('token') || '';

  constructor(


    private ingredienteService: IngredienteService,
    private http: HttpClient) { }
  ngOnInit(): void {
    const token = this.myToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.getIngredientes();
    this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
      this.getIngredientes();
    });
  }
  //Metodos
  getIngredientes() {
    this.ingredienteService.getIngrediente().subscribe(data => this.ingrediente = data);
  }
}
