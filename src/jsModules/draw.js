import { Task, addTask } from "./taskManager.js"
import { loadLists, addList, renderOptions, lists, List } from "./listManager.js"

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

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("type", "text");

    // Div for input
    const inputDiv = document.createElement("div");
    inputDiv.appendChild(titleLabel);
    inputDiv.appendChild(titleInput);
    form.appendChild(inputDiv);

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

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.close();
    })

    // Div for button
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");
    btnDiv.appendChild(addBtn);
    btnDiv.appendChild(closeBtn);
    form.appendChild(btnDiv);
    
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

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("type", "text");

    // Div for title
    const titleDiv = document.createElement("div");
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    form.appendChild(titleDiv);

    // Description label and textarea
    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description")
    descriptionLabel.textContent = "Description";

    const descriptionArea = document.createElement("textarea");
    descriptionArea.setAttribute("id", "description");
    descriptionArea.setAttribute("name", "description");
    descriptionArea.setAttribute("rows", "3");
    descriptionArea.setAttribute("cols", "19");

    // Div for description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionArea);
    form.appendChild(descriptionDiv);

    // Datepicker label and datepicker
    const datepickerLabel = document.createElement("label");
    datepickerLabel.setAttribute("for", "datepicker")
    datepickerLabel.textContent = "Due date";

    const datepicker = document.createElement("input");
    datepicker.setAttribute("id", "datepicker");
    datepicker.setAttribute("name", "datepicker");
    datepicker.setAttribute("type", "date");

    // Div for datepicker
    const datepickerDiv = document.createElement("div");
    datepickerDiv.appendChild(datepickerLabel);
    datepickerDiv.appendChild(datepicker);
    form.appendChild(datepickerDiv);

    // Priority label and input
    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority")
    priorityLabel.textContent = "Priority";

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

    // Div for priority
    const priorityDiv = document.createElement("div");
    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(prioritySelect);
    form.appendChild(priorityDiv);

    // List label and input
    const listLabel = document.createElement("label");
    listLabel.setAttribute("for", "list")
    listLabel.textContent = "Select list";

    const listSelect = document.createElement("select");
    listSelect.setAttribute("id", "list");
    listSelect.setAttribute("name", "list");

        // listSelect options
        // Default
        const listDefault = document.createElement("option");
        listDefault.setAttribute("value", "default");
        listDefault.innerHTML = "Select a list for this task";
        listSelect.appendChild(listDefault);
        // Render options
        renderOptions(listSelect);

    // Div for list
    const listDiv = document.createElement("div");
    listDiv.appendChild(listLabel);
    listDiv.appendChild(listSelect);
    form.appendChild(listDiv);

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
        let chosenList = "default";

        for (const list of lists) {
            if (list.title.toString() === listSelect.value.toString()) {
                chosenList = list; 
            }
        }   

        // Add the task
        if (title && description && dueDate && priority) {
            addTask(title, description, new Date(dueDate), priority, chosenList);
            popup.close();
        }
        
    })

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.close();
    })

    // Div for button
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");
    btnDiv.appendChild(addBtn);
    btnDiv.appendChild(closeBtn);
    form.appendChild(btnDiv);
    
    // Delete dialog from DOM when closed
    popup.addEventListener('close', () => { 
        document.body.removeChild(popup);
    });

    // Append and show popup
    document.body.appendChild(popup)
    popup.showModal();
}

export { populateBody,  }