import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
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

  private initDates() {
    this.minDateFrom = this.startOfMonthDate(this.FIRST_PODCAST_DATE);
    this.maxDateTo = this.endOfMonthDate(new Date());
    this.dateFrom = this.minDateFrom;
    this.dateTo = this.maxDateTo;
  }

  protected onDateChange() {
    this.dateFrom = this.startOfMonthDate(this.dateFrom);
    this.dateTo = this.endOfMonthDate(this.dateTo);
    this.maxDateFrom = this.dateTo;
    this.minDateTo = this.dateFrom;
    this.videos = this.dbService.getVideosByDates(this.dateFrom, this.dateTo, true);
  }

  private startOfMonthDate(date: Date): Date {
    return DateTime.fromJSDate(date).startOf('month').toJSDate();
  }

  private endOfMonthDate(date: Date): Date {
    return DateTime.fromJSDate(date).endOf('month').toJSDate();
  }
}
