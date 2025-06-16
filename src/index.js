import "./styles.css";
import { Task } from "./jsModules/taskManager.js"
import { populateBody } from "./jsModules/draw.js"
import { List, addList } from "./jsModules/listManager.js"

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

populateBody();
