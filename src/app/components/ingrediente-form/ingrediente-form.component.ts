import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.css']
})
export class IngredienteFormComponent {
  form: FormGroup;
  ingrediente?: Ingrediente;
  eventSource = new EventSource(environment.URL_API+'/stream');
  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private location: Location) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }
  OnSubmit(values: Ingrediente) {
    this.eventSource.addEventListener('new:ingrediente', (event) => {
      console.log(event);
    });

    this.ingredienteService.addIngrendiente(values).subscribe();
    this.form.reset();
  }
  goBack() {
    this.location.back();
  }
}
