import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/domain/guest';
import { Video } from 'src/domain/video';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-guest-search',
  templateUrl: './guest-search.component.html',
  styleUrls: ['./guest-search.component.sass'],
})

export class GuestSearchComponent implements OnInit {
  protected videos: Video[] = [];
  protected guests: Guest[] = [];
  protected selectedGuests: Guest[] = [];
  protected filter: string = '';

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.guests = this.dbService.getGuests();
    this.videos = this.dbService.getAllVideos();
  }

  protected reset(): void {
    this.selectedGuests = [];
  }

  protected onChange(event: any): void {
    let videos: Video[] = [];

    if (this.selectedGuests.length == 0) {
      videos = this.dbService.getAllVideos();
    }
    else {
      videos = this.dbService.getVideosByGuests(this.selectedGuests);
    }

    this.videos = videos;
  }

  protected onFilter(event: any): void {
    this.filter = event.filter;
  }
}
