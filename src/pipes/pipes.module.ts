import { NgModule } from '@angular/core';
import { DurationToHMS } from './duration.pipe';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
    declarations: [
        DurationToHMS,
        HighlightPipe
    ],
    imports: [],
    exports: [
        DurationToHMS,
        HighlightPipe
    ]
})

export class PipesModule { }