import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Video } from 'src/domain/video';
import { DescriptionComponent } from '../../description/description.component';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.sass']
})

export class ResultsTableComponent implements OnChanges, OnInit {
  @Input() public videos: Video[] = [];
  @Input() public hideTable: boolean = true;
  protected first: number = 0;
  protected rows: number = 5;
  protected videosSlice1: Video[] = [];
  protected displayOptions: any[] = [
    { icon: 'pi pi-th-large', index: 0 },
    { icon: 'pi pi-bars', index: 1 }
  ];
  protected displayValue: any = this.displayOptions[0];
  protected dialogRef!: DynamicDialogRef;
  protected lang: string;

  constructor(private dialogService: DialogService, private translateService: TranslateService) {
    this.lang = translateService.currentLang;
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
    })

    this.videosSlice1 = this.sliceVideos1();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.first = 0;
    this.videosSlice1 = this.sliceVideos1();
  }

  private sliceVideos1(): Video[] {
    return this.videos.slice(this.first, this.first + this.rows);
  }

  protected onChangeDisplay(): void {
    this.hideTable = !this.hideTable;
  }

  protected onShowDescriptionDialog(video: Video): void {
    this.dialogRef = this.dialogService.open(DescriptionComponent, {
      header: video.originalTitle,
      data: JSON.stringify(video), // TODO renommer data
      width: "var(--descriptionWidth)",
    });
  }

  onPageChange1(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.videosSlice1 = this.sliceVideos1();
  }
}
