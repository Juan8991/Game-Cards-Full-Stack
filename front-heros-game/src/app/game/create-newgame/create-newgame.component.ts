import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Game } from 'src/app/models/game.model';
import { Usuario } from 'src/app/models/usuario.model';
import { JugadoresService } from './jugadores.service';
import firebase from 'firebase/compat';
import { GameService } from '../game.service';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-create-newgame',
  templateUrl: './create-newgame.component.html',
  styleUrls: ['./create-newgame.component.css']
})
export class CreateNewgameComponent implements OnInit, OnDestroy {
  frmJugadores: FormGroup;
  jugadores!: Array<Usuario>;
  currentUser!: firebase.User | null
  selectedUsers: Usuario[] = new Array<Usuario>();
  uuid : String;

  constructor(private jugadores$: JugadoresService,
    private auth$: AuthService,
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
    this.selectedUsers = this.jugadores;
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
    const slected=this.frmJugadores;
    console.log("quetrae?",this.frmJugadores)
    const jugadoresPalBack: any = {};
    //console.log("jugadores Selecionados",this.selectedUsers)
    this.selectedUsers.forEach(user => {
      jugadoresPalBack[user.id] = `${user.name}`;
    })
    //console.log("jugadores pal back",JSON.stringify(jugadoresPalBack))
    const command = {
      juegoId : this.uuid,
      jugadores : jugadoresPalBack,
      jugadorPrincipalId: this.currentUser?.uid
    }
    this.gameService.createGame(command).subscribe(subcri =>{
      console.log(subcri);
    });
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }
  sendGamer(){
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

  }


}


