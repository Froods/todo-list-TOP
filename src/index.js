import "./styles.css";
import "./normalize.css";
import { Task } from "./jsModules/taskManager.js"
import { populateBody } from "./jsModules/draw.js"
import { List, addList, lists } from "./jsModules/listManager.js"
import { getLists, getTasks } from "./jsModules/storage.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

populateBody();
getLists();
getTasks();