import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Cambia de AuthGuard a authGuard

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [authGuard] // Usa authGuard en minúsculas
  },
  {
    path: 'service-selection',
    loadChildren: () => import('./pages/service-selection/service-selection.module').then(m => m.ServiceSelectionPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'professional-map',
    loadChildren: () => import('./pages/professional-map/professional-map.module').then(m => m.ProfessionalMapPageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }