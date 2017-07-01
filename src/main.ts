import { View } from './interface/view';
import { TodoController } from "./TodoController";
import { TodoView } from "./TodoView";

let view = new TodoView();
let controller = new TodoController(view);

function draw() {
    requestAnimationFrame(draw);
    view.render(document.body);
}

draw();