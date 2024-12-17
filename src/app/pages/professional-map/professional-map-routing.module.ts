import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionalMapPage } from './professional-map.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionalMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionalMapPageRoutingModule {}
