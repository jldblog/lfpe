import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ResultsDataViewModule } from '../results-dataview/results-dataview.module';
import { ResultsComponent } from './results.component';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    // APP
    ResultsDataViewModule,
    // PrimeNG
    ButtonModule,
    DataViewModule,
    PaginatorModule,
    SelectButtonModule,
    TableModule
  ],
  exports: [
    ResultsComponent,
  ]
})

export class ResultsModule { }
