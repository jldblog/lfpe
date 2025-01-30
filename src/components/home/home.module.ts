import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ResultsModule } from 'src/components/search/results/results.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    // APP
    ResultsModule,
    // PrimeNG
    MultiSelectModule,
    PanelModule,
    Select,
    SelectButtonModule
  ],
  exports: [
    HomeComponent,
  ],
})

export class HomeModule { }
