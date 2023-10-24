import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ResultsTableComponent } from './results-table.component';

@NgModule({
  declarations: [
    ResultsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    // PrimeNG
    ButtonModule,
    PaginatorModule,
    TableModule
  ],
  exports: [
    ResultsTableComponent,
  ]
})

export class ResultsTableModule { }
