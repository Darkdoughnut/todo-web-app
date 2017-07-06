import { expect } from 'chai';
import { Task, TaskLog } from '../src/Task';

describe("Task", () => {
    it("Should create a task with the constructor", () => {
        let task = new Task({
            id: 0,
            title: "Do homework",
            createdTimestamp: new Date(),
            tags: ["HW", "281"],
            dependencies: [],
        });
        expect(task.finishedTimestamp).undefined;
    });

    it("Should create task events", () => {
        let task = new Task({
            id: 13,
            title: "Create a task",
            createdTimestamp: new Date(),
            tags: [],
            dependencies: [],
        });
        expect(task.addDepEvt(1).id).eql(task.id);
        expect(task.addDepEvt(42).dep).eql(42);
        expect(task.addTagEvt('Code:Todo-App').id).eql(task.id)
        expect(task.addTagEvt('Code:Todo-App').tag).eql('Code:Todo-App');
        expect(task.finishEvt().id).eql(task.id);
    });
});

describe("TaskLog", () => {
    it("Should create tasks in the tasklog", () => {
        let taskLog = new TaskLog();
        let startDate = new Date();
        let task1 = taskLog.createTask("Hello, World", startDate);
        expect(taskLog.getTasks()).eql([task1]);
        expect(taskLog.getTasks()).eql([new Task({
            id: task1.id,
            title: 'Hello, World',
            createdTimestamp: startDate,
            tags: [],
            dependencies: [],
        })]);
        let date2 = new Date();
        let task2 = taskLog.createTask("coi lo plini");
        expect(taskLog.getTasks()).eql([task1, task2]);
        expect(taskLog.getTasks()).eql([new Task({
            id: task1.id,
            title: 'Hello, World',
            createdTimestamp: startDate,
            tags: [],
            dependencies: [],
        }),
        new Task({
            id: task2.id,
            title: 'coi lo plini',
            createdTimestamp: date2,
            tags: [],
            dependencies: [],
        })]);
    });

    it("Should add tags to tasks", () => {
        let taskLog = new TaskLog();
        let task = taskLog.createTask('Make bread');
        expect(taskLog.getTasks().map(x => x.tags)).eql([[]]);
        taskLog.event(task.addTagEvt('Cooking'));
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Cooking']]);
        taskLog.event(task.addTagEvt('Bread'));
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Cooking', 'Bread']]);
    });

    it("Shouldn't add duplicate tags", () => {
        let taskLog = new TaskLog();
        let task = taskLog.createTask("Integration junk");
        expect(taskLog.getTasks().map(x => x.tags)).eql([[]]);
        taskLog.event(task.addTagEvt('Homework'));
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Homework']]);
        taskLog.event(task.addTagEvt('Homework'));
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Homework']]);
    });

    it("Should add dependencies", () => {
        let taskLog = new TaskLog();
        let task1 = taskLog.createTask("Task A");
        let task2 = taskLog.createTask("Task B");
        taskLog.event(task1.addDepEvt(task2));
        let tasks = taskLog.getTasks();
        expect(tasks.map(x => x.title)).eql(["Task A", "Task B"]);
        expect(tasks.map(x => x.dependencies)).eql([[task2.id], []]);
    });

    it("Should remove tasks", () => {
        let taskLog = new TaskLog();
        let task = taskLog.createTask("A pointless task");
        expect(taskLog.getTasks().length).eql(1);
        taskLog.event(task.finishEvt());
        expect(taskLog.getTasks().length).eql(0);
    });
});