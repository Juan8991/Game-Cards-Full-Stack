import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { CartaModel } from 'src/app/models/carta.model';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit {
  @Input() cartasTableroHijo:CartaModel []=[];
  @Input() cartasMazoHijo:CartaModel []=[];

  constructor(private modalSwitch:ModalService) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalSwitch.modal$.emit(false);
  }
  selecionarCartaDelTablero(selecTaId:string){
    console.log("CartaSelecionadaDelTablero:",selecTaId)

  }
  selecionarCartaDelMazo(selectId:string){
    console.log("CartaSelecionadaDeMimazo:",selectId)
  }
}
