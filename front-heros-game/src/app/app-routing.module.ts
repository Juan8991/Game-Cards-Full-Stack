import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './auth/is-logged-in.guard';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './game/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivateChild: [IsLoggedInGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  /* {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivateChild: [IsLoggedInGuard],
    canLoad: [IsLoggedInGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
