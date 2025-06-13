class List {
    constructor(title, special) {
        this.title = title;
        this.element = document.createElement("button");
        this.element.textContent = this.title;
        this.class = this.title.replace(/ /g, "-");
        this.element.classList.add(`${this.class}`, "list-button");
        if (special) {
            this.element.classList.add("special");
        }
        this.tasks = [];
    }
}

const listInbox = new List("Inbox", true);
const listToday = new List("Today", true);

const lists = [listInbox, listToday];

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

export { lists, List, addList, loadLists }