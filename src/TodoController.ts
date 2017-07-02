import { State, Message } from './TodoController';
import { UniqueId } from './Task';

export type State = {
    counter: number,
    items: string[],
};

export type Message
    = { name: 'createTodo', title: string }
    | { name: 'deleteTodo', id: UniqueId }

export function update(state: State, message: Message): State {
    switch (message.name) {
        case 'createTodo':
            return {
                counter: state.counter + 1,
                items: [...state.items, `Create ${message.title} (${state.counter})`],
            };
        case 'deleteTodo':
            return {
                ...state,
                items: [...state.items, `Delete ${message.id}`],
            };
    }
}

export function init(): State {
    return {
        counter: 0,
        items: [],
    };
}