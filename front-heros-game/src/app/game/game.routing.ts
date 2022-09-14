import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '../guards/is-logged-in.guard';
import { CreateNewgameComponent } from './create-newgame/create-newgame.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { GameListComponent } from './game-list/game-list.component';
import { TableGameComponent } from './table-game/table-game.component';

const routes: Routes = [
  {
    path: 'home',
    component: GameHomeComponent,
    //canActivate:[IsLoggedInGuard]
  },
  {
    path: 'newgame',
    component: CreateNewgameComponent,
    //canActivate:[IsLoggedInGuard]
  },
  {
    path: 'games',
    component: GameListComponent,
    //canActivate:[IsLoggedInGuard]
  },
  {
    path: 'board/:id',
    component: TableGameComponent,
    //canActivate:[IsLoggedInGuard]
  },
];
//export const GameRoutes = RouterModule.forChild(routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
