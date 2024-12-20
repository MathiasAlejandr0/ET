import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionalMapPageRoutingModule } from './professional-map-routing.module';

import { ProfessionalMapPage } from './professional-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionalMapPageRoutingModule
  ],
  declarations: [ProfessionalMapPage]
})
export class ProfessionalMapPageModule {}
