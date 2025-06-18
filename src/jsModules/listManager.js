import { allTasks } from "./taskManager";
const { format } = require("date-fns");

class List {
    constructor(title, special) {
        this.title = title;
        this.element = document.createElement("button");
        this.element.textContent = this.title;
        this.class = this.title.replace(/ /g, "-");
        this.element.classList.add(`${this.class}`, "list-button");
        this.special = special;
        if (special) {
            this.element.classList.add("special");
        }
        this.tasks = [];

        this.div = document.createElement("div");
        this.div.classList.add(`${title}-div`, "list-div");

        this.element.addEventListener("click", () => {
            this.drawTasks();
        });
    }

    drawTasks() {

        const oldSelect = document.querySelector(".selected");
        oldSelect.classList.remove("selected");
        this.element.classList.add("selected");

        const parent = document.querySelector(".task-container");
        
        if (parent.firstChild !== parent.lastChild) {
            while (parent.lastChild.firstChild) {
                parent.lastChild.removeChild(parent.lastChild.firstChild);
            }
            parent.removeChild(parent.lastChild);
        }

        parent.appendChild(this.div);

        if (this.special) {
            if (this.title === "Inbox") {
                for (const task of allTasks) {
                    if (!task.checked) {
                        this.addTaskElem(task)
                    }
                }
            }
            if (this.title === "Today") {
                const today = new Date();
                for (const task of allTasks) {
                    if (!task.checked && today.getFullYear() === task.dueDate.getFullYear() && today.getMonth() === task.dueDate.getMonth() && today.getDate() === task.dueDate.getDate()) {
                        this.addTaskElem(task)
                    }
                }
            }
            if (this.title === "Finished") {
                for (const task of allTasks) {
                    if (task.checked) {
                        this.addTaskElem(task)
                    }
                }
            }
        } else {
            for (const task of this.tasks) {
                if (!task.checked) {
                    this.addTaskElem(task)
                }
            }
        }

        
    }
    addTaskElem(task) {
        const bufferElem = document.createElement("div");
        bufferElem.classList.add("buffer-element")
        const taskElem = document.createElement("div");
        taskElem.classList.add("task-element")
        
        // Priority color
        const priorityDiv = document.createElement("div");
        priorityDiv.classList.add(`priority-${task.priority}`);
        taskElem.appendChild(priorityDiv);

        // Checkbox
        const checkbox = task.checkboxElem;
        taskElem.appendChild(checkbox);

        // Title + description

            // Div
            const textDiv = document.createElement("div");
            textDiv.classList.add("text-div");
            taskElem.appendChild(textDiv);

            // Title
            const title = document.createElement("h3");
            title.textContent = task.title;
            textDiv.appendChild(title);

            // Description
            const description = document.createElement("p");
            description.textContent = task.description;
            textDiv.appendChild(description)

        // Duedate
        const dueDate = document.createElement("p");
        dueDate.textContent = format(task.dueDate, "dd-MMM-yyyy");
        taskElem.appendChild(dueDate);

        bufferElem.appendChild(taskElem);
        this.div.appendChild(bufferElem);
    }

}

const listInbox = new List("Inbox", true);
const listToday = new List("Today", true);
const listFinished = new List("Finished", true);

listInbox.element.classList.add("selected");

const lists = [listInbox, listToday, listFinished];

// Add list
function addList(list, nav) {
    const newList = new List(list, false);
    lists.push(newList);

    clearLists(nav);
    loadLists(lists, nav);
}

// Load lists
function loadLists(listArr, nav) {
    for (const list of listArr) {
        nav.appendChild(list.element);
    }
}

// Clear lists
function clearLists(nav) {
    for (const list of nav.children) {
        if (list.classList.contains("list-button") && !list.classList.contains("special")) {
            nav.removeChild(list);
        }
    }
}

// Render list options
function renderOptions(select) {
    for (const list of lists) {
        if (!list.special) {
            const listOption = document.createElement("option");
            listOption.setAttribute("value", list.title);
            listOption.innerHTML = list.title;
            select.appendChild(listOption);
        }
    }
}

export { lists, List, addList, loadLists, renderOptions }