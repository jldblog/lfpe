import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { Select } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderRoutingModule,
    TranslateModule,
    // PrimeNG
    ButtonModule,
    Menubar,
    MenuModule,
    Select,
    TabsModule,
  ],
  exports: [
    HeaderComponent,
  ],
})

export class HeaderModule { }
