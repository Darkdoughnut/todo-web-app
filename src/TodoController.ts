import { View } from "./interface/View";
import { TodoState } from './TodoState';
import { Message } from "./interface/Controller";

export class TodoController {
    state: TodoState;
    view: View<TodoState>;
    constructor(view: View<TodoState>) {
        this.state = new TodoState();
        this.view = view;
        this.view.setController(this);
        this.view.updateView(this.state);
    }

    postMessage(message: Message) {
        this.state.addMessage(message);
        this.view.updateView(this.state);
    }
}