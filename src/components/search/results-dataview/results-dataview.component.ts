import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VideoData } from 'src/domain/video-data';
import { DescriptionComponent } from '../../description/description.component';

@Component({
  selector: 'app-results-dataview',
  templateUrl: './results-dataview.component.html',
  styleUrls: ['./results-dataview.component.sass']
})

export class ResultsDataViewComponent implements OnChanges, OnInit {
  @Input() public videos: VideoData[] = [];
  @Input() public hideTable: boolean = true;
  protected first: number = 0;
  protected rows: number = 12;
  protected videosSlice2: VideoData[] = [];
  protected displayOptions: any[] = [
    { icon: 'pi pi-th-large', index: 0 },
    { icon: 'pi pi-bars', index: 1 }
  ];
  protected displayValue: any = this.displayOptions[0];
  protected dialogRef!: DynamicDialogRef;
  protected lang: string;
  private screenWidth: number;
  protected showPageLinks: boolean = true;
  private SHOW_PAGE_LINKS_BREAKPOINT = 420;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.adjustPaginator();
  }

  private adjustRow() {
    if (this.screenWidth > 1024) {
      this.rows = 16;
    }
    else {
      this.rows = 20;
    }
  }

  constructor(private dialogService: DialogService, private translateService: TranslateService) {
    this.lang = translateService.currentLang;
    this.screenWidth = window.innerWidth;
    this.adjustPaginator();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
    })

    this.videosSlice2 = this.sliceVideos2();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.first = 0;
    this.videosSlice2 = this.sliceVideos2();
  }

  private adjustPaginator(): void {
    this.showPageLinks = this.screenWidth >= this.SHOW_PAGE_LINKS_BREAKPOINT;
  }

  private sliceVideos2(): VideoData[] {
    return this.videos.slice(this.first, this.first + this.rows);
  }

  protected onChangeDisplay(): void {
    this.hideTable = !this.hideTable;
  }

  protected onShowDescriptionDialog(video: VideoData): void {
    this.dialogRef = this.dialogService.open(DescriptionComponent, {
      header: video.originalTitle,
      data: JSON.stringify(video),
      width: "var(--descriptionWidth)",
      modal: true,
      closable: true,
      closeOnEscape: true,
    });
  }

  onPageChange2(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.videosSlice2 = this.sliceVideos2();
  }
}
