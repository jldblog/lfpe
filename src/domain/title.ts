export class Title {
    title!: string;
    id?: string;
    index?: number;

    static titleComparator(t1: Title, t2: Title): number {
        return t1.title.localeCompare(t2.title, 'en');
    }
}