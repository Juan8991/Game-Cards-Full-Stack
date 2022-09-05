import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Game } from 'src/app/models/game.model';
import { Usuario } from 'src/app/models/usuario.model';
import { JugadoresService } from './jugadores.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-create-newgame',
  templateUrl: './create-newgame.component.html',
  styleUrls: ['./create-newgame.component.css']
})
export class CreateNewgameComponent implements OnInit {
  frmJugadores: FormGroup;
  jugadores!: Array<Usuario>;
  currentUser!: firebase.User | null

  constructor(private jugadores$: JugadoresService, private auth$: AuthService) {
    this.frmJugadores = this.createFormJugadores();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    this.currentUser = await this.auth$.getUserAuth();
    this.jugadores = this.jugadores.filter(item => item.id !== this.currentUser?.uid);
  }
  public submit(): void {
    const gamers = this.frmJugadores.getRawValue();
    gamers.jugadores.push(this.currentUser?.uid);
    console.log("Submit", gamers);
    this.jugadores$.game(gamers).subscribe({
      next: (data: Game) => {
        // Aquí hago algo con la información que llega del backend
        console.log("Game", data);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }


}
