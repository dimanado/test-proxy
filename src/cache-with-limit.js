class Node {
    constructor(data = null, next = null) {
        this.data = data;
        this.next = next;
    }
}

class CacheWithLimit {
    constructor(limit) {
        this.limit = limit;
        this.length = 0;
        this._head = null;
        this._tail = null;
        this._storage = {};
    }

    append(key, data) {
        this._storage[key] = data;
        const node = new Node(key);

        if (!this.length) {
            this.length = 1;
            this._head = node;
            this._tail = node;

            return this;
        }

        if (this.length === this.limit) {
            const removedDataKey = this._head.data;

            delete this._storage[removedDataKey];
            const { next } = this._head;
            this._head.next = null;
            this._head = next;
        } else {
            this.length++;
        }
        this._tail.next = node;
        this._tail = node;

        return this;
    }
    get(key) {
        return this._storage[key];
    }
}