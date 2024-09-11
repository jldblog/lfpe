export class Guest {
    name!: string

    static guestsComparator(guest1: Guest, guest2: Guest): number {
        return guest1.name.localeCompare(guest2.name, 'en');
    }
}