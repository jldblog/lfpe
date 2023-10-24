import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'tinyduration'

@Pipe({ name: 'duration' })
export class DurationToHMS implements PipeTransform {
    transform(duration: string): string {
        const d = parse(duration);
        const h = d.hours ? d.hours : 0;
        const m = d.minutes ? d.minutes : 0;
        const s = d.seconds ? d.seconds : 0;
        const date = new Date(1789, 6, 14, h, m, s);

        return date.toTimeString().split(' ')[0]
    }
}