import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Ingrediente } from '../models/ingrediente.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  APIURL = environment.URL_API;
  private _refresh$ = new Subject<void>();
  private obtenerIngredientes = this.APIURL + '/ingrediente/info';
  private crearIngrediente = this.APIURL + '/ingrediente/';

  constructor(private http: HttpClient) { }
  get_refresh$() {
    return this._refresh$;
  }



  getIngrediente(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.obtenerIngredientes).pipe(retry(3), catchError(this.handleError))
  }

  addIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.crearIngrediente, ingrediente).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }
}

