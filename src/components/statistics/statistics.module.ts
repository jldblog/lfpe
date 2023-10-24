import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { StatisticsComponent } from './statistics.component';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    // PrimeNG
    ChipModule,
    PanelModule
  ],
  exports: [
    StatisticsComponent
  ],
})

export class StatisticsModule { }
