const tasks = [];

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
    tasks.push(newTask);
}

export { Task, addTask, tasks };