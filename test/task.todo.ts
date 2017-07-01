import { expect } from 'chai';
import { Task } from '../src/Task';

describe("Task", () => {
    it("should create a task", () => {
        let task: Task = {
            id: 0,
            title: "Do homework",
            createdTimestamp: new Date(),
            tags: ["HW", "281"],
            dependencies: [],
        };
        expect(task.finishedTimestamp).undefined;
    });
});