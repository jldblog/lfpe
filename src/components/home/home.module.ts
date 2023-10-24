import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
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
    DropdownModule,
    MultiSelectModule,
    PanelModule,
    SelectButtonModule
  ],
  exports: [
    HomeComponent,
  ],
})

export class HomeModule { }
