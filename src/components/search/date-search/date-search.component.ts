import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Video } from 'src/domain/video';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-date-search',
  templateUrl: './date-search.component.html',
  styleUrls: ['./date-search.component.sass']
})

export class DateSearchComponent implements OnInit {
  private FIRST_PODCAST_DATE = new Date('2018-04-18');
  protected dateFrom!: Date;
  protected dateTo!: Date;
  protected minDateFrom!: Date;
  protected maxDateFrom!: Date;
  protected minDateTo!: Date;
  protected maxDateTo!: Date;
  public videos: Video[] = [];

  constructor(private dbService: DatabaseService) {
    this.initDates();
  }

  ngOnInit(): void {
    this.videos = this.dbService.getAllVideos();
  }

  public initDates() {
    this.minDateFrom = this.FIRST_PODCAST_DATE;
    this.maxDateFrom = new Date();
    this.maxDateTo = this.maxDateFrom;
    this.dateFrom = this.minDateFrom;
    this.dateTo = this.maxDateTo;
  }

  private adjustMinMax() {
    this.maxDateFrom = this.dateTo;
    this.minDateTo = this.dateFrom;
  }

  protected onDateChange() {
    this.adjustMinMax();
    this.videos = this.dbService.getVideosByDates(this.dateFrom, this.dateTo, true);
  }
}
