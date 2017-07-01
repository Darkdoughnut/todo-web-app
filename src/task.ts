export type Tag = string;
export type UniqueId = number;

export class Task {
    id: UniqueId;
    title: string;
    createdTimestamp: Date;
    finishedTimestamp?: Date;
    tags: Tag[];
    dependencies: UniqueId[];
}
