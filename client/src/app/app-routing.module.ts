import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'u',
    loadChildren: async () =>
      (await import('./pages/private/private.module')).PrivateModule,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: async () =>
      (await import('./pages/public/public.module')).PublicModule,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
