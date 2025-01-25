import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Video } from 'src/domain/video';
import { DescriptionComponent } from '../../description/description.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})

export class ResultsComponent implements OnChanges, OnInit {
  @Input() public videos: Video[] = [];
  protected first1: number = 0;
  protected rows1: number = 4;
  protected first2: number = 0;
  protected rows2: number = 16;
  protected videosSlice1: Video[] = [];
  protected videosSlice2: Video[] = [];
  protected displayOptions: any[] = [
    { icon: 'pi pi-th-large', index: 0 },
    { icon: 'pi pi-bars', index: 1 }
  ];
  protected displayValue: any = this.displayOptions[0];
  protected hideTable: boolean = true;
  protected dialogRef!: DynamicDialogRef;
  protected lang: string;
  public screenWidth: number;

  constructor(private dialogService: DialogService, private translateService: TranslateService) {
    this.lang = translateService.currentLang;
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
    })

    this.videosSlice1 = this.sliceVideos1();
    this.videosSlice2 = this.sliceVideos2();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.first1 = 0;
    this.first2 = 0;
    this.videosSlice1 = this.sliceVideos1();
    this.videosSlice2 = this.sliceVideos2();
  }

  private sliceVideos1(): Video[] {
    return this.videos.slice(this.first1, this.first1 + this.rows1);
  }

  private sliceVideos2(): Video[] {
    return this.videos.slice(this.first2, this.first2 + this.rows2);
  }

  protected onChangeDisplay(): void {
    this.hideTable = !this.hideTable;
  }

  protected onShowDescriptionDialog(video: Video): void {
    this.dialogRef = this.dialogService.open(DescriptionComponent, {
      header: video.originalTitle,
      data: JSON.stringify(video),
      width: "var(--descriptionWidth)",
      modal: true,
      closable: true,
      closeOnEscape: true,
    });
  }

  onPageChange1(event: any) {
    this.first1 = event.first;
    this.rows1 = event.rows;
    this.videosSlice1 = this.sliceVideos1();
  }

  onPageChange2(event: any) {
    this.first2 = event.first;
    this.rows2 = event.rows;
    this.videosSlice2 = this.sliceVideos2();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
