import { createApp, VirtualElement } from 'deku'
import { init, update, State, Message } from './TodoController';
import * as TodoList from './components/TodoList';

let render = createApp(document.body);

function main(state: State) {
    let vnode = TodoList.render(state, (msg: Message) => {
        let nextState = update(state, msg);
        main(nextState);
    });
    render(vnode);
}

main(init());
