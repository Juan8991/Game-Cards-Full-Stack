import { Injectable, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase/compat';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { Game } from 'src/app/models/game.model';


@Injectable({
  providedIn: 'root'
})
export class JugadoresService{
  private usersCollection: AngularFirestoreCollection<Usuario>;
  constructor(private storage: AngularFirestore, private http: HttpClient) {
    this.usersCollection = storage.collection<Usuario>('usuarios');
  }


  game(gamers: Array<string>): Observable<Game> {
    return this.http.post<Game>(`${environment.urlBase}/juego/crear`, { gamers }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getJugadores(): Promise<Array<Usuario>>{
    const result = await new Promise<Usuario[]>((resolve, reject) => {
      const query = this.usersCollection;
      query.get().subscribe({
        next: (data) => {
          const usuarios = new Array<Usuario>();
          data.forEach((gamer) => {
            usuarios.push(gamer.data());
          });
          resolve(usuarios);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
    return result;
  }

  public addGamer(user: firebase.User | null): void {
    if (user != null) {
      const newUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL
      } as Usuario;
      // Create
      this.usersCollection
      .doc(user.uid)
      .set(newUser)
      .then(() => console.log('Jugador registrado'));
    }
  }
}
