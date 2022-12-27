/* 
TODO: Create the DLLNode class and implement the DoublyLinkedList constructor
and the empty methods below the constructor.
*/
class DLLNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    /**
     * Executed when the new keyword is used to construct a new DoublyLInkedList
     * instance that inherits these methods and properties.
     */
    constructor() {
        // TODO: implement the constructor.
        this.head = null;
        this.tail = null;
    }

    /**
     * Inserts a new node with the given newVal after the node that has the
     * given targetVal as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} targetVal The node data to find.
     * @param {any} newVal Data for the new node.
     * @returns {boolean} Indicates if the new node was added.
     */
    insertAfter(targetVal, newVal) {
        if (this.isEmpty()) {
            return false;
        }

        const afterNode = new DLLNode(newVal);
        let runner = this.tail;

        while (runner) {
            if (runner.data == targetVal) {
                if (runner == this.tail){
                    this.tail = afterNode;
                }
                afterNode.prev = runner;
                afterNode.next = runner.next;
                runner.next.prev = afterNode;
                runner.next = afterNode;
                return true;
            }
            runner = runner.prev;
        }
    }

    /**
     * Inserts a new node with the given newVal before the node that has the
     * given targetVal as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} targetVal The node data to find.
     * @param {any} newVal Data for the new node.
     * @returns {boolean} Indicates if the new node was added.
     */
    insertBefore(targetVal, newVal) {}

    /**
     * Creates a new node and adds it at the front of this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} data The data for the new node.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtFront(data) {
        const newNode = new DLLNode(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        const oldHead = this.head;
        oldHead.prev = newNode;
        newNode.next = oldHead;
        this.head = newNode;
        return this;
    }

    /**
     * Creates a new node and adds it at the back of this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} data The data for the new node.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtBack(data) {
        const newNode = new DLLNode(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        const oldTail = this.tail;
        oldTail.next = newNode;
        newNode.prev = oldTail;
        this.tail = newNode;
        return this;
    }

    // EXTRA
    /**
     * Removes the middle node in this list.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {any} The data of the removed node.
     */
    removeMiddleNode() {
        //empty list
        if (this.isEmpty()) {
            return null;
        }
        //only 1 node
        if (this.head === this.tail) {
            const returnData = this.head.data;
            this.head = null;
            this.tail = null;
            return returnData;
        }
        //only 2 nodes
        if (this.head.next === this.tail) {
            const returnData = this.tail.data;
            this.head.next = null;
            this.tail = this.head;
            return returnData;
        }
        //set left/right pointers and meet in middle
        let leftPointer = this.head;
        let rightPointer = this.tail;
        while (leftPointer.next !== rightPointer.prev) {
            leftPointer = leftPointer.next;
            if (leftPointer.next !== rightPointer.prev) {
                rightPointer = rightPointer.prev;
            }
        }
        //hold data of removed node and connect outside nodes together
        const returnData = leftPointer.next.data;
        leftPointer.next = rightPointer;
        rightPointer.prev = leftPointer;
        return returnData;
    }

    /**
     * Determines if this list is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean} Indicates if this list is empty.
     */
    isEmpty() {
        return this.head === null;
    }

    /**
     * Converts this list to an array of the node's data.
     * - Time: O(n) linear, n = list length.
     * - Space: O(n) linear, array grows as list length increases.
     * @returns {Array<any>} All the data of the nodes.
     */
    toArray() {
        const vals = [];
        let runner = this.head;

        while (runner) {
            vals.push(runner.data);
            runner = runner.next;
        }
        return vals;
    }

    /**
     * Adds all the given items to the back of this list.
     * @param {Array<any>} items Items to be added to the back of this list.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtBackMany(items = []) {
        items.forEach((item) => this.insertAtBack(item));
        return this;
    }
}

const emptyList = new DoublyLinkedList();

/**************** Uncomment these test lists after insertAtBack is created. ****************/
const singleNodeList = new DoublyLinkedList().insertAtBack(1);
const biNodeList = new DoublyLinkedList().insertAtBack(1).insertAtBack(2);
const firstThreeList = new DoublyLinkedList().insertAtBackMany([1, 2, 3]);
const secondThreeList = new DoublyLinkedList().insertAtBackMany([4, 5, 6]);
const unorderedList = new DoublyLinkedList().insertAtBackMany([
  -5,
  -10,
  4,
  -3,
  6,
  1,
  -7,
  -2,
]);

console.log(secondThreeList.toArray());
secondThreeList.insertAfter(5, 3);
console.log(secondThreeList.toArray());