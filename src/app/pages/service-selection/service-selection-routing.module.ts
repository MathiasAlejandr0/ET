import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceSelectionPage } from './service-selection.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceSelectionPageRoutingModule {}
