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

export enum TaskEventType {
    create = 'create',
    addTag = 'addTag',
    addDep = 'addDependency',
    finish = 'finish',
}

export type TaskEvent
    = { type: TaskEventType.create, timestamp: Date, id: UniqueId, title: string }
    | { type: TaskEventType.addTag, timestamp: Date, id: UniqueId, tag: Tag }
    | { type: TaskEventType.addDep, timestamp: Date, id: UniqueId, dep: UniqueId }
    | { type: TaskEventType.finish, timestamp: Date, id: UniqueId }

export class TaskLog {
    private events: TaskEvent[];
    private tasks: { [id: number]: Task };

    constructor() {
        this.events = [];
        this.tasks = {};
    }

    event(evt: TaskEvent) {
        this.events.push(evt);
        if (!evt.timestamp) {
            evt = { ...evt, timestamp: new Date() };
        }

        switch (evt.type) {
            case TaskEventType.create: {
                this.tasks[evt.id] = {
                    id: evt.id,
                    title: evt.title,
                    createdTimestamp: evt.timestamp,
                    tags: [],
                    dependencies: [],
                };
                break;
            }
            case TaskEventType.addTag: {
                let task = this.tasks[evt.id];
                if (!task) { break; }
                this.tasks[evt.id] = { ...task, tags: listSetAdd(task.tags, evt.tag) };
                break;
            }
            case TaskEventType.addDep: {
                let task = this.tasks[evt.id];
                if (!task) { break; }
                this.tasks[evt.id] = { ...task, dependencies: listSetAdd(task.dependencies, evt.dep) };
                break;
            }
            case TaskEventType.finish: {
                let task = this.tasks[evt.id];
                if (!task) { break; }
                delete this.tasks[evt.id];
                break;
            }
        }
    }

    getTasks(): Task[] {
        return Object.keys(this.tasks).map(k => this.tasks[k]);
    }
}

function listSetAdd<T>(tags: T[], newTag: T): T[] {
    if (tags.indexOf(newTag) >= 0) {
        return tags;
    }
    return [...tags, newTag];
}