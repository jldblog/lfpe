import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Video } from 'src/domain/video';
import { DescriptionComponent } from '../../description/description.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-dataview',
  templateUrl: './results-dataview.component.html',
  styleUrls: ['./results-dataview.component.sass']
})

export class ResultsDataViewComponent implements OnChanges, OnInit {
  @Input() public videos: Video[] = [];
  @Input() public hideTable: boolean = true;
  protected first: number = 0;
  protected rows: number = 12;
  protected videosSlice2: Video[] = [];
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

    // console.log('onResize', this.screenWidth, this.screenHeight);
    // this.adjustRow();
  }

  private adjustRow() {
    if (this.screenWidth > 1024) {
      this.rows = 16;
    }
    else {
      this.rows = 20;
    }

    console.log('rows', this.rows);
    // this.router.navigate([this.router.url])
  }

  constructor(private dialogService: DialogService, private translateService: TranslateService) {
    this.lang = translateService.currentLang;
    this.screenWidth = window.innerWidth;
    this.adjustPaginator();

    // this.adjustRow();
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

  private sliceVideos2(): Video[] {
    return this.videos.slice(this.first, this.first + this.rows);
  }

  protected onChangeDisplay(): void {
    this.hideTable = !this.hideTable;
  }

  protected onShowDescriptionDialog(video: Video): void {
    this.dialogRef = this.dialogService.open(DescriptionComponent, {
      header: video.originalTitle,
      data: JSON.stringify(video),
      width: "var(--descriptionWidth)",
    });
  }

  onPageChange2(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.videosSlice2 = this.sliceVideos2();
  }
}
