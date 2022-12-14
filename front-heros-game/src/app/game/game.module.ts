import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game.routing';
import { CreateNewgameComponent } from './create-newgame/create-newgame.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { TableGameComponent } from './table-game/table-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './game.service';
import { GameListComponent } from './game-list/game-list.component';
import { GameModalComponent } from './game-modal/game-modal.component';




@NgModule({
  declarations: [CreateNewgameComponent,GameHomeComponent,TableGameComponent,GameListComponent,GameModalComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class GameModule { }
