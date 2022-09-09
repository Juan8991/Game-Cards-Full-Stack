import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Game } from 'src/app/models/game.model';
import { Usuario } from 'src/app/models/usuario.model';
import { JugadoresService } from './jugadores.service';
import firebase from 'firebase/compat';
import { GameService } from '../game.service';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketService } from 'src/app/webSocket/web-socket.service';
import { JugadoresModel } from 'src/app/models/jugadores.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-newgame',
  templateUrl: './create-newgame.component.html',
  styleUrls: ['./create-newgame.component.css']
})
export class CreateNewgameComponent implements OnInit, OnDestroy {
  frmJugadores: FormGroup;
  formugadores= new FormGroup({
    jugadorName: new FormControl(""),
    jugadorId: new FormControl("")
  })
  jugadores!: Array<Usuario>;
  currentUser!: firebase.User | null
  selectedUsers: JugadoresModel[] = new Array<JugadoresModel>();
  uuid : String;

  constructor(private jugadores$: JugadoresService,
    private auth$: AuthService,
    private router: Router,
    private gameService : GameService,
    private socket : WebSocketService) {
    this.frmJugadores = this.createFormJugadores();
    this.uuid = uuidv4();
  }
  ngOnDestroy(): void {
    this.socket.closedConnection();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    this.currentUser = await this.auth$.getUserAuth();
    this.jugadores = this.jugadores.filter(item => item.id !== this.currentUser?.uid);
    this.socket.connection(this.uuid).subscribe(
      {
      next:(message:any)=>console.log(message),
      error:(error:any) =>console.log(error),
      complete:() =>console.log("completado"),
      }
    );

  }

  public submit(): void {
    const slected=this.frmJugadores.getRawValue();
    console.log("quetrae?",slected)
    slected.jugadores.push([this.currentUser!.uid,this.currentUser!.displayName])
    const jugadoresPalBack: any = {};
    slected.jugadores.forEach((user: (string | number)[]) => {
      jugadoresPalBack[user[0]] = `${user[1]}`;
    })
    console.log("jugadores pal back",JSON.stringify(jugadoresPalBack))
    /*  const command = {
      juegoId : this.uuid,
      jugadores : jugadoresPalBack,
      jugadorPrincipalId: this.currentUser?.uid
    }
    this.gameService.createGame(command).subscribe(subcri =>{
      console.log(subcri);
    }); */
    this.router.navigate(['/game/games']);
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }
  /* sendGamer(){
    this.gameService.createGame({

      "juegoId": this.uuid,
      "jugadores": {
          "uid-001": "camilo",
          "uid-002": "andres"
      },
      "jugadorPrincipalId": "uid-001"
  }).subscribe(subcri =>{
    console.log(subcri);
  });
 */
  }







