import { AfterViewInit, Component } from '@angular/core';
import PrimeNGTheme from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { InitService } from 'src/services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [],
})

export class AppComponent implements AfterViewInit {
  public title = 'lfpe';

  visible: boolean = false;

  constructor(private initService: InitService, private messageService: MessageService, private primeConfig: PrimeNG) {
    this.primeConfig.theme.set({
      preset: PrimeNGTheme,
      options: {
        darkModeSelector: '.dark',
      },
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      for (let msg of this.initService.getErrorMessages()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
      }
    });
  }
}