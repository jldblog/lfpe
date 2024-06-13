import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Video } from 'src/domain/video';

@Component({
    selector: 'app-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.sass']
})

export class DescriptionComponent implements OnInit {
    private HEADERS: string[] = ['CONNECT', 'CORRECTIONS', 'EDIT NOTE', 'EPISODE LINKS',
        'PODCAST INFO', 'SOCIAL', 'SPONSORS', 'TRANSCRIPT'];
    private IN_BOLD: string[] = ['Please support this channel', 'Please support this podcast'];
    protected video!: Video;
    protected cleanedDescription: string = '';
    protected info: string = '';
    protected outline: string = '';
    protected transcript: string = '';
    protected lang: string;
    protected publishedDate!: Date;
    protected descriptionEmpty: boolean = false;

    constructor(public config: DynamicDialogConfig, private translateService: TranslateService) {
        this.lang = translateService.currentLang;
    }

    ngOnInit() {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = this.translateService.currentLang;
        })

        this.video = JSON.parse(this.config.data);
        this.publishedDate = new Date(this.video.publishedAt);

        if (this.video.description) {
            this.descriptionEmpty = false;
            this.cleanedDescription = this.descriptionCleaner(this.video.description);
        }
        else {
            this.descriptionEmpty = true;
        }
    }

    descriptionCleaner(description: string): string {
        let result: string = '';

        const info = this.extractGuestInfo(description);
        const outline = this.extractOutline(description);
        const transcript = this.extractTranscript(description);

        result = this.removeGuestInfo(description, info);
        result = this.removeOutline(result, outline);
        result = this.removeTranscript(result, transcript);
        result = this.decorateHeaders(result);
        result = this.boldify(result);
        result = this.urlify(result);
        result = result.trim();
        result = result.replaceAll('\n', '<br />');

        this.info = this.guestNameInBold(info);
        this.info = this.urlify(this.info);
        this.outline = this.decorateOutline(outline);
        this.transcript = this.decorateTranscript(transcript);

        return result;
    }

    guestNameInBold(text: string): string {
        return text.replace(this.video.guest, '<b>' + this.video.guest + '</b>');;
    }

    extractGuestInfo(text: string): string {
        let info: string = '';
        const regexp1 = /^(.*\n)/;
        const matches1 = text.match(regexp1);

        if (matches1) {
            info = matches1[0];
            const regexp2 = /^(.*)( Please support this .*)/;
            const matches2 = info.match(regexp2);

            if (matches2) {
                info = matches2[1];
            }
        }

        return info;
    }

    removeGuestInfo(text: string, info: string): string {
        return text.replace(info, '');
    }

    extractTranscript(text: string): string {
        let transcript: string = '';
        const regexp = /TRANSCRIPT:\n(https:.*\n)\n/;
        const matches = text.match(regexp);

        if (matches) {
            transcript = matches[0];
        }

        return transcript;
    }

    removeTranscript(text: string, transcript: string): string {
        let result: string = text;

        if (transcript) {
            result = text.replace(transcript, '');
        }

        return result;
    }

    decorateTranscript(transcript: string): string {
        transcript = this.urlify(transcript);
        transcript = this.decorateHeader(transcript, 'TRANSCRIPT:');
        transcript = transcript.trim();
        transcript = transcript.replaceAll('\n', '<br />');

        return transcript;
    }

    extractOutline(text: string): string {
        let outline: string = '';
        const regexp = /OUTLINE:\n(.*\n)+\n/;
        const matches = text.match(regexp);

        if (matches) {
            outline = matches[0];
        }

        return outline;
    }

    removeOutline(text: string, outline: string): string {
        return text.replace(outline, '');
    }

    decorateOutline(outline: string): string {
        outline = this.urlifyChapters(outline);
        outline = this.decorateHeader(outline, 'OUTLINE:');
        outline = outline.trim();
        outline = outline.replaceAll('\n', '<br />');

        return outline;
    }

    decorateHeaders(text: string): string {
        let result: string = text;

        for (const header of this.HEADERS) {
            result = this.decorateHeader(result, header);
        }

        return result;
    }

    decorateHeader(text: string, header: string): string {
        return text.replaceAll(header, "<b>" + header + "</b>");
    }

    boldify(text: string) {
        let result: string = text;

        for (const inbold of this.IN_BOLD) {
            result = result.replaceAll(inbold, "<b>" + inbold + "</b>");
        }

        return result;
    }

    urlify(text: string): string {
        const regexp = /(https?:\/\/[^\s]+)/g;

        return text.replace(regexp, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    }

    urlifyChapters(text: string): string {
        let result: string = text;
        const regexp = /(\d+):(\d+)(:)?(\d+)?(.*)/g;
        const matches = text.matchAll(regexp);

        for (const match of matches) {
            let time: string = '00:00:00';

            if (match[3]) {
                time = match[1] + ':' + match[2] + ':' + match[4];
            }
            else {
                time = match[1] + ':' + match[2];
            }

            let seconds = this.convertToSeconds(time);
            let link = 'https://www.youtube.com/watch?v=' + this.video.id + '&t=' + seconds + 's';
            let line = '<a target="_blank" rel="noopener noreferrer" href="' + link + '">' + time + '</a>' + match[5];
            result = result.replace(match[0], line);
        }

        return result;
    }

    convertToSeconds(hms: string): number {
        var result: number = 0;
        const values = hms.split(':');

        if (values.length == 3) {
            result = parseInt(values[0]) * 3600 + parseInt(values[1]) * 60 + parseInt(values[2]);
        }
        else if (values.length == 2) {
            result = parseInt(values[0]) * 60 + parseInt(values[1]);
        }
        else {
            result = parseInt(values[0]);
        }

        return result;
    }
}