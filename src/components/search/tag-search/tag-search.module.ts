import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { ResultsModule } from 'src/components/search/results/results.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { TagSearchComponent } from './tag-search.component';


@NgModule({
  declarations: [
    TagSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    // APP
    PipesModule,
    ResultsModule,
    // PrimeNG
    MultiSelectModule,
    PanelModule
  ],
  exports: [
    TagSearchComponent,
  ],
})

export class TagSearchModule { }
