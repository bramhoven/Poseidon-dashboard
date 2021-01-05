export class CloudProvider {
    public id: string;
    public name: string;
    public slug: string;

    constructor(id: string, name: string, slug: string) {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }
}