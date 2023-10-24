import { AfterViewInit, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InitService } from 'src/services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [],
})

export class AppComponent implements AfterViewInit {
  constructor(private initService: InitService, private messageService: MessageService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      for (let msg of this.initService.getErrorMessages()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
      }
    });
  }
}