import { Component, OnInit } from '@angular/core';
import { Tag, Video } from 'src/domain/video';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.sass']
})

export class TagSearchComponent implements OnInit {
  protected videos: Video[] = [];
  protected tags: Tag[] = [];
  protected selectedTags: Tag[] = [];
  protected filter: string = '';

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.tags = this.dbService.getTags();
    this.videos = this.dbService.getAllVideos();
  }

  public reset(): void {
    this.selectedTags = [];
  }

  protected onChange(event: any): void {
    let videos: Video[] = [];

    if (this.selectedTags.length == 0) {
      videos = this.dbService.getAllVideos();
    }
    else {
      videos = this.dbService.getVideosByTags(this.selectedTags);
    }

    this.videos = videos;
  }

  protected onFilter(event: any): void {
    this.filter = event.filter;
  }
}
