import { Controller } from './controller';

export interface View<Data> {
    setController(controller: Controller): void;
    updateView(object: Data): void;
    render(into: Element): void;
}