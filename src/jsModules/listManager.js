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

        const parent = document.querySelector(".task-container");

        if (parent.firstChild !== parent.lastChild) {
            while (parent.lastChild.firstChild) {
                parent.lastChild.removeChild(parent.lastChild.firstChild);
            }
            parent.removeChild(parent.lastChild);
        }

        if (this.special) {
            if (this.title === "Inbox") {
                for (const task of allTasks) {
                    this.addTaskElem(task)
                    parent.appendChild(this.div);
                }
            }
            if (this.title === "Today") {
                const today = new Date();
                for (const task of allTasks) {
                    if (today.getFullYear() === task.dueDate.getFullYear() && today.getMonth() === task.dueDate.getMonth() && today.getDate() === task.dueDate.getDate()) {
                        this.addTaskElem(task)
                        parent.appendChild(this.div);
                    }
                }
            }
            if (this.title === "Finished") {
                
            }
        } else {
            for (const task of this.tasks) {
                this.addTaskElem(task)
                parent.appendChild(this.div);
            }
        }

        
    }
    addTaskElem(task) {
        const taskElem = document.createElement("div");
        taskElem.classList.add("taks-element")

        // Checkbox
        const checkbox = task.checkboxElem;
        taskElem.appendChild(checkbox);

        // Title
        const title = document.createElement("h3");
        title.textContent = task.title;
        taskElem.appendChild(title);

        // Description
        const description = document.createElement("p");
        description.textContent = task.description;
        taskElem.appendChild(description)

        // Duedate
        const dueDate = document.createElement("p");
        dueDate.textContent = format(task.dueDate, "dd-MMM-yyyy");
        taskElem.appendChild(dueDate);

        this.div.appendChild(taskElem);
    }

}

const listInbox = new List("Inbox", true);
const listToday = new List("Today", true);
const listFinished = new List("Finished", true);

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