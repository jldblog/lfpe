import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatePicker } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { ResultsModule } from 'src/components/search/results/results.module';
import { DateSearchComponent } from './date-search.component';

@NgModule({
  declarations: [
    DateSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    // APP
    ResultsModule,
    // PrimeNG
    DatePicker,
    PanelModule
  ],
  exports: [
    DateSearchComponent,
  ],
})

export class DateSearchModule { }
