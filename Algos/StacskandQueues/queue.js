const { Stack } = require('./stack')

/**
 * Class to represent a queue using an array to store the queued items.
 * Follows a FIFO (First In First Out) order where new items are added to the
 * back and items are removed from the front.
 */
class Queue {
    constructor() {
        this.items = [];
    }

    /**
     * Adds a new given item to the back of this queue.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} item The new item to add to the back.
     * @returns {number} The new size of this queue.
     */
    enqueue(item) {
        this.items.push(item);
        return this.items.length;
    }

    /**
     * Removes and returns the first item of this queue.
     * - Time: O(n) linear, due to having to shift all the remaining items to
     *    the left after removing first elem.
     * - Space: O(1) constant.
     * @returns {any} The first item or undefined if empty.
     */
    dequeue() {
        if (this.items.length === 0) {
            return undefined;
        }
        const returnData = this.items[0];
        for (let i = 0; i < this.items.length - 1; i++) {
            this.items[i] = this.items[i + 1];
        }
        this.items.pop();
        return returnData;
    }

    // dequeue() {
    //     return this.items.shift();
    // }

    /**
     * Retrieves the first item without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The first item or undefined if empty.
     */
    front() {
        if (this.items.length === 0) {
            return undefined;
        }
        return this.items[0];
    }

    /**
     * Returns whether or not this queue is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0 ? true : false;
    }

    /**
     * Retrieves the size of this queue.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {number} The length.
     */
    size() {
        return this.items.length;
    }

    print() {
        const str = this.items.join(" ");
        console.log(str);
        return str;
    }

    /**
  * Compares this queue to another given queue to see if they are equal.
  * Avoid indexing the queue items directly via bracket notation, use the
  * queue methods instead for practice.
  * Use no extra array or objects.
  * The queues should be returned to their original order when done.
  * - Time: O(n^2) quadratic, n = queue length. Quadratic due to dequeue on an
  *     array queue being O(n).
  * - Space: O(1) constant.
  * @param {Queue} q2 The queue to be compared against this queue.
  * @returns {boolean} Whether all the items of the two queues are equal and
  *    in the same order.
  */
    compareQueues(q2) {
        if (this.size() !== q2.size()) {
            return false;
        }
        let count = 0;
        let isEqual = true;
        const len = this.size();

        while (count < len) {
            const dequeued1 = this.dequeue();
            const dequeued2 = q2.dequeue();

            if (dequeued1 !== dequeued2) {
                isEqual = false;
            }

            this.enqueue(dequeued1);
            q2.enqueue(dequeued2);
            count++;
        }
        return isEqual;
    }

    /**
   * Determines if the queue is a palindrome (same items forward and backwards).
   * Avoid indexing queue items directly via bracket notation, instead use the
   * queue methods for practice.
   * Use only 1 stack as additional storage, no other arrays or objects.
   * The queue should be returned to its original order when done.
   * - Time: O(n^2) quadratic, n = queue length. Quadratic due to dequeue on an
   *     array queue being O(n).
   * - Space: O(n) from the stack being used to store the items again.
   * @returns {boolean}
   */
    isPalindrome() {
        let isPalin = true;
        const stack = new Stack(),
            len = this.size();

        for (let i = 0; i < len; i++) {
            let dequeued = this.dequeue();
            stack.push(dequeued);
            // add it back so the queue items and order is restored at the end
            this.enqueue(dequeued);
        }

        for (let i = 0; i < len; i++) {
            let dequeued = this.dequeue();
            let popped = stack.pop();

            if (popped !== dequeued) {
                isPalin = false;
            }

            // add it back so the queue items and order is restored at the end
            this.enqueue(dequeued);
        }
        return isPalin;
    }

    /**
    * Determines whether the sum of the left half of the queue items is equal to
    * the sum of the right half. Avoid indexing the queue items directly via
    * bracket notation, use the queue methods instead for practice.
    * Use no extra array or objects.
    * The queue should be returned to it's original order when done.
    * - Time: O(?).
    * - Space: O(?).
    * @returns {boolean} Whether the sum of the left and right halves is equal.
    */
    isSumOfHalvesEqual() {
        let len = this.size();

        if (len <= 1) return false;

        let dq = 0;
        let odd = 0;
        let firstHalf = 0;
        let secondHalf = 0;
        
        // if len = 5 (0,1,2,3,4), this goes through 0,1
        for (let i = 0; i < Math.floor(len/2); i++){
            dq = this.dequeue();
            firstHalf += dq;
            this.enqueue(dq);
        }

        // this skips 2
        if (len%2 != 0){
            odd = this.dequeue();
            this.enqueue(odd);
        }

        // this goes through 3,4
        for (let i = 0; i < Math.floor(len/2); i++){
            dq = this.dequeue();
            secondHalf += dq;
            this.enqueue(dq);
        }

        return firstHalf === secondHalf ? true : false;

    }
}

/* EXTRA: Rebuild the above class using a linked list instead of an array. */

/* 
    In order to maintain an O(1) enqueue time complexity like .push with an array
    We add a tail to our linked list so we can go directly to the last node
*/

class QueueNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.top = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean} Indicates if the list is empty.
     */
    isEmpty() {
        return this.top === null ? true : false;
    }

    /**
     * Adds a given val to the back of the queue.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} val
     * @returns {number} The new size of the queue.
     */
    enqueue(val) {
        const newNode = new QueueNode(val);
        if (this.isEmpty()) {
            this.top = newNode;
            this.tail = newNode;
            this.size += 1;
            return this.size;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        this.size += 1;
        return this.size;
    }

    /**
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The removed item.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const returnData = this.top.data;
        this.top = this.top.next;
        this.size -= 1;
        if (this.size === 0) {
            this.tail = null;
        }
        return returnData;
    }

    /**
     * Retrieves the first item without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The first item.
     */
    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.top.data;
    }

    /**
     * Determines if the given item is in the queue.
     * - Time: O(n) linear.
     * - Space: O(1) constant.
     * @param {any} searchVal
     * @returns {boolean}
     */
    contains(searchVal) {
        if (this.isEmpty()) {
            return false;
        }
        let runner = this.top;
        while (runner) {
            if (runner.data === searchVal) {
                return true;
            }
            runner = runner.next;
        }
        return false;
    }
}

/**
 * Class to represent a Queue but is implemented using two stacks to store the
 * queued items without using any other objects or arrays to store the items.
 * Retains the FIFO (First in First Out) ordering when adding / removing items.
 */
class TwoStackQueue {
    constructor() {
        this.stack1 = new Stack();
        this.stack2 = new Stack();
    }

    /**
     * Adds a new item to the back of the queue.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} item To be added.
     * @returns {number} The new number of items in the queue.
     */
    enqueue(item) {}

    /**
     * Removes the next item in the line / queue.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {any} The removed item.
     */
    dequeue() {}
}

// const newList = new LinkedListQueue();

// console.log(newList.enqueue(3));
// console.log(newList.enqueue(5));
// console.log(newList.enqueue(7));
// console.log(newList.enqueue(9));
// console.log(newList.enqueue(1));

// console.log(newList.dequeue());
// console.log(newList.dequeue());

// console.log(newList.front());

// console.log(newList.contains(7));
// console.log(newList.contains(23));

const newQueue = new Queue();
newQueue.enqueue(1);
newQueue.enqueue(2);
newQueue.enqueue(3);
newQueue.enqueue(3);
newQueue.enqueue(2);

newQueue.print();

console.log(newQueue.isSumOfHalvesEqual());

newQueue.print();