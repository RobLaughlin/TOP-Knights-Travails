import { LinkedList } from "./linkedlist.js";

export class Queue {
    #list = new LinkedList();

    constructor(elements = []) {
        elements.forEach((element) => {
            this.enqueue(element);
        });
    }

    enqueue(element) {
        this.#list.append(element);
    }

    dequeue() {
        if (this.size() === 0) {
            return null;
        }

        const elem = this.#list.at(0).value;
        this.#list.removeAt(0);
        return elem;
    }

    size() {
        return this.#list.size();
    }

    head() {
        return this.#list.head();
    }

    tail() {
        return this.#list.tail();
    }
}
