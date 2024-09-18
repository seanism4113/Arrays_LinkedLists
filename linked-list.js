/** Node: node for a singly linked list. */
class Node {
	constructor(val, next = null, previous = null) {
		this.val = val;
		this.next = next;
		this.previous = previous;
	}
}

/** LinkedList: chained together nodes. */
class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	traverse() {
		let currentNode = this.head;
		while (currentNode) {
			console.log(
				`Value: ${currentNode.val}, Previous: ${
					currentNode.previous ? currentNode.previous.val : "null"
				}, Next: ${currentNode.next ? currentNode.next.val : "null"}`
			);
			currentNode = currentNode.next;
		}
	}

	/** Get the endex of list */
	_get(idx) {
		let currentNode = this.head;
		let count = 0;

		while (currentNode !== null && count != idx) {
			count += 1;
			currentNode = currentNode.next;
		}
		return currentNode;
	}
	/** push(val): add new value to end of list. */
	push(val) {
		let newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.previous = this.tail;
			this.tail = newNode;
		}

		this.length++;
	}

	/** unshift(val): add new value to start of list. */
	unshift(val) {
		let newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		}
		this.head.previous = newNode;
		newNode.next = this.head;
		this.head = newNode;

		this.length++;
	}

	/** pop(): return & remove last item. */
	pop() {
		if (!this.tail) return null;

		let ItemRemoved = this.tail.val;
		this.tail = this.tail.previous;

		if (this.tail) {
			this.tail.next = null;
		} else {
			this.tail = null;
			this.head = null;
		}

		this.length -= 1;
		return ItemRemoved;
	}

	/** shift(): return & remove first item. */
	shift() {
		if (!this.head) return null;

		let ItemRemoved = this.head.val;
		this.head = this.head.next;

		if (this.head) {
			this.head.previous = null;
		} else {
			this.tail = null;
		}
		this.length--;
		return ItemRemoved;
	}

	/** getAt(idx): get val at idx. */
	getAt(idx) {
		if (idx >= this.length || idx < 0) {
			throw new Error("Index is invalid");
		}

		return this._get(idx).val;
	}

	/** setAt(idx, val): set val at idx to val */
	setAt(idx, val) {
		if (idx >= this.length || idx < 0) {
			throw new Error("Index is invalid");
		}
		let currentValue = this._get(idx);
		currentValue.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */
	insertAt(idx, val) {
		if (idx > this.length || idx < 0) {
			throw new Error("Index is invalid");
		}

		if (idx === 0) return this.unshift(val);
		if (idx === this.length) return this.push(val);

		let newNode = new Node(val);
		const previousIndexedValue = this._get(idx - 1);
		newNode.next = previousIndexedValue.next;
		previousIndexedValue.next = newNode;

		this.length++;
	}

	/** removeAt(idx): return & remove item at idx, */
	removeAt(idx) {
		if (idx >= this.length || idx < 0) {
			throw new Error("Invalid index");
		}
		if (idx === 0) return this.shift();
		if (idx === this.length - 1) return this.pop();

		const nextValue = this._get(idx + 1);
		const previousValue = this._get(idx - 1);
		previousValue.next = nextValue;
		nextValue.previous = previousValue;

		this.length--;
	}

	/** average(): return an average of all values in the list */

	average() {
		let currentNode = this.head;
		let sum = 0;
		if (this.length === 0) return 0;
		while (currentNode) {
			sum += currentNode.val;
			currentNode = currentNode.next;
		}
		return sum / this.length;
	}
}

const colors = new LinkedList(["green", "purple", "red", "blue", "orange"]);
const numbers = new LinkedList([5, 8, 4, 6, 3]);
const numbers2 = new LinkedList();

module.exports = LinkedList;
