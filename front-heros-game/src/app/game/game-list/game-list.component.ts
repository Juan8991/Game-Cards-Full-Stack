import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goBoard(){
    this.router.navigate(['/game/board']);
  }

}
