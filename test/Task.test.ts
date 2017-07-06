import { expect } from 'chai';
import { Task, TaskLog, TaskEventType, TaskEvent } from '../src/Task';

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

describe("TaskLog", () => {
    it("Should create tasks in the tasklog", () => {
        let taskLog = new TaskLog();
        let startDate = new Date();
        taskLog.event({
            type: TaskEventType.create,
            timestamp: startDate,
            id: 0,
            title: 'Hello, World',
        });
        expect(taskLog.getTasks()).eql([{
            id: 0,
            title: 'Hello, World',
            createdTimestamp: startDate,
            tags: [],
            dependencies: [],
        }]);
        let date2 = new Date();
        taskLog.event({
            type: TaskEventType.create,
            timestamp: date2,
            id: 1,
            title: 'coi lo plini',
        });
        expect(taskLog.getTasks()).eql([{
            id: 0,
            title: 'Hello, World',
            createdTimestamp: startDate,
            tags: [],
            dependencies: [],
        },
        {
            id: 1,
            title: 'coi lo plini',
            createdTimestamp: date2,
            tags: [],
            dependencies: [],
        }]);
    });

    it("Should add tags to tasks", () => {
        let taskLog = new TaskLog();
        taskLog.event({
            type: TaskEventType.create,
            timestamp: new Date(),
            id: 0,
            title: 'Make bread',
        });
        expect(taskLog.getTasks().map(x => x.tags)).eql([[]]);
        taskLog.event({
            type: TaskEventType.addTag,
            timestamp: new Date(),
            id: 0,
            tag: 'Cooking',
        });
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Cooking']]);
        taskLog.event({
            type: TaskEventType.addTag,
            timestamp: new Date(),
            id: 0,
            tag: 'Bread',
        });
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Cooking', 'Bread']]);
    });

    it("Shouldn't add duplicate tags", () => {
        let taskLog = new TaskLog();
        taskLog.event({
            type: TaskEventType.create,
            timestamp: new Date(),
            id: 0,
            title: 'Integration junk',
        });
        expect(taskLog.getTasks().map(x => x.tags)).eql([[]]);
        let homeworkTag: TaskEvent = {
            type: TaskEventType.addTag,
            timestamp: new Date(),
            id: 0,
            tag: 'Homework',
        };
        taskLog.event({ ...homeworkTag });
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Homework']]);
        taskLog.event({ ...homeworkTag });
        expect(taskLog.getTasks().map(x => x.tags)).eql([['Homework']]);
    });

    it("Should add dependencies", () => {
        let taskLog = new TaskLog();
        taskLog.event({
            type: TaskEventType.create,
            timestamp: new Date(),
            id: 0,
            title: 'Task A',
        });
        taskLog.event({
            type: TaskEventType.create,
            timestamp: new Date(),
            id: 1,
            title: 'Task B',
        });
        taskLog.event({
            type: TaskEventType.addDep,
            timestamp: new Date(),
            id: 0,
            dep: 1,
        });
        let tasks = taskLog.getTasks();
        expect(tasks.map(x => x.title)).eql(['Task A', 'Task B']);
        expect(tasks.map(x => x.id)).eql([0, 1]);
        expect(tasks.map(x => x.dependencies)).eql([[1], []]);
    });

    it("Should remove tasks", () => {
        let taskLog = new TaskLog();
        taskLog.event({
            type: TaskEventType.create,
            timestamp: new Date(),
            id: 0,
            title: 'A pointless task',
        });
        expect(taskLog.getTasks().length).eql(1);
        taskLog.event({
            type: TaskEventType.finish,
            timestamp: new Date(),
            id: 0,
        });
        expect(taskLog.getTasks().length).eql(0);
    });
});