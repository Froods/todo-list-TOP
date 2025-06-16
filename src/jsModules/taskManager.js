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

export { Task };