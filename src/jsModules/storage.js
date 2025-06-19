import { addList, lists } from "./listManager";
import { addTask } from "./taskManager";

/// Lists
// Add lists to current session
function getLists() {
    const listArr = gatherListsInArr();
    console.log(listArr);
    const nav = document.querySelector(".list-nav");

    for (const item of listArr) {
        const listTitle = item.slice(21);
        addList(listTitle, nav);
    }
}

// Gather lists in array
function gatherListsInArr() {
    const prefix = "taskify-stored-lists-";
    const listArr = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            listArr.push(key);
        }
    }
    return listArr;
}

/// Tasks
// Add tasks to current session
function getTasks() {
    const tasksArr = gatherTasksInArr();

    for (const item of tasksArr) {
        const itemArr = item.split(",");
        let chosenList = false;

        console.log(itemArr);

        for (const list of lists) {
            if (list.title === itemArr[4]) {
                chosenList = list;
                console.log(list);
                console.log("hallooo");
            }
        }
        
        if (chosenList) {
            addTask(itemArr[0], itemArr[1], new Date(itemArr[2]), itemArr[3], chosenList);
        }
        
    }
}

// Gather asks in array
function gatherTasksInArr() {
    const prefix = "taskify-stored-tasks-";
    const taskArr = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            const value = localStorage.getItem(key)
            taskArr.push(value);
        }
    }
    console.log(taskArr);
    return taskArr;
}

export { getLists, getTasks }