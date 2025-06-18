import { lists } from "./listManager"
const { compareAsc } = require("date-fns");

const allTasks = [];

class Task {
    constructor(title, description, dueDate, priority, list) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = false;
        this.list = list;
    }

    check() {
        this.checked = true;
        console.log(`${this.title} was checked!`)
    }

    uncheck() {
        this.checked = false;
        console.log(`${this.title} was unchecked!`)
    }
}

function addTask(title, des, dueDate, priority, list) {
    const newTask = new Task(title, des, dueDate, priority, list);

    allTasks.push(newTask);
    sortTasksByDate(allTasks);
    console.log(allTasks);

    if (list !== "default") {
        newTask.list.tasks.push(newTask);
    }
}

function sortTasksByDate(taskArr) {
    const taskDates = [];
    const sortedArr = [];

    for (const task of taskArr) {
        taskDates.push(task.dueDate);
    }

    taskDates.sort(compareAsc);
    console.log(taskDates);

    for (const date of taskDates) {
        for (const task of taskArr) {
            if (task.dueDate === date) {
                sortedArr.push(task);
                break;
            }
        }
    }

    taskArr.length = 0;
    
    for (const task of sortedArr) {
        taskArr.push(task);
    }
}

export { Task, addTask, allTasks };