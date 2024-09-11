import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/domain/guest';
import { Video } from 'src/domain/video';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-round-search',
  templateUrl: './round-search.component.html',
  styleUrls: ['./round-search.component.sass'],
})

export class RoundSearchComponent implements OnInit {
  protected guests: Guest[] = [];
  protected videos: Video[] = [];
  protected selectedGuests: Guest[] = [];
  protected selectedVideos: Video[] = [];
  protected filter: string = '';

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    let roundsMap: Map<Guest, Video[]> = this.dbService.getRoundsMap();

    roundsMap.forEach((value, key) => {
      this.guests.push(key);
      this.videos.push(...value);
    });

    this.guests = this.guests.sort(Guest.guestsComparator);
    this.videos = this.videos.sort(Video.videosByRoundComparator);
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
      this.selectedVideos = this.dbService.getVideosByGuests(this.selectedGuests).sort(Video.videosByRoundComparator);
    }
  }

  protected onFilter(event: any): void {
    this.filter = event.filter;
  }
}
