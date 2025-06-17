class listDiv {
    constructor(name, parent, list) {
        this.name = name;
        this.parent = parent;
        this.element = document.createElement("div");
        this.element.classList.add(`${name}-div`, "list-div");
        this.list = list;
    }

    addElement() {
        this.list.drawTasks(this.element); // kalder fejl - prøv at ryke funktionalitet ind i list klassen og fjern denne klasse
        this.parent.appendChild(this.element);
    }

    removeElement() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        this.parent.removeChild(this.element);
    }
}

export { listDiv };