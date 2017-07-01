type Tag = string;
type UniqueID = number;


class task {
    ID: UniqueID;
    title: string;
    createdTimestamp: Date;
    finishedTimestamp: Date | null;
    tags: Tag[];
    dependencies: UniqueID[];
}
