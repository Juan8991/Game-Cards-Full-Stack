import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JuegoModel } from '../models/game.model';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}
  createGame(body: any) {
    return this.http.post('http://localhost:8080/juego/crear', { ...body });
  }
  listarJuegos(idJugadorPrincipal: string | null):Observable<JuegoModel[]>{
    return this.http.get<JuegoModel[]>(`http://localhost:8080/juego/listar/${idJugadorPrincipal}`);
  }

}
