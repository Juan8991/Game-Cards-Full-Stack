import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoModel } from 'src/app/models/game.model';
import { GameService } from '../game.service';
import firebase from 'firebase/compat';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  dataSource: JuegoModel[] = [];
  currentUser!: firebase.User | null


  constructor(private router: Router,private gameService: GameService, private authService:AuthService) { }

  async ngOnInit() {
    this.currentUser = await this.authService.getUserAuth();
    this.gameService.listarJuegos(this.currentUser!.uid).subscribe(juego => this.dataSource=juego);
    //window.location.reload();
 }
  goBoard(){
    
    this.router.navigate(['/game/board']);
  }

}
