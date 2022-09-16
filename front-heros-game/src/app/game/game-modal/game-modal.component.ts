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

  constructor(
    private modalSwitch:ModalService,
    private gameService:GameService,
    public webSocket: WebSocketService
    ) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalSwitch.modal$.emit(false);
  }
  selecionarCartaDelTablero(selecTaId:string){
    console.log("CartaSelecionadaDelTablero:",selecTaId)
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
}
