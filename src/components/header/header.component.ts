import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { ThemeService } from 'src/services/theme.service';

interface Lang {
  code: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit, OnDestroy {
  protected langs: Lang[] = [{ code: "en", name: "English" }, { code: "fr", name: "Français" }];
  protected selectedLang!: Lang;
  protected items: MenuItem[] = [];
  protected activeItem: MenuItem | undefined;
  protected darkTheme: boolean = false;

  private ITEMS: MenuItem[] = [
    {
      label: 'menu.home',
      icon: 'pi pi-microphone',
      routerLink: '/',
      skipLocationChange: true,
    },
    {
      separator: true
    },
    {
      label: 'menu.guests',
      icon: 'pi pi-users',
      routerLink: '/guests',
      skipLocationChange: true,
    },
    {
      label: 'menu.titles',
      icon: 'pi pi-book',
      routerLink: '/titles',
      skipLocationChange: true,
    },
    {
      label: 'menu.tags',
      icon: 'pi pi-tag',
      routerLink: '/tags',
      skipLocationChange: true,
    },
    {
      label: 'menu.dates',
      icon: 'pi pi-calendar',
      routerLink: '/dates',
      skipLocationChange: true,
    },
    {
      separator: true
    },
    {
      label: 'menu.about',
      icon: 'pi pi-info-circle',
      routerLink: '/about',
      skipLocationChange: true,
    },
  ];

  constructor(private translateService: TranslateService, private primeConfig: PrimeNGConfig,
    private themeService: ThemeService) {
    const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkTheme = prefersColorScheme.matches;
    this.setTheme();
  }

  ngOnInit(): void {
    let lang: Lang = this.langs[0];
    const browserLang = this.translateService.getBrowserLang();

    if (browserLang) {
      const code = browserLang.match(/en|fr/) ? browserLang : 'en';
      lang = this.findLang(code);
    }

    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');
    this.setLang(lang);
    this.items = this.ITEMS;

    // https://github.com/primefaces/primeng/issues/9256
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      let copyItems = JSON.parse(JSON.stringify(this.ITEMS));
      this.processMenuTranslation(copyItems);
      this.items = copyItems;
    })

    // https://dev.to/yigitfindikli/primeng-i18n-api-usage-with-ngx-translate-3bh2
    // https://stackoverflow.com/questions/62874602/internationalization-of-p-calendar-primeng-i18next
    this.translateService.stream('primeng').subscribe(data => {
      this.primeConfig.setTranslation(data);
    });
  }

  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

  private processMenuTranslation(items: MenuItem[]) {
    for (let item of items) {
      if (item.separator) {
        continue;
      }

      item.label = this.translateService.instant(item.label!);

      if (item.items) {
        this.processMenuTranslation(item.items);
      }
    }
  }

  private findLang(code: string): Lang {
    let result: Lang = this.langs.find(lang => lang.code === code)!;

    if (!result) {
      result = this.langs[0];
    }

    return result;
  }

  private setLang(lang: Lang) {
    if (lang) {
      this.translateService.use(lang.code);
      this.translateService.get('primeng').subscribe(res => this.primeConfig.setTranslation(res));
      this.selectedLang = lang;
    }
  }

  protected onLangChange() {
    this.setLang(this.selectedLang);
  }

  protected onThemeChange() {
    this.setTheme();
  }

  private setTheme() {
    if (this.darkTheme) {
      this.themeService.switchTheme('dark-theme');
    }
    else {
      this.themeService.switchTheme('light-theme');
    }
  }
}
