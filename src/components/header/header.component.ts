import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
import { PrimeNG } from 'primeng/config';

interface Lang {
  code: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  protected langs: Lang[] = [{ code: "en", name: "English" }, { code: "fr", name: "Français" }];
  protected selectedLang!: Lang;
  protected items: MenuItem[] = [];
  protected activeItem: MenuItem | undefined;
  protected isDarkMode: boolean = false;

  private ITEMS: MenuItem[] = [
    {
      label: 'menu.home',
      icon: 'pi pi-microphone',
      routerLink: '/',
      skipLocationChange: true,
      value: 1,
    },
    {
      separator: true
    },
    {
      label: 'menu.guests',
      icon: 'pi pi-users',
      routerLink: '/guests',
      skipLocationChange: true,
      value: 2,
    },
    {
      label: 'menu.titles',
      icon: 'pi pi-book',
      routerLink: '/titles',
      skipLocationChange: true,
      value: 3,
    },
    {
      label: 'menu.rounds',
      icon: 'pi pi-circle',
      routerLink: '/rounds',
      skipLocationChange: true,
      value: 4,
    },
    {
      label: 'menu.tags',
      icon: 'pi pi-tag',
      routerLink: '/tags',
      skipLocationChange: true,
      value: 5,
    },
    {
      label: 'menu.dates',
      icon: 'pi pi-calendar',
      routerLink: '/dates',
      skipLocationChange: true,
      value: 6,
    },
    {
      separator: true
    },
    {
      label: 'menu.about',
      icon: 'pi pi-info-circle',
      routerLink: '/about',
      skipLocationChange: true,
      value: 7,
    },
  ];

  constructor(private translateService: TranslateService, private primeConfig: PrimeNG, @Inject(DOCUMENT) private document: Document) {
    const prefersColorScheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    this.isDarkMode = prefersColorScheme.matches;
    this.onToggleChange();
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
    // https://stackoverflow.com/questions/62874602/internationalization-of-p-datepicker-primeng-i18next
    this.translateService.stream('primeng').subscribe(data => {
      this.primeConfig.setTranslation(data);
    });
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

  protected onToggleChange() {
    this.isDarkMode = !this.isDarkMode;
    const element = document.querySelector('html');
    this.isDarkMode ? element?.classList.add('dark') : element?.classList.remove('dark');
    var theme: string = element?.classList.contains('dark') ? 'dark-theme' : 'light-theme';
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    themeLink.href = theme + '.css';
  }
}
