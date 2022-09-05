import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '../auth/is-logged-in.guard';
import { CreateNewgameComponent } from './create-newgame/create-newgame.component';
import { GameHomeComponent } from './game-home/game-home.component';

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
  /* {
    path: 'newgame',
    component: GameHomeComponent
  },
  {
    path: 'games',
    component: GameHomeComponent
  },
  {
    path: 'board',
    component: GameHomeComponent
  }, */
];

//export const GameRoutes = RouterModule.forChild(routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
