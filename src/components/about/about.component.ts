import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})

export class AboutComponent {
  protected name: string;
  protected title: string;
  protected title1: string;
  protected title2: string;
  protected version: string;
  protected url: string;
  protected build?: string;
  protected lastUpdated: string;

  constructor(private dbService: DatabaseService) {
    this.name = environment.name;
    this.title = environment.title;
    this.title1 = environment.title1;
    this.title2 = environment.title2;
    this.version = environment.version;
    this.url = environment.url;
    // this.build = environment.build;
    this.lastUpdated = dbService.getLastUpdated();
  }
}
