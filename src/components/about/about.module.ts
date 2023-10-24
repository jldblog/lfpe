import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    // APP
    AboutRoutingModule,
    // PrimeNG
    PanelModule
  ],
  exports: [
    AboutRoutingModule,
  ],
})

export class AboutModule { }
