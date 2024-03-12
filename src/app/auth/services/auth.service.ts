import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined {
    if (!this.user ) return undefined;
    return structuredClone( this.user );


  //* el structuredClone es para clonar un objeto y pasar una copia en vez de pasar el objeto por referencia. No queremos que nada del exterior tenga acceso a modificar el usuario. Solo el authService.
  }


  login( email: string, password: string ):Observable<User> {

    // http.post('login',{email,password} );

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token','avcajsc.acuaics.cs8dgwb') ),
      );
  }

  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),  //regresa true pq existe
        catchError( err => of(false))
      )

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }


}
