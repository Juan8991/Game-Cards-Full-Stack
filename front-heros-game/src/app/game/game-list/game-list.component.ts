import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoModel } from 'src/app/models/game.model';
import { GameService } from '../game.service';
import firebase from 'firebase/compat';
import { AuthService } from 'src/app/auth/auth.service';
import { WebSocketService } from 'src/app/webSocket/web-socket.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  dataSource: JuegoModel[] = [];
  currentUser!: firebase.User | null


  constructor(
    private router: Router,
    private gameService: GameService,
    private authService:AuthService,
    private webSocket: WebSocketService) { }

  async ngOnInit() {
    this.currentUser = await this.authService.getUserAuth();
    //this.gameService.listarJuegos(this.currentUser!.uid).subscribe(juego => this.dataSource=juego);
    this.gameService.listarTodosLosJuegos().subscribe(juego => this.dataSource=juego);
 }
  goBoard(id:string){

    this.router.navigate(['/game/board',id]);
  }
  IniciarJuego(id: string){
    this.webSocket.connection(id).subscribe({
       next: (event:any) => {
        console.log("EventTYPE",event.type)
          if(event.type === 'cardgame.tablerocreado'){
            const command={
              juegoId: id,
              tiempo: 80,
              jugadores: event.jugadorIds.map((it:any) => it.uuid)}
            console.log("comando",command)
            this.gameService.crearRonda(command);
          }
          console.log("EventTYPE2",event.type)
          if(event.type == 'cardgame.rondacreada'){
            console.log("Entro a iniciar redirect")
            this.router.navigate(['/game/board',id]);
          }


      },
      error: (err:any) => console.log(err),
      complete: () => console.log('complete')
    });
    this.gameService.iniciarJuego({ juegoId: id }).subscribe();
  }

}
