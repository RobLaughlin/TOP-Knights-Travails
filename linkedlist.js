export class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

export class LinkedList {
    static INDEX_ERROR = (index, size) => {
        return new RangeError(
            `Index (${index}) must be strictly less than the size of the linked list (${size}) and bigger than or equal to 0.`
        );
    };

    #head = null;
    #tail = null;
    #size = 0;

    constructor() {}

    #initialize(value) {
        this.#head = new Node(value, null);
        this.#tail = this.#head;
    }

    #inRange(index) {
        return index < this.size() && index >= 0;
    }

    #traverse(callback) {
        // Traverse the linked list starting at the head.
        let currentNode = this.#head;
        let i = 0;
        while (currentNode !== null) {
            // Exits the search early if the callback returns true.
            if (callback(currentNode, i)) {
                return {
                    node: currentNode,
                    index: i,
                };
            }
            currentNode = currentNode.nextNode;
            i++;
        }

        // If none of our callbacks returned true
        return {
            node: null,
            index: null,
        };
    }

    size() {
        return this.#size;
    }

    append(value) {
        if (this.#size === 0) {
            this.#initialize(value);
        } else {
            this.#tail.nextNode = new Node(value);
            this.#tail = this.#tail.nextNode;
        }
        this.#size++;
    }

    prepend(value) {
        if (this.size() === 0) {
            this.#initialize(value);
        } else {
            this.#head = new Node(value, this.#head);
        }
        this.#size++;
    }

    head() {
        return this.#head;
    }

    tail() {
        return this.#tail;
    }

    at(index) {
        if (!this.#inRange(index)) {
            throw LinkedList.INDEX_ERROR(index, this.size());
        }

        return this.#traverse((_, i) => {
            if (i === index) {
                return true;
            }

            return false;
        }).node;
    }

    contains(value) {
        const idx = this.#traverse((node, _) => {
            return node.value === value;
        }).index;

        return idx !== null;
    }

    find(value) {
        return this.#traverse((node, _) => {
            return node.value === value;
        }).index;
    }

    insertAt(value, index) {
        if (!this.#inRange(index)) {
            throw LinkedList.INDEX_ERROR(index, this.size());
        }

        const newNode = new Node(value);
        if (index === 0) {
            newNode.nextNode = this.#head;
            this.#head = newNode;
        } else if (index === this.#size - 1) {
            this.#tail.nextNode = newNode;
            this.#tail = newNode;
        } else {
            const prevNode = this.at(index - 1);
            const newNextNode = prevNode.nextNode;
            prevNode.nextNode = newNode;
            newNode.nextNode = newNextNode;
        }
        this.#size++;
    }

    removeAt(index) {
        if (!this.#inRange(index)) {
            throw LinkedList.INDEX_ERROR(index, this.size());
        }

        if (index === 0) {
            this.#head = this.#head.nextNode;
        } else if (index === this.#size - 1) {
            if (this.#inRange(index - 2)) {
                const newTail = this.at(index - 2);
                this.#tail = newTail.nextNode;
                this.#tail.nextNode = null;
            }
        } else {
            if (this.#inRange(index - 1)) {
                const prevNode = this.at(index - 1);

                // Break the chain
                const nodeToRemove = prevNode.nextNode;
                prevNode.nextNode = nodeToRemove.nextNode;
                nodeToRemove.nextNode = null;
            }
        }
        this.#size--;
    }

    toString() {
        let llStr = "";
        this.#traverse((node, _) => {
            llStr += `(${node.value}) -> `;
            return false;
        });
        llStr += "null";

        return llStr;
    }
}
