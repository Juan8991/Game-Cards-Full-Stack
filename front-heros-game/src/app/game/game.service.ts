import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}
  createGame(body: any) {
    return this.http.post('http://localhost:8080/juego/crear', { ...body });
  }
}
