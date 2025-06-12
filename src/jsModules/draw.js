import { List } from "./lists.js"

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

    /// Task container
    taskContainer.classList.add("task-container");
    document.body.appendChild(taskContainer);
}

// Draw new list button
function initNewListButton() {
    const newListButton = document.createElement("button");
    newListButton.classList.add("new-list-button", "list-button");
    newListButton.textContent = "+ New List";

    newListButton.addEventListener("click", () => {
        showListPopup();
    });

    listNav.appendChild(newListButton);
}

// Draw a new list
function addList(list) {
    const listNav = document.querySelector(".list-nav");
    const newList = document.createElement("button");

    newList.textContent = list.title;

    newList.classList.add(`${list.title}`, "list-button");
    listNav.appendChild(newList);
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

        if (titleInput.value) {
            const list = new List(titleInput.value);
            addList(list);
        }

        popup.close();
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

export { populateBody, addList }