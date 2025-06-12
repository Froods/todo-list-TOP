function populateBody() { // Create and add list/ task container

    /// List container and list nav
    const listContainer = document.createElement("div");
    listContainer.classList.add("list-container");

    const listNav = document.createElement("nav");
    listNav.classList.add("list-nav");

    listContainer.appendChild(listNav)
    document.body.appendChild(listContainer);

    // New list/ task button

    /// Task container
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    document.body.appendChild(taskContainer);
}

function addList(list) {
    const listNav = document.querySelector(".list-nav");
    const newList = document.createElement("button");

    newList.textContent = list.title;

    newList.classList.add(`${list.title}`, "list-button");
    listNav.appendChild(newList);
}

export { populateBody, addList }