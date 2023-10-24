import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { ScrollTopModule } from 'primeng/scrolltop';
import { AboutModule } from 'src/components/about/about.module';
import { DescriptionModule } from 'src/components/description/description.module';
import { FooterModule } from 'src/components/footer/footer.module';
import { HeaderModule } from 'src/components/header/header.module';
import { HomeModule } from 'src/components/home/home.module';
import { DateSearchModule } from 'src/components/search/date-search/date-search.module';
import { GuestSearchModule } from 'src/components/search/guest-search/guest-search.module';
import { ResultsModule } from 'src/components/search/results/results.module';
import { TagSearchModule } from 'src/components/search/tag-search/tag-search.module';
import { TitleSearchModule } from 'src/components/search/title-search/title-search.module';
import { StatisticsModule } from 'src/components/statistics/statistics.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { DatabaseService } from 'src/services/database.service';
import { InitService } from 'src/services/init.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
registerLocaleData(localeFr);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initApp(appInitService: InitService) {
  return (): Promise<any> => {
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    // APP
    AboutModule,
    DateSearchModule,
    DescriptionModule,
    FooterModule,
    GuestSearchModule,
    HeaderModule,
    HomeModule,
    PipesModule,
    ResultsModule,
    TagSearchModule,
    TitleSearchModule,
    StatisticsModule,
    // PrimeNG
    MessagesModule,
    ScrollTopModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    InitService,
    DatabaseService,
    DialogService,
    MessageService,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [InitService], multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  exports: [
    TranslateModule
  ]
})

export class AppModule { }
