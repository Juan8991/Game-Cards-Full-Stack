import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CartaModel } from 'src/app/models/carta.model';
import { WebSocketService } from 'src/app/webSocket/web-socket.service';
import { GameService } from '../game.service';
import swal from'sweetalert2';
import { ModalService } from '../game-modal/modal.service';

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
  indexRonda: number = 0;
  cuantosApostaron:number=0;
  juegoId: string = '';
  ganadorRondaId:string='';
  btnIniciarHabilitado: boolean = true;
  labelGanadorHabilitado: boolean = true;
  ganadorPartidaAlias: string = '';
  hasGanado:boolean = false;
  modalSwitch:boolean=false;
  elElegidoId:string='';
  numeroAleatorio:number=0;
  //Eventos
  RONDA_CREADA:string='cardgame.rondacreada'
  RONDA_INICIADA:string='cardgame.rondainiciada';
  RONDA_TERMINADA:string='cardgame.rondaterminada';
  PONER_CARTA_EN_TABLERO:string='cardgame.ponercartaentablero';
  CARTA_QUITADA_DEL_MAZO:string='cardgame.cartaquitadadelmazo';
  CARTA_ASIGNADA_A_JUGADOR:string='cardgame.cartasasignadasajugador';
  TIEMPO_CAMBIADO_DEL_TABLERO: string='cardgame.tiempocambiadodeltablero';
  JUEGO_FINALIZADO: string='cardgame.juegofinalizado';
  //Cosntructor
  constructor(
    private auth: AuthService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    public webSocket: WebSocketService,
    private modalService: ModalService
  ){}
  //ngInit
  ngOnInit(): void {

    //this.modalService.modal$.subscribe(value=>this.modalSwitch=value);
    this.route.params.subscribe((params) => {
      this.juegoId = params['id'];
      this.currentUserId=this.auth.obtenerUsuarioSesion().uid;
      this.obtenerMazo();
      this.obtenerTablero();
    });

    //Socket conexion
    this.webSocket.connection(this.juegoId).subscribe({
      next: (event: any) => {
        console.log("EVENTOTYPE",event.type)
        //console.log("EVENTOPAAAAA",event)
        switch(event.type){
          case this.RONDA_CREADA:{
            this.currentUserId=this.currentUserId;
            console.log("number",this.numeroAleatorio);
            console.log("UserIdcURRENT",this.currentUserId);
            this.tiempo = event.tiempo;
            this.indexRonda=event.ronda.numero;
            this.cartasDelJugador=this.cartasDelJugador;
            this.limpiarTablero();
            this.btnIniciarHabilitado = true;
            this.modalSwitch=false;
            this.cuantosApostaron=0;
            this.elElegidoId=event.idJugadorElegido;
            console.log("El elegido crear ronda:",this.elElegidoId)
            break;
          };
          case this.RONDA_INICIADA:{
            this.btnIniciarHabilitado = false;
            break;
          }
          case this.RONDA_TERMINADA:{
            //this.limpiarTablero();
            //console.log("entorRondatermianda",event)
            //console.log("cartasJugadorTablero",this.cartasJugadorTablero)
            this.numeroAleatorio=this.randomNumber()
            break;
          }

          case this.PONER_CARTA_EN_TABLERO:{
            this.cuantosApostaron+=1;
            this.cartasDelTablero.push({
              cartaId: event.carta.cartaId.uuid,
              poder: event.carta.poder,
              estaOculta: event.carta.estaOculta,
              estaHabilitada: event.carta.estaHabilitada,
              url:event.carta.url
            })
            if(event.jugadorId.uuid == this.currentUserId) {
              this.cartasJugadorTablero.push(event.carta.cartaId.uuid)
            }
            if(this.cuantosApostaron==this.jugadoresRonda && this.indexRonda>=2){
              console.log("Todos los jugadores apostaron")
              this.implementacionReto()
            }
            break;
          }
          case this.CARTA_QUITADA_DEL_MAZO:{
            this.cartasDelJugador = this.cartasDelJugador
            .filter((item) => item.cartaId !== event.carta.cartaId.uuid);
            break;
          }
          case this.CARTA_ASIGNADA_A_JUGADOR:{
            this.ganadorRondaId=event.ganadorId.uuid;
            if(event.ganadorId.uuid === this.currentUserId){
              this.hasGanado=true;
              event.cartasApuesta.forEach((carta: any) => {
                this.cartasDelJugador.push({
                  cartaId: carta.cartaId.uuid,
                  poder: carta.poder,
                  estaOculta: carta.estaOculta,
                  estaHabilitada: carta.estaHabilitada,
                  url:carta.url
                });
              })
              //alert("Buena esa mi rey")
            }else{
              this.hasGanado=false;
              //alert("Perdiste mi bro :(")
            }
            break;
          }
          case this.JUEGO_FINALIZADO:{
            this.ganadorPartidaAlias=event.alias;
            swal.fire('Ganador del juego', event.alias);
            setTimeout(()=>this.router.navigate(['/game/home']),400)
            break;
          }
          case this.TIEMPO_CAMBIADO_DEL_TABLERO:{
            this.tiempo = event.tiempo;
            break;
          }
        }
      },
    });

  }
  //Cerrando conexion
  ngOnDestroy(): void {
    this.webSocket.closedConnection();
  }

  //Metodos
  iniciarRonda() {
    this.gameService.iniciarRonda({ juegoId: this.juegoId }).subscribe();
  }
  obtenerMazo(){
    this.gameService.obtenerMazoPorJugadorYJuego(this.currentUserId, this.juegoId).subscribe((element:any) => {
      this.cartasDelJugador = element.cartas;
      console.log("cartasjuga",this.cartasDelJugador)
    });
  }
  obtenerTablero(){
    this.gameService.obtenerTableroPorJuego(this.juegoId).subscribe((event) => {
      this.tiempo = event.tiempo;
      this.jugadoresRonda = event.tablero.jugadores.length;
      this.indexRonda = event.ronda.numero;
    });
  }
  limpiarTablero(){
    this.cartasDelTablero.length-=this.cartasDelTablero.length;
  }
  ponerCarta(cardId:string){
    this.gameService.ponerCartaEnTablero({
      juegoId:this.juegoId,
      cartaId:cardId,
      jugadorId:this.currentUserId
    }).subscribe(e=>console.log(e))
  }
  implementacionReto(){
    if(this.elElegidoId==this.currentUserId){
      console.log("entro al allert")
      swal.fire({
        title:'¡En hora buena! Puedes intercambiar una carta del tablero por una de tu mazo.'
      });
      this.modalSwitch=true;
    }
  }
  randomNumber() {
    return Math.floor((Math.random() * ((this.jugadoresRonda-1) - 0 + 1)) + 0);
  }
}


//``
