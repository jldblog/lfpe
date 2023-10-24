import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { PipesModule } from 'src/pipes/pipes.module';
import { DescriptionRoutingModule } from './description-routing.module';
import { DescriptionComponent } from './description.component';

@NgModule({
  declarations: [
    DescriptionComponent,
  ],
  imports: [
    CommonModule,
    DescriptionRoutingModule,
    TranslateModule,
    // APP
    PipesModule,
    // PrimeNG
    DividerModule
  ],
  exports: [
    DescriptionComponent,
    TranslateModule
  ],
})

export class DescriptionModule { }
