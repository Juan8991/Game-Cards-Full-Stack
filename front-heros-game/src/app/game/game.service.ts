import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableroModel } from '../models/board.model';
import { CartasJugadorModel } from '../models/cartasJugador.model';
import { JuegoModel } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}
  //Commands
  createGame(body: any) {
    return this.http.post(`${environment.urlBase}/juego/crear`, { ...body });
  }
  iniciarJuego(body: any) {
    return this.http.post(`${environment.urlBase}/juego/iniciar`, { ...body });
  }
  crearRonda(body: any) {
    return this.http.post(`${environment.urlBase}/juego/crear/ronda`, { ...body });
  }
  iniciarRonda(body: any) {
    return this.http.post(`${environment.urlBase}/juego/ronda/iniciar`,{ ...body });
  }
  ponerCartaEnTablero(body: any) {
    return this.http.post(`${environment.urlBase}/juego/poner`, { ...body });
  }


  //Querys
  listarJuegos(idJugadorPrincipal: string | null): Observable<JuegoModel[]> {
    return this.http.get<JuegoModel[]>(`${environment.urlBase}/juego/listar/${idJugadorPrincipal}`);
  }

  obtenerMazoPorJugadorYJuego(uid: string, juegoId: string) {
    return this.http.get(`${environment.urlBase}/juego/mazo/${uid}/${juegoId}`);
  }
  obtenerMazoPorJugador(uid: string) {
    return this.http.get(`${environment.urlBase}/jugador/mazo/${uid}`);
  }

  obtenerTableroPorJuego(juegoId: string): Observable<TableroModel> {
    return this.http.get<TableroModel>(`${environment.urlBase}/juego/${juegoId}`);
  }
}
