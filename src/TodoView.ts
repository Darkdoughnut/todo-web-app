import { Controller, Message } from "./interface/controller";
import { TodoState } from "./TodoState";
import { Tag, UniqueId } from "./task";

export class TodoView {
    controller: Controller;
    lastFrameItemCount: number = 0;
    state: TodoState;

    setController(controller: Controller) {
        this.controller = controller;
    }

    updateView(object: TodoState) {
        this.state = object;
    }

    makeButtonHandler() {
        let controller = this.controller;
        return function (this: HTMLButtonElement, ev: MouseEvent) {
            const kind = Math.floor(Math.random() * 3);
            let randomMessage: Message;
            switch (kind) {
                case 0:
                    randomMessage = { name: 'createTodo', title: randomString(), tags: randomTags() };
                    break;
                case 1:
                    randomMessage = { name: 'addSubtask', parent: randomId(), subtask: randomId() };
                    break;
                case 2:
                    randomMessage = { name: 'finishTodo', id: randomId() };
                    break;
            }
            controller.postMessage(randomMessage);
        }
    }

    // TODO: Switch to using react/inferno/etc
    render(root: Element) {
        let generateMessageButton = root.getElementsByClassName('event-button')[0];
        if (!generateMessageButton) {
            generateMessageButton = document.createElement('button');
            generateMessageButton.className = 'event-button';
            generateMessageButton.innerHTML = "GENERATE AN EVENT";
            generateMessageButton.addEventListener('click', this.makeButtonHandler());
            root.appendChild(generateMessageButton);
        }

        let eventList = root.getElementsByClassName('event-list')[0];
        if (!eventList) {
            const eventList = document.createElement('ul');
            eventList.className = 'event-list';
            root.appendChild(eventList);
        }

        const childCount = eventList.childElementCount;

        for (let i = childCount; i < this.state.messageLog.length; ++i) {
            const msg = this.state.messageLog[i];
            const msgNode = document.createElement('li');
            msgNode.innerText = JSON.stringify(msg);
            eventList.appendChild(msgNode);
        }
    }
}

function randomId(): UniqueId {
    return 0;
}

function randomString(): string {
    return "banana";
}

function randomTags(): Tag[] {
    const numTags = Math.random() * 4;
    let tags = [];
    for (let i = 0; i < numTags; ++i) {
        tags.push(randomString());
    }
    return tags;
}
