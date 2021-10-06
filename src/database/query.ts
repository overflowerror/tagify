type CountedTag = {
    name: string,
    count: number
}


class Query {
    private readonly files: MediaFile[]

    public constructor(files: MediaFile[]) {
        this.files = [...files]
    }

    public tags(): string[] {
        return this.files
            .map(f => f.getTags())
            .flat()
            .filter((v, i, s) => s.indexOf(v) == i)
    }

    public countedTags(): CountedTag[] {
        return this.tags()
            .map(t => ({
                name: t,
                count: this.files
                    .filter(f => f.hasTag(t))
                    .length
            }))
    }

    public count(): number {
        return this.files.length
    }

    public has(tag: string): Query {
        return new Query(
            this.files.filter(f => f.hasTag(tag))
        )
    }

    public hasNot(tag: string): Query {
        return new Query(
            this.files.filter(f => !f.hasTag(tag))
        )
    }

    public is(type: MediaFileType): Query {
        return new Query(
            this.files.filter(f => f.getType() == type)
        )
    }

    public get(): MediaFile[] {
        return this.files
    }
}