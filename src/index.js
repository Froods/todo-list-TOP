import "./styles.css";
import { List } from "./jsModules/lists.js"
import { populateBody, addList } from "./jsModules/draw.js"

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const listToday = new List("Today");
const listFitness = new List("Fitness");

populateBody();
addList(listToday);
addList(listFitness);