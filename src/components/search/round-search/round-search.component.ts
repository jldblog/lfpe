import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/domain/guest';
import { VideoData } from 'src/domain/video-data';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-round-search',
  templateUrl: './round-search.component.html',
  styleUrls: ['./round-search.component.sass'],
})

export class RoundSearchComponent implements OnInit {
  protected guests: Guest[] = [];
  protected videos: VideoData[] = [];
  protected selectedGuests: Guest[] = [];
  protected selectedVideos: VideoData[] = [];
  protected filter: string = '';

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    let roundsMap: Map<Guest, VideoData[]> = this.dbService.getRoundsMap();

    roundsMap.forEach((value, key) => {
      this.guests.push(key);
      this.videos.push(...value);
    });

    this.selectedVideos = this.videos;
  }

  protected reset(): void {
    this.selectedGuests = [];
  }

  protected onChange(event: any): void {
    if (this.selectedGuests.length == 0) {
      this.selectedVideos = this.videos;
    }
    else {
      this.selectedVideos = this.dbService.getVideosByGuests(this.selectedGuests);
    }
  }

  protected onFilter(event: any): void {
    this.filter = event.filter;
  }
}
