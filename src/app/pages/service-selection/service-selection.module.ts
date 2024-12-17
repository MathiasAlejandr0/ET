import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceSelectionPageRoutingModule } from './service-selection-routing.module';

import { ServiceSelectionPage } from './service-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceSelectionPageRoutingModule
  ],
  declarations: [ServiceSelectionPage]
})
export class ServiceSelectionPageModule {}
