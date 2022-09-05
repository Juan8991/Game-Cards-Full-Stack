import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game.routing';
import { CreateNewgameComponent } from './create-newgame/create-newgame.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { TableGameComponent } from './table-game/table-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateNewgameComponent,GameHomeComponent,TableGameComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
