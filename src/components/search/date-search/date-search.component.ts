import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { VideoData } from 'src/domain/video-data';
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
  public videos: VideoData[] = [];

  constructor(private dbService: DatabaseService) {
    this.initDates();
  }

  ngOnInit(): void {
    this.videos = this.dbService.getAllVideos();
  }

  private initDates() {
    const now: Date = new Date();
    this.minDateFrom = this.startOfMonthDate(this.FIRST_PODCAST_DATE);
    this.maxDateFrom = this.endOfMonthDate(now);
    this.minDateTo = this.startOfMonthDate(now);
    this.maxDateTo = this.endOfMonthDate(now);
    this.dateFrom = this.minDateFrom;
    this.dateTo = this.maxDateTo;
  }

  protected onDateFromChange() {
    this.dateFrom = this.startOfMonthDate(this.dateFrom);
    this.adjustMinMaxDates();
    this.setVideos()
  }

  protected onDateToChange() {
    this.dateTo = this.endOfMonthDate(this.dateTo);
    this.adjustMinMaxDates();
    this.setVideos()
  }

  private adjustMinMaxDates() {
    this.maxDateFrom = this.startOfMonthDate(this.dateTo);
    this.minDateTo = this.endOfMonthDate(this.dateFrom);
  }

  private setVideos() {
    this.videos = this.dbService.getVideosByDates(this.dateFrom, this.dateTo, true);
  }

  private startOfMonthDate(date: Date): Date {
    return DateTime.fromJSDate(date).startOf('month').toJSDate();
  }

  private endOfMonthDate(date: Date): Date {
    return DateTime.fromJSDate(date).endOf('month').toJSDate();
  }
}
