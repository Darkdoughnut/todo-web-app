import { Message } from "./interface/controller";

export class TodoState {
    messageLog: Message[];
    constructor() {
        this.messageLog = [];
    }

    addMessage(message: Message) {
        this.messageLog.push(message);
    }
}