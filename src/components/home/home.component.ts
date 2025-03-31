import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VideoData } from 'src/domain/video-data';
import { DatabaseService } from 'src/services/database.service';

interface Choice {
  label: string;
  code: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  protected CODES = Object.freeze({
    'MOSTVIEW': 1,
    'POPULAR': 2,
    'RANDOM': 3,
    'RECENT': 4,
  });
  protected videos: VideoData[] = [];
  protected choices: Choice[];
  protected selectedChoice: Choice;
  protected choiceCode: number;

  constructor(private dbService: DatabaseService, private translateService: TranslateService) {
    this.choices = [
      { label: 'home.button-recent', code: this.CODES.RECENT },
      { label: 'home.button-mostview', code: this.CODES.MOSTVIEW },
      { label: 'home.button-popular', code: this.CODES.POPULAR },
      { label: 'home.button-random', code: this.CODES.RANDOM }
    ];
    this.selectedChoice = this.choices[0];
    this.choiceCode = this.choices[0].code;
  }

  ngOnInit(): void {
    this.updateVideos(this.CODES.RECENT);
  }

  protected onOptionClick() {
    this.updateVideos(this.choiceCode);
  }

  protected onClick(choiceCode: number) {
    this.updateVideos(choiceCode);
  }

  private updateVideos(choiceCode: number) {
    switch (choiceCode) {
      case this.CODES.RECENT:
        this.videos = this.dbService.getLastVideos(12);
        break;
      case this.CODES.MOSTVIEW:
        this.videos = this.dbService.getMostViewVideos(12);
        break;
      case this.CODES.POPULAR:
        this.videos = this.dbService.getMostLikedVideos(12);
        break;
      case this.CODES.RANDOM:
        this.videos = this.dbService.getRandomVideos(12);
        break;
    }
  }
}
