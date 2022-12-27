/**
 * Class to represent a stack using an array to store the stacked items.
 * Follows a LIFO (Last In First Out) order where new items are stacked on
 * top (back of array) and removed items are removed from the top / back.
 */
class Stack {
    /**
     * The constructor is executed when instantiating a new Stack() to construct
     * a new instance.
     * @returns {Stack} This new Stack instance is returned without having to
     *    explicitly write 'return' (implicit return).
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds a new given item to the top / back of this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} item The new item to be added to the top / back.
     * @returns {number} The new length of this stack.
     */
    push(item) {
        this.items.push(items);
        this.size();
    }

    /**
     * Removes the top / last item from this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The removed item or undefined if this stack was empty.
     */
    pop() {
        return this.items.pop();
    }

    /**
     * Retrieves the top / last item from this stack without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The top / last item of this stack.
     */
    peek() {
        return this.items[this.items.length-1];
    }

    /**
     * Returns whether or not this stack is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        return !this.items ? true : false;
    }

    /**
     * Returns the size of this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {number} The length.
     */
    size() {
        return this.items.length;
    }
}


//BONUS: Do it with a linked list instead

class StackNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    constructor() {
        this.head = null;
    }

    llpush(data){
        const newNode = new StackNode(data);
        let count = 1;
        if (this.head == null){
            this.head = newNode;
            return count;
        }
        let runner = this.head;
        while (runner.next){
            runner = runner.next;
            count++;
        }
        runner.next = newNode;
        count++;
        return count;
    }

    llpop(){
        //empty list
        if (this.head == null){
            return undefined;
        }
        // 1 item only
        if (this.head.next == null){
            const returnData = this.head.data;
            this.head = null;
            return returnData;
        }

        let runner = this.head;
        while(runner.next.next){
            runner = runner.next;
        }

        returnData = runner.next.data;
        runner.next = null;
        return returnData;
    }

    llpeek(){
        if (this.head == null){
            return null;
        }

        let runner = this.head;
        while (runner.next) {
            runner = runner.next;
        }
        return runner.data;
    }

    llisEmpty() {
        return this.head == null ? true : false;
    }

    llsize() {
        if (this.llisEmpty()){
            return 0;
        }

        let runner = this.head;
        let count = 1;
        while (runner.next) {
            count++;
            runner = runner.next;
        }
        return count;
    }
}


module.exports = { Stack }