import { Task } from "./classes.js"
import { loadLists, addList, lists, List } from "./listManager.js"

// Layout elements
const listContainer = document.createElement("div");
const listNav = document.createElement("nav");
const taskContainer = document.createElement("div");

// Create and add list/ task container
function populateBody() { 

    /// List container and list nav
    
    const header = document.createElement("h1");
    header.textContent = "Taskify";
    listContainer.appendChild(header);

    header.classList.add("main-header");
    listContainer.classList.add("list-container");
    listNav.classList.add("list-nav");

    listContainer.appendChild(listNav)
    document.body.appendChild(listContainer);

    // New list button
    initNewListButton();

    // Load the lists
    loadLists(lists, listNav);

    /// Task container
    taskContainer.classList.add("task-container");
    document.body.appendChild(taskContainer);

    // New task button
    initNewTaskButton();
}

// Draw new list button
function initNewListButton() {
    const newListButton = document.createElement("button");
    newListButton.classList.add("new-list-button", "list-button", "special");
    newListButton.textContent = "+ New List";

    newListButton.addEventListener("click", () => {
        showListPopup();
    });

    listNav.appendChild(newListButton);
}

// Display popup for adding new list
function showListPopup() {
    // Popup
    const popup = document.createElement("dialog");
    popup.classList.add("list-popup");

    // Form
    const form = document.createElement("form");
    form.setAttribute("action", "")
    popup.appendChild(form)

    // Legend
    const legend = document.createElement("legend");
    legend.textContent = "New List";
    form.appendChild(legend);

    // Title label and input
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title")
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("type", "text");
    form.appendChild(titleInput);

    // Add button
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const list = titleInput.value;

        if (list) {
            addList(list, listNav);
            popup.close();
        }

    })
    form.appendChild(addBtn);

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.close();
    })
    form.appendChild(closeBtn);
    
    // Delete dialog from DOM when closed
    popup.addEventListener('close', () => { 
        document.body.removeChild(popup);
    });

    // Append and show popup
    document.body.appendChild(popup)
    popup.showModal();
}

// New task button
function initNewTaskButton() {
    const btn = document.createElement("button");
    const taskContainer = document.querySelector(".task-container");
    btn.classList.add("new-task-button");
    btn.textContent = "+";

    btn.addEventListener("click", () => {
        showTaskPopup();
    });

    taskContainer.appendChild(btn);
}

// Display popup for adding new task
function showTaskPopup() {
    // Popup
    const popup = document.createElement("dialog");
    popup.classList.add("task-popup");

    // Form
    const form = document.createElement("form");
    form.setAttribute("action", "")
    popup.appendChild(form)

    // Legend
    const legend = document.createElement("legend");
    legend.textContent = "New Task";
    form.appendChild(legend);

    // Title label and input
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title")
    titleLabel.textContent = "Task name";
    form.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("type", "text");
    form.appendChild(titleInput);

    // Description label and textarea
    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description")
    descriptionLabel.textContent = "Description";
    form.appendChild(descriptionLabel);

    const descriptionArea = document.createElement("textarea");
    descriptionArea.setAttribute("id", "description");
    descriptionArea.setAttribute("name", "description");
    descriptionArea.setAttribute("rows", "3");
    descriptionArea.setAttribute("cols", "33");
    form.appendChild(descriptionArea);

    // Datepicker label and datepicker
    const datepickerLabel = document.createElement("label");
    datepickerLabel.setAttribute("for", "datepicker")
    datepickerLabel.textContent = "Due date";
    form.appendChild(datepickerLabel);

    const datepicker = document.createElement("input");
    datepicker.setAttribute("id", "datepicker");
    datepicker.setAttribute("name", "datepicker");
    datepicker.setAttribute("type", "date");
    form.appendChild(datepicker);

    // Priority label and input
    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority")
    priorityLabel.textContent = "Priority";
    form.appendChild(priorityLabel);

    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "priority");
    prioritySelect.setAttribute("name", "priority");

        // prioritySelect options
        const priorityImportant = document.createElement("option");
        const priorityStandard = document.createElement("option");
        const priorityLessImportant = document.createElement("option");

        priorityImportant.setAttribute("value", "1");
        priorityStandard.setAttribute("value", "2");
        priorityLessImportant.setAttribute("value", "3");

        priorityImportant.innerHTML = "Important";
        priorityStandard.innerHTML = "Standard";
        priorityLessImportant.innerHTML = "Less important";

        prioritySelect.appendChild(priorityStandard);
        prioritySelect.appendChild(priorityImportant);
        prioritySelect.appendChild(priorityLessImportant);

    form.appendChild(prioritySelect);

    // List label and input
    // START HER

    // Add button
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Collect data in variables
        const title = titleInput.value;
        const description = descriptionArea.value;
        const dueDate = datepicker.value;
        const priority = prioritySelect.value;        

        if (title && description && dueDate && priority) {
            const task = new Task(title, description, new Date(dueDate), priority);
            //addTask(task);
            console.log(task);
            popup.close();
        }
        
    })
    form.appendChild(addBtn);

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.close();
    })
    form.appendChild(closeBtn);
    
    // Delete dialog from DOM when closed
    popup.addEventListener('close', () => { 
        document.body.removeChild(popup);
    });

    // Append and show popup
    document.body.appendChild(popup)
    popup.showModal();
}

export { populateBody,  }