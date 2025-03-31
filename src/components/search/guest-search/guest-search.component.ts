import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/domain/guest';
import { VideoData } from 'src/domain/video-data';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-guest-search',
  templateUrl: './guest-search.component.html',
  styleUrls: ['./guest-search.component.sass'],
})

export class GuestSearchComponent implements OnInit {
  protected guests: Guest[] = [];
  protected videos: VideoData[] = [];
  protected selectedGuests: Guest[] = [];
  protected selectedVideos: VideoData[] = [];
  protected filter: string = '';

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.guests = this.dbService.getAllGuests();
    this.videos = this.dbService.getAllVideos();
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
