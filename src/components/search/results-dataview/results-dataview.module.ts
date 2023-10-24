import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ResultsDataViewComponent } from './results-dataview.component';

@NgModule({
  declarations: [
    ResultsDataViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    // PrimeNG
    ButtonModule,
    DataViewModule,
    PaginatorModule,
    SelectButtonModule,
    TableModule
  ],
  exports: [
    ResultsDataViewComponent,
  ]
})

export class ResultsDataViewModule { }
