import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { CartaModel } from 'src/app/models/carta.model';
import { WebSocketService } from 'src/app/webSocket/web-socket.service';
import { GameService } from '../game.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit {
  @Input() cartasTableroHijo:CartaModel []=[];
  @Input() cartasMazoHijo:CartaModel []=[];
  @Input() juegoIdHijo:string='';
  @Input() currentUserHijo:string='';
  @Output() newTableEvent= new EventEmitter<CartaModel[]>();
  @Output() newMazoEvent= new EventEmitter<CartaModel[]>();

  cartaSelect:CartaModel []=[];
  constructor(
    private modalSwitch:ModalService,
    private gameService:GameService,
    public webSocket: WebSocketService
    ) { }

  ngOnInit() {
    //Socket conexion
    this.webSocket.connection(this.juegoIdHijo).subscribe({
      next: (event: any) => {
        console.log("EventoDesdeElHijo",event)}});
  }
  closeModal(){
    this.modalSwitch.modal$.emit(false);
  }
  selecionarCartaDelTablero(selecTaId:string){
    console.log("CartaSelecionadaDelTablero:",selecTaId)
    let carta: CartaModel[];
    carta = this.cartasTableroHijo.filter(carta => carta.cartaId === selecTaId)
    this.cartasMazoHijo.push(carta[0])
    this.newMazoEvent.emit(this.cartasMazoHijo)
    this.cartasTableroHijo = this.cartasTableroHijo.filter(cartas => cartas.cartaId !== selecTaId)
    this.newTableEvent.emit(this.cartasTableroHijo);
    /* this.cartaSelect = this.cartasTableroHijo.filter(carta=>carta.cartaId === selecTaId);
    this.cartasMazoHijo.push({
      cartaId: this.cartaSelect[0].cartaId,
      poder: this.cartaSelect[0].poder,
      estaOculta: this.cartaSelect[0].estaOculta,
      estaHabilitada: this.cartaSelect[0].estaHabilitada,
      url:this.cartaSelect[0].url
    }) */
    this.gameService.quitarCartaEnTablero({
        juegoId:this.juegoIdHijo,
        cartaId:selecTaId,
        jugadorId:this.currentUserHijo
    })


  }
  selecionarCartaDelMazo(selectId:string){
    console.log("CartaSelecionadaDeMimazo:",selectId)
    this.gameService.ponerCartaEnTablero({
      juegoId:this.juegoIdHijo,
      cartaId:selectId,
      jugadorId:this.currentUserHijo
    }).subscribe(e=>console.log(e))
  }
  ngOnDestroy(): void {
    this.webSocket.closedConnection();
  }
}
