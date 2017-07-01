import { UniqueId, Tag } from '../task';

export type Message
    = { name: "createTodo", title: string, tags: Tag[], parent?: UniqueId }
    | { name: "addSubtask", parent: UniqueId, subtask: UniqueId }
    | { name: "finishTodo", id: UniqueId }

export interface Controller {
    postMessage(message: Message): void;
}