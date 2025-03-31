import { Component, OnInit } from '@angular/core';
import { Title } from 'src/domain/title';
import { VideoData } from 'src/domain/video-data';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-title-search',
  templateUrl: './title-search.component.html',
  styleUrls: ['./title-search.component.sass']
})

export class TitleSearchComponent implements OnInit {
  protected videos: VideoData[] = [];
  protected titles!: Title[];
  protected selectedTitles!: Title[];
  protected filter: string = '';

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.titles = this.dbService.getTitles();
    this.videos = this.dbService.getAllVideos();
  }

  public reset(): void {
    this.selectedTitles = [];
  }

  protected onChange(): void {
    let videos: VideoData[] = [];

    if (this.selectedTitles.length == 0) {
      videos = this.dbService.getAllVideos();
    }
    else {
      videos = this.dbService.getVideosByTitles(this.selectedTitles);
    }

    this.videos = videos;
  }

  protected onFilter(event: any): void {
    this.filter = event.filter;
  }
}
