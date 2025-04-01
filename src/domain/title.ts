export class Title {
  title!: string;
  shortTitle!: string;

  static titleComparator(t1: Title, t2: Title): number {
    return t1.title.localeCompare(t2.title, 'en');
  }

  static shortTitleComparator(t1: Title, t2: Title): number {
    return t1.shortTitle.localeCompare(t2.shortTitle, 'en');
  }
}