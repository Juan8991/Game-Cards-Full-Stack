import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, EventType, Params, Route } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Carta } from 'src/app/models/board.model';
import { CartaModel } from 'src/app/models/carta.model';
import { CartasJugadorModel } from 'src/app/models/cartasJugador.model';
import { UserGoogle } from 'src/app/models/user-google.model';
import { WebSocketService } from 'src/app/webSocket/web-socket.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-table-game',
  templateUrl: './table-game.component.html',
  styleUrls: ['./table-game.component.css'],
})
export class TableGameComponent implements OnInit {
  currentUserId!: string;
  cartasDelJugador: CartaModel []=[];
  cartasDelTablero: CartaModel []=[];
  cartasJugadorTablero: string[] = [];
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  indexRonda: number = 0;
  juegoId: string = '';
  uid: string = '';
  btnIniciarHabilitado: boolean = true;
  ganadorAlias: string = '';
  ganador: boolean = false;
  constructor(
    private auth: AuthService,
    private gameService: GameService,
    private route: ActivatedRoute,
    public webSocket: WebSocketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.juegoId = params['id'];
      this.currentUserId=this.auth.obtenerUsuarioSesion().uid;
      this.gameService.obtenerMazoPorJugadorYJuego(this.currentUserId, this.juegoId).subscribe((element:any) => {
        this.cartasDelJugador = element.cartas;
        console.log("cartasjuga",this.cartasDelJugador)
      });
    });
    //Obtener tablero
    this.gameService.obtenerTableroPorJuego(this.juegoId).subscribe((event) => {
      this.tiempo = event.tiempo;
      this.jugadoresRonda = event.tablero.jugadores.length;
      this.indexRonda = event.ronda.numero;
    });
    //Socket conexion
    this.webSocket.connection(this.juegoId).subscribe({
      next: (event: any) => {
        console.log("EVENTOTYPE",event.type)
        if (event.type === 'cardgame.tiempocambiadodeltablero') {
          this.tiempo = event.tiempo;
        }
        if (event.type === 'cardgame.rondainiciada') {
          this.btnIniciarHabilitado = false;
        }
        if (event.type === 'cardgame.ponercartaentablero' ) {

          this.cartasDelTablero.push({
            cartaId: event.carta.cartaId.uuid,
            poder: event.carta.poder,
            estaOculta: event.carta.estaOculta,
            estaHabilitada: event.carta.estaHabilitada,
            url:event.carta.url
          })
          if(event.jugadorId.uuid == this.uid) {
            this.cartasJugadorTablero.push(event.carta.cartaId.uuid)
          }
        }
        if (event.type === 'cardgame.cartaquitadadelmazo') {
          this.cartasDelJugador = this.cartasDelJugador
            .filter((item) => item.cartaId !== event.carta.cartaId.uuid);

        }
        if(event.type === 'cardgame.rondainiciada'){
          //this.roundStarted = true;
        }

        if(event.type === 'cargame.rondaterminada'){
          //this.roundStarted = false;
        }
        if(event.type === 'cargame.cartasasignadasajugador'){
          console.log("eventoG",event.body)
          //this.roundStarted = false;
        }
      },
    });

  }
  //Cerrando conexion
  ngOnDestroy(): void {
    this.webSocket.closedConnection();
  }
  iniciarRonda() {
    this.gameService.iniciarRonda({ juegoId: this.juegoId }).subscribe();
  }
  ponerCarta(cardId:string){
    this.gameService.ponerCartaEnTablero({
      juegoId:this.juegoId,
      cartaId:cardId,
      jugadorId:this.currentUserId
    }).subscribe(e=>console.log(e))
  }
}
