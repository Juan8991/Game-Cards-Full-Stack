
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocketSubject<unknown>;

  constructor() {

   }
  connection(idGame:String){
    return this.socket! = webSocket(`ws://localhost:8081/retrieve/${idGame}`);
  }
  closedConnection(){
    this.socket.unsubscribe();
  }




}
