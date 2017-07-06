export type Tag = string;
export type UniqueId = number;

export class Task {
    id: UniqueId;
    title: string;
    createdTimestamp: Date;
    finishedTimestamp?: Date;
    tags: Tag[];
    dependencies: UniqueId[];

    constructor({ id, title, createdTimestamp, finishedTimestamp, tags, dependencies }:
        { id: UniqueId, title: string, createdTimestamp: Date, finishedTimestamp?: Date, tags: Tag[], dependencies: UniqueId[] }) {
        this.id = id;
        this.title = title;
        this.createdTimestamp = createdTimestamp;
        this.finishedTimestamp = finishedTimestamp;
        this.tags = tags;
        this.dependencies = dependencies;
    }

    addTagEvt(tag: Tag): AddTagTaskEvent {
        return {
            type: TaskEventType.addTag,
            timestamp: new Date(),
            id: this.id,
            tag: tag,
        };
    }

    addDepEvt(dep: Task | UniqueId): AddDepTaskEvent {
        let depId = dep instanceof Task ? dep.id : dep;
        return {
            type: TaskEventType.addDep,
            timestamp: new Date(),
            id: this.id,
            dep: depId,
        };
    }

    finishEvt(): FinishTaskEvent {
        return {
            type: TaskEventType.finish,
            timestamp: new Date(),
            id: this.id,
        };
    }

}

enum TaskEventType {
    create = 'create',
    addTag = 'addTag',
    addDep = 'addDependency',
    finish = 'finish',
}

type CreateTaskEvent = { type: TaskEventType.create, timestamp: Date, id: UniqueId, title: string }
type AddTagTaskEvent = { type: TaskEventType.addTag, timestamp: Date, id: UniqueId, tag: Tag }
type AddDepTaskEvent = { type: TaskEventType.addDep, timestamp: Date, id: UniqueId, dep: UniqueId }
type FinishTaskEvent = { type: TaskEventType.finish, timestamp: Date, id: UniqueId }

type TaskEvent
    = CreateTaskEvent
    | AddTagTaskEvent
    | AddDepTaskEvent
    | FinishTaskEvent

export class TaskLog {
    private events: TaskEvent[];
    private tasks: { [id: number]: Task };
    private liveTasks: UniqueId[];
    private idCounter: UniqueId;

    constructor() {
        this.events = [];
        this.tasks = {};
        this.liveTasks = [];
        this.idCounter = 0;
    }

    createTask(title: string, timestamp?: Date): Task {
        // @Todo: This should be a unique id derived from a counter, the user, and the device
        if (!timestamp) {
            timestamp = new Date();
        }
        let id = ++this.idCounter;
        this.event({
            type: TaskEventType.create,
            timestamp, id, title,
        });
        return this.getTaskForId(id);
    }

    event(evt: TaskEvent) {
        this.events.push(evt);
        if (!evt.timestamp) {
            evt = { ...evt, timestamp: new Date() };
        }

        let task = this.tasks[evt.id];
        switch (evt.type) {
            case TaskEventType.create: {
                if (task) { break; }
                this.tasks[evt.id] = new Task({
                    id: evt.id,
                    title: evt.title,
                    createdTimestamp: evt.timestamp,
                    tags: [],
                    dependencies: [],
                });
                this.liveTasks.push(evt.id);
                break;
            }
            case TaskEventType.addTag: {
                if (!task) { break; }
                this.tasks[evt.id] = new Task({ ...task, tags: listSetAdd(task.tags, evt.tag) });
                break;
            }
            case TaskEventType.addDep: {
                if (!task) { break; }
                this.tasks[evt.id] = new Task({ ...task, dependencies: listSetAdd(task.dependencies, evt.dep) });
                break;
            }
            case TaskEventType.finish: {
                if (!task) { break; }
                let idx = this.liveTasks.indexOf(evt.id);
                if (idx !== -1) {
                    this.liveTasks.splice(idx, 1);
                }
                break;
            }
        }
    }

    getTasks(): Task[] {
        return this.liveTasks.map(id => this.tasks[id]);
    }

    getTaskForId(id: UniqueId): Task | undefined {
        return this.tasks[id];
    }
}

function listSetAdd<T>(tags: T[], newTag: T): T[] {
    if (tags.indexOf(newTag) >= 0) {
        return tags;
    }
    return [...tags, newTag];
}