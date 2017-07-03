import { element, VirtualElement } from 'deku';
import { Message, State } from '../TodoController';

type Dispatch = ((msg: Message) => void);

function item(value: string): VirtualElement {
    return element('li', {}, value);
}

function createElement(dispatch: Dispatch): ((evt: Event) => void) {
    return evt => dispatch({
        name: 'createTodo',
        title: "A NEW TODO!",
    });
}

function deleteElement(dispatch: Dispatch): ((evt: Event) => void) {
    return evt => dispatch({
        name: 'deleteTodo',
        id: 0,
    })
}

export function render(state: State, dispatch: Dispatch): VirtualElement {
    return (
        element('ul', {}, [
            element('button', { onClick: createElement(dispatch) }, "Create"),
            element('button', { onClick: deleteElement(dispatch) }, "Delete"),
            ...state.items.map(item),
        ])
    );
}